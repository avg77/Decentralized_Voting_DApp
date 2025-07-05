// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Voting_dApp {

    address public electionCommission;
    address public winner;

    enum Gender {Male, Female, Other}

    struct Voter {
        string name;
        uint8 age;
        uint8 voterID;
        Gender gender;
        uint8 voteCandidateID;
        address voterAddress;
        string imageCID;
    }

    struct Candidate {
        string name;
        string party;
        Gender gender;
        uint8 age;
        uint8 candidateID;
        address candidateAddress;
        uint8 votes;
        string imageCID; 
    }

    enum VotingStatus {NotStarted, InProgress, Halted, Ended}

    uint8 nextVoterID = 1;
    uint8 nextCandidateID = 1;

    uint startTime;
    uint endTime;

    mapping(uint8 => Voter) voterDetails;
    mapping(uint8 => Candidate) candidateDetails;
    mapping(address => Voter) voterProfile;

    bool haltVoting;
    bool endVoting;

    IERC20 public aviToken;

    event NewVoterRegistered(string name, uint8 age, Gender gender, uint8 voterID, string imageCID); 
    event NewCandidateRegistered(string name, string party, uint8 age, Gender gender, uint8 candidateID, string imageCID);
    event VoteCasted(uint8 voterID, uint8 candidateID);
    event VotingPeriodSet(uint startTime, uint endTime);
    event VotingStatusUpdated(VotingStatus status);
    event ElectionResultAnnounced(address winner);

    constructor(address _aviToken){
        aviToken = IERC20(_aviToken);
        electionCommission = msg.sender;
    }

    modifier onlyCommission() {
        require(electionCommission == msg.sender, "You are not from the Election Commission");
        _;
    }

    function voterRegister(string calldata _name, uint8 _age, Gender _gender, string calldata _imageCID) external {
        require(!haltVoting, "Function disabled due to an emergency!");
        require(msg.sender != electionCommission, "You are from Election Commission!");
        require(_age >= 18, "You are not eligible to vote!");
        require(voterVerification(msg.sender) == true, "Voter already registered!");

        Voter memory newVoter = Voter(_name, _age, nextVoterID, _gender, 0, msg.sender, _imageCID); 

        voterDetails[nextVoterID] = newVoter;
        voterProfile[msg.sender] = newVoter;

        emit NewVoterRegistered(_name, _age, _gender, nextVoterID, _imageCID); 
        nextVoterID++;
    }

    function voterVerification(address _person) internal view returns (bool) {
        for (uint8 i = 1; i < nextVoterID; i++) {
            if (voterDetails[i].voterAddress == _person) {
                return false;
            }
        }
        return true;
    }

    function voterList() public view returns (Voter[] memory) {
        Voter[] memory voterArray = new Voter[](nextVoterID - 1);
        for (uint8 i = 1; i < nextVoterID; i++) {
            voterArray[i - 1] = voterDetails[i];
        }
        return voterArray;
    }

    function getVoterProfile(address _voterAddress) public view returns (Voter memory) {
        require(_voterAddress == msg.sender, "You can only access your own profile!");
        require(voterProfile[_voterAddress].voterAddress != address(0), "Voter not registered!");
        return voterProfile[_voterAddress];
    }

    function candidateRegister(string calldata _name, Gender _gender, uint8 _age, string calldata _party, string calldata _imageCID) external {
        require(!haltVoting, "Function disabled due to an emergency!");
        require(msg.sender != electionCommission, "You are from Election Commission!");
        require(_age >= 18, "You are not eligible to register!");
        require(nextCandidateID < 3, "Candidate registration full!");
        require(candidateVerification(msg.sender) == true, "Candidate already registered!");

        candidateDetails[nextCandidateID] = Candidate(_name, _party, _gender, _age, nextCandidateID, msg.sender, 0, _imageCID); 
        emit NewCandidateRegistered(_name, _party, _age, _gender, nextCandidateID, _imageCID); 
        nextCandidateID++;
    }

    function candidateVerification(address _person) internal view returns (bool) {
        for (uint8 i = 1; i < nextCandidateID; i++) {
            if (candidateDetails[i].candidateAddress == _person) {
                return false;
            }
        }
        return true;
    }

    function candidateList() public view returns (Candidate[] memory) {
        Candidate[] memory candidateArray = new Candidate[](nextCandidateID - 1);
        for (uint8 i = 1; i < nextCandidateID; i++) {
            candidateArray[i - 1] = candidateDetails[i];
        }
        return candidateArray;
    }

    function voteTime(uint _startTime, uint _endTime) external onlyCommission {
        require(!haltVoting, "Function disabled due to an emergency!");
        require(nextVoterID != 1, "Voters have not yet registered!");
        require(nextCandidateID == 3, "Candidates have not yet registered!");
        startTime = block.timestamp + _startTime;
        endTime = startTime + _endTime;
        emit VotingPeriodSet(startTime, endTime);
    }

    function votingStatus() public view returns (VotingStatus) {
        if (haltVoting && !endVoting) {
            return VotingStatus.Halted;
        } else if (startTime == 0) {
            return VotingStatus.NotStarted;
        } else if (startTime != 0 && block.timestamp < endTime && !endVoting) {
            return VotingStatus.InProgress;
        } else if (endVoting) {
            return VotingStatus.Ended;
        } else if (block.timestamp >= endTime) {
            return VotingStatus.Ended;
        }
        return VotingStatus.Ended;
    }

    function vote(uint8 _voterID, uint8 _candidateID) external {
        require(!haltVoting, "Function disabled due to an emergency!");
        require(startTime != 0, "Voting has not started!");
        require(nextCandidateID == 3, "Candidates have not yet registered!");
        require(aviToken.balanceOf(msg.sender) > 0, "You don't have enough tokens to vote!");
        require(voterDetails[_voterID].voterAddress == msg.sender, "Voter ID mismatch!");
        require(_candidateID > 0 && _candidateID < 3, "Candidate ID not valid!");
        require(voterDetails[_voterID].voteCandidateID == 0, "Voter has already voted!");

        voterDetails[_voterID].voteCandidateID = _candidateID;
        candidateDetails[_candidateID].votes++;
        emit VoteCasted(_voterID, _candidateID);
    }

    function emergency() public onlyCommission {
        haltVoting = true;
    }

    function endEmergency() public onlyCommission {
        require(!endVoting, "Voting has ended; you cannot resume voting after it has ended!");
        haltVoting = false;
    }

    function result() external onlyCommission {
        require(startTime != 0, "Voting has not started!");
        require(nextCandidateID == 3, "Candidates haven't registered yet!");
        require(candidateDetails[1].votes > 0 || candidateDetails[2].votes > 0, "Voters haven't voted yet!");

        Candidate storage candidate1 = candidateDetails[1];
        Candidate storage candidate2 = candidateDetails[2];

        if (candidate1.votes > candidate2.votes) {
            winner = candidate1.candidateAddress;
        } else {
            winner = candidate2.candidateAddress;
        }
        endVoting = true;
        emit ElectionResultAnnounced(winner);
    }

    function resetElection() external onlyCommission {
        require(endVoting, "The current voting process has not ended!");

        for (uint8 i = 1; i < nextCandidateID; i++) {
            delete candidateDetails[i];
        }
        nextCandidateID = 1;

        for (uint8 i = 1; i < nextVoterID; i++) {
            address voterAddr = voterDetails[i].voterAddress;
            delete voterDetails[i];
            delete voterProfile[voterAddr];
        }
        nextVoterID = 1;

        startTime = 0;
        endTime = 0;
        haltVoting = false;
        endVoting = false;
        winner = address(0);

        emit VotingStatusUpdated(VotingStatus.NotStarted);
    }
}

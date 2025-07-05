import { useContext, useRef, useState } from "react";
import "./VoterProfile.css";
import { web3Context } from "../../context/web3Context";
import { toast } from "react-hot-toast";

const VoterProfile = () => {
  const [voterProfile, setVoterProfile] = useState(null);
  const voterAddressRef = useRef();
  const voterIdRef = useRef();
  const candidateIdRef = useRef();
  const { web3State } = useContext(web3Context);
  const { contractInstance } = web3State;

  const genderMapping = {
    0: "Male",
    1: "Female",
    2: "Other",
  };

  const getImageURL = (imageCIDWithProvider) => {
    if (!imageCIDWithProvider || typeof imageCIDWithProvider !== "string") return "";

    const [cid, provider = "pinata"] = imageCIDWithProvider.split("|");
    const gatewayMap = {
      pinata: "https://gateway.pinata.cloud/ipfs/",
      lighthouse: "https://gateway.lighthouse.storage/ipfs/",
    };
    const gateway = gatewayMap[provider.toLowerCase()] || gatewayMap.pinata;
    return `${gateway}${cid}`;
  };

  const fetchVoterProfile = async (e) => {
    e.preventDefault();
    try {
      const voterAddress = voterAddressRef.current.value;
      const profile = await contractInstance.getVoterProfile(voterAddress);

      setVoterProfile({
        name: profile.name,
        age: profile.age,
        gender: genderMapping[profile.gender],
        voterID: profile.voterID,
        voterAddress: profile.voterAddress,
        imageCID: profile.imageCID,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error fetching voter profile. Check console.");
    }
  };

  const castVote = async (e) => {
    e.preventDefault();
    try {
      const voterId = parseInt(voterIdRef.current.value);
      const candidateId = parseInt(candidateIdRef.current.value);

      const tx = await contractInstance.vote(voterId, candidateId);
      await tx.wait();

      toast.success("Vote cast successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error casting vote!");
    }
  };

  return (
    <>
      <br />
      <br />
      <div className="container">
        <form onSubmit={fetchVoterProfile}>
          <label>Voter Address:</label>
          <input
            type="text"
            placeholder="Enter voter address"
            ref={voterAddressRef}
            className="form-input"
          />
          <button className="form-button">Get Profile</button>
        </form>

        {voterProfile && (
          <div className="table-container">
            <table className="voter-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Voter ID</th>
                  <th>Voter Address</th>
                  <th>Voter Image</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{voterProfile.name}</td>
                  <td>{String(voterProfile.age)}</td>
                  <td>{voterProfile.gender}</td>
                  <td>{String(voterProfile.voterID)}</td>
                  <td>{voterProfile.voterAddress}</td>
                  <td className="voter-list-table-data">
                    <img
                      src={getImageURL(voterProfile.imageCID)}
                      alt="Voter"
                      className="voter-image"
                      width="70px"
                      height="70px"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="vote-form-container">
        <label>Cast your vote down below!</label>
        <br />
        <form onSubmit={castVote}>
          <label>Voter ID:</label>
          <input type="number" placeholder="Enter your voter ID" ref={voterIdRef} />

          <label>Candidate ID:</label>
          <input type="number" placeholder="Enter candidate ID to vote" ref={candidateIdRef} />

          <button className="form-button">Cast Vote</button>
        </form>
      </div>
    </>
  );
};

export default VoterProfile;

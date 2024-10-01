import { useContext } from "react";
import { useRef, useState } from "react";
import "./VoterProfile.css"; 
import { web3Context } from "../../context/web3Context";
import {toast} from "react-hot-toast"

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

  const fetchVoterProfile = async (e) => {
    try {
      e.preventDefault();
      const voterAddress = voterAddressRef.current.value; 
      const profile = await contractInstance.getVoterProfile(voterAddress);
      setVoterProfile({
        name: profile.name,
        age: profile.age,
        gender: genderMapping[profile.gender], // Map gender here
        voterID: profile.voterID,
        voterAddress: profile.voterAddress,
      });   
    } catch (error) {
      toast.error("Error fetching the voter profile!\n Check console to know more...", error.message);
    }
  };

  const castVote = async(e) => {
    try {
        e.preventDefault();
        const voterId = voterIdRef.current.value;
        const candidateId = candidateIdRef.current.value;
        const tx = await contractInstance.vote(voterId, candidateId)
        const receipt = await tx.wait();
        toast.success("Vote casted successfully!", {duration: 3000}, receipt)
    } catch (error) {
        toast.error("Error casting vote!", error.message)
    }
  }

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
            <td>{String(voterProfile.gender)}</td>
            <td>{String(voterProfile.voterID)}</td>
            <td>{String(voterProfile.voterAddress)}</td>
            <td className="voter-list-table-data">
              <img
                src={`http://localhost:3000/images/VoterImages/${String(voterProfile.voterAddress)}.png`}
                alt="Voter"
                className="voter-image" 
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
    <label>
      Voter ID:
    </label>
    <input type="number" placeholder="Enter your voter ID" ref={voterIdRef} />
    
    <label>
      Candidate ID:
    </label>
    <input type="number" placeholder="Enter candidate ID to vote" ref={candidateIdRef} />
    
    <button className="form-button">Cast Vote</button> 
  </form>
</div>

    </>
  );
};

export default VoterProfile;

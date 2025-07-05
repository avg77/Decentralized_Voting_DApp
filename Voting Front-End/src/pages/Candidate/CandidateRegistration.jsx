import React, { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { web3Context } from '../../context/web3Context';
import './CandidateRegistration.css';

function CandidateRegistration() {
  const { web3State } = useContext(web3Context);
  const { contractInstance } = web3State;

  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const partyRef = useRef();
  const [file, setFile] = useState("");
  const navigateTo = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigateTo("/");
  }, [navigateTo, token]);

  const handleCandidateRegistration = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);

      const config = {
        headers: { 'x-access-token': token }
      };

      const imageUploadRes = await axios.post("http://localhost:3000/api/postCandidateImage", formData, config);
      const { cid, provider } = imageUploadRes.data;

      const name = nameRef.current.value;
      const age = ageRef.current.value;
      const gender = genderRef.current.value;
      const party = partyRef.current.value;

      if (!name || !age || !party || gender === "") {
        toast.error("Input fields cannot be empty!");
        return;
      }

      const tx = await contractInstance.candidateRegister(name, gender, age, party, cid + "|" + provider);
      await tx.wait();
      toast.success("Candidate registered successfully!");
      
      nameRef.current.value = "";
      ageRef.current.value = "";
      partyRef.current.value = "";
      setFile("");

    } catch (error) {
      toast.error("Registration Failed!");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleCandidateRegistration}>
        <label>Candidate Name:</label>
        <input type="text" ref={nameRef} placeholder="Enter Name" />
        <label>Age:</label>
        <input type="number" ref={ageRef} placeholder="Enter Age" />
        <label>Gender:</label>
        <select defaultValue="" ref={genderRef}>
          <option value="" disabled>Select Gender</option>
          <option value="0">Male</option>
          <option value="1">Female</option>
          <option value="2">Other</option>
        </select>
        <label>Party:</label>
        <input type="text" ref={partyRef} placeholder="Enter Party" />
        <label>Upload Photo (.png)</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button>Register</button>
      </form>
    </div>
  );
}

export default CandidateRegistration;

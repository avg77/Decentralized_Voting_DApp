// same imports
import React, { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { web3Context } from '../../context/web3Context';
import './VoterRegistration.css';

function VoterRegistration() {
  const { web3State } = useContext(web3Context);
  const { contractInstance } = web3State;

  const [file, setFile] = useState("");
  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const navigateTo = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigateTo("/");
  }, [navigateTo, token]);

  const handleVoterRegistration = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);

      const config = {
        headers: { 'x-access-token': token }
      };

      const imageUploadRes = await axios.post("http://localhost:3000/api/postVoterImage", formData, config);
      const { cid, provider } = imageUploadRes.data;

      const name = nameRef.current.value;
      const age = ageRef.current.value;
      const gender = genderRef.current.value;

      if (!name || !age || gender === "") {
        toast.error("Input fields cannot be empty!");
        return;
      }

      const tx = await contractInstance.voterRegister(name, age, gender, cid + "|" + provider);
      await tx.wait();
      toast.success("Registration successful!");

      nameRef.current.value = "";
      ageRef.current.value = "";
      setFile("");

    } catch (error) {
      toast.error("Registration Failed! Check console.");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleVoterRegistration}>
        <label>Voter Name:</label>
        <input type="text" ref={nameRef} placeholder="Enter Voter Name" />
        <label>Voter Age:</label>
        <input type="number" ref={ageRef} placeholder="Enter Voter Age" />
        <label>Voter Gender:</label>
        <select defaultValue="" ref={genderRef}>
          <option value="" disabled>Select Gender</option>
          <option value="0">Male</option>
          <option value="1">Female</option>
          <option value="2">Other</option>
        </select>
        <label>Upload Photo (.png)</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button>Register</button>
      </form>
    </div>
  );
}

export default VoterRegistration;

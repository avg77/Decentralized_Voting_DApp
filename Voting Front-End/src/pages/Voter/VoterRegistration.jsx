import React from 'react'
import { web3Context } from '../../context/web3Context';
import { useContext } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-hot-toast"
import "./VoterRegistration.css"

function VoterRegistration() {

    const{web3State} = useContext(web3Context)
    const {contractInstance} = web3State

    const [file, setFile] = useState("")
    const nameRef = useRef();
    const ageRef = useRef();
    const genderRef = useRef();

    const token = localStorage.getItem("token")
    const navigateTo = useNavigate()
    useEffect(() => {
     if(!token){
      navigateTo("/")
     }
    },[navigateTo, token])

    const handleVoterRegistration = async(e) => {
      try {
        e.preventDefault()

        const formData = new FormData()
        formData.append("file",file)

        const token = localStorage.getItem("token")
        const config = {
          headers: {
            'x-access-token': token
          }
        }
        await axios.post(`http://localhost:3000/api/postVoterImage`,formData, config)

        const name = nameRef.current.value;
        const age = ageRef.current.value;
        let gender = genderRef.current.value;

        if(name==="" || gender==="" || age===""){
          toast.error("Input fields cannot be empty!")
        }

        const tx = await contractInstance.voterRegister(name,age,gender);  //using ethers.js
        const receipt = await tx.wait(); 
        toast.success("Transaction and registration successful!", {duration: 3000});
        console.log(receipt);

        nameRef.current.value = "";
        ageRef.current.value = "";
        
      } catch (error) {
        toast.error("Registration Failed!\n Check console to know more...", error.message)
      }
    }

  return (
    <div>
      <br />
      <div className="form-container">
    <form onSubmit={handleVoterRegistration}>
        <label>Voter Name:</label>
        <input type="text" placeholder='Enter Voter Name' ref={nameRef} />

        <label>Voter Age:</label>
        <input type="number" placeholder='Enter Voter Age' ref={ageRef} />

        <label>Voter Gender:</label>
        <div className="dropdown">
        <select defaultValue="" ref={genderRef}>
        <option value="" disabled>Select Gender</option>
        <option value="0">Male</option>
        <option value="1">Female</option>
        <option value="2">Other</option>
        </select>
        </div>

        <label>Upload Photo (in .png)</label>
        <input type='file' onChange={(e) => { setFile(e.target.files[0]); }} />

        <button>Register</button>
    </form>
</div>

    </div>
  )
}

export default VoterRegistration;
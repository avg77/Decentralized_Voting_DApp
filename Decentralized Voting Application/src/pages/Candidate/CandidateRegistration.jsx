import React, { useEffect, useState } from 'react'
import { web3Context } from '../../context/web3Context';
import { useContext } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CandidateRegistration.css'
import axios from 'axios';
import {toast} from "react-hot-toast"

function CandidateRegistration() {

  const token = localStorage.getItem("token")
  const navigateTo = useNavigate()
  useEffect(() => {
     if(!token){
      navigateTo("/")
     }
  },[navigateTo, token])

    const {web3State} = useContext(web3Context)
    const {contractInstance} = web3State;

    const [file, setFile] = useState("")

    const nameRef = useRef();
    const ageRef = useRef();
    const genderRef = useRef();
    const partyRef = useRef();

    const handleCandidateRegistration = async(e) => {
      try {
        e.preventDefault()

        const formData = new FormData()
        formData.append("file",file)

        const config = {
          headers: {
            'x-access-token': token
          }
        }
        await axios.post(`http://localhost:3000/api/postCandidateImage`,formData, config)

        const name = nameRef.current.value;
        const age = ageRef.current.value;
        let gender = genderRef.current.value;
        const party = partyRef.current.value;

        if(name==="" || gender==="" || age==="" || party===""){
          toast.error("Input fields cannot be empty!")
        }

        const tx = await contractInstance.candidateRegister(name,gender,age,party);   //using ethers.js
        const receipt = await tx.wait(); 
        toast.success("Transaction and registration successful!");  
        console.log(receipt);

        nameRef.current.value = "";
        ageRef.current.value = "";
        partyRef.current.value = "";
        
      } catch (error) {
        toast.error("Registration Failed!\n Check console to know more...", error.message)
      }
    }

    /*useEffect(() => {
      if (contractInstance && selectedAccount) {
          console.log(contractInstance, selectedAccount);
      } else {
          console.log("Waiting for Web3 state...");
      }
  }, [contractInstance, selectedAccount]);*/
  

  return (
    <div>
      <br />
      <br />
        <form onSubmit={handleCandidateRegistration}>
            <label>Candidate Name:</label>
            <input type="text" placeholder='Enter Candidate Name' ref={nameRef} />
            <label>Candidate Age:</label>
            <input type="number" placeholder='Enter Candidate Age' ref={ageRef} />          

            <label>Voter Gender:</label>
            <div className="dropdown">
            <select defaultValue="" ref={genderRef}>
            <option value="" disabled>Select Gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
           </select>
           </div>

            <label>Candidate Party:</label>
            <input type="text" placeholder='Enter Candidate Party' ref={partyRef} />
            <label>Upload Photo (in .png)</label>
            <input type='file' onChange={(e) => {setFile(e.target.files[0]);}}></input>
            <button>Register</button>
        </form>
        <br />
    </div>
  )
}

export default CandidateRegistration;
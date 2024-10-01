//code for token generation
const express = require('express');
const router = express.Router();
const {ethers} = require('ethers')
const jwt = require('jsonwebtoken')

router.post("/authentication", (req,res,next) => {
   const {accountAddress} = req.query;
   const {signature} = req.body;

   const electionCommission = "0x25f54345c51edB64961f951bbCACa08B36cA9D46"

   if(!signature || !accountAddress){
    return res.status(500).json({message: "Authentication Failed!"})
   }
   const authenticationMessage = "You accept the terms and conditions of this voting application!"
   const recoveredAddress = ethers.utils.verifyMessage(authenticationMessage, signature)
   if(recoveredAddress.toLowerCase()===accountAddress.toLowerCase()){
    const token = jwt.sign({accountAddress}, 'secretkey')

    const ifElectionCommission = recoveredAddress.toLowerCase()===electionCommission.toLowerCase()?true:false
    return res.status(200).json({message: "Authentication Successful!", token:token, ifElectionCommission:ifElectionCommission})
   }
   return res.status(500).json({message: "Authentication Failed!"})
})

module.exports = router;
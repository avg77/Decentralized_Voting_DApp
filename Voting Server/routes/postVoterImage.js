const express = require('express');
const router = express.Router();
const VoterModel = require('../models/Voter')
const multerConfig = require('../config/multerConfig')
const {authentication} = require("../middleware/authentication")

router.post('/postVoterImage',authentication, multerConfig.uploadVoter,async(req,res)=>{
    try{

        const {accountAddress}=req;
        const imageName = req.file.filename;
        const savedVoter = await VoterModel.create({
            accountAddress,
            imageName
        })
        res.status(201).json(savedVoter)

    }catch(error){
        console.error(error)
    }
})
module.exports=router;
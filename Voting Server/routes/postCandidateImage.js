const express = require('express');
const router = express.Router();
const CandidateModel = require('../models/Candidate')
const multerConfig = require('../config/multerConfig')
const {authentication} = require("../middleware/authentication")

router.post('/postCandidateImage',authentication, multerConfig.uploadCandidate,async(req,res)=>{
    try{

        const {accountAddress}=req;
        const imageName = req.file.filename;
        const savedCandidate = await CandidateModel.create({   //saves data in mongodb using mongoose
            accountAddress,
            imageName
        })
        res.status(201).json(savedCandidate)

    }catch(error){
        console.error(error)
    }
})
module.exports=router;
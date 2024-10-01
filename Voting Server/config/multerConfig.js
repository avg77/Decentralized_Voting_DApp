const multer = require('multer');
const path = require('path');

const storage = destination => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `votingSystem/${destination}`); //folder where the image will be stored
    },
    filename: (req, file, cb) => {
        const accountAddress = req.accountAddress;
        cb(null, accountAddress+path.extname(file.originalname));  //concatenated user's account address and file path to create a unique name
    }
});

module.exports = {
    uploadCandidate: multer({ storage: storage('CandidateImages') }).single('file'),
    uploadVoter: multer({ storage: storage('VoterImages') }).single('file')
};
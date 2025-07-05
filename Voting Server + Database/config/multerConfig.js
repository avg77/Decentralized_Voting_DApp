import multer from 'multer';

const storage = multer.memoryStorage(); 

export default {
  uploadCandidate: multer({ storage }).single('file'),
  uploadVoter: multer({ storage }).single('file')
};

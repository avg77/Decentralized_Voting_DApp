import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import candidatePostImageRoutes from './routes/postCandidateImage.mjs';
import voterPostImageRoutes from './routes/postVoterImage.mjs';
import authenticationRoutes from './routes/authenticationRoute.mjs'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authenticationRoutes);
app.use('/api', candidatePostImageRoutes);
app.use('/api', voterPostImageRoutes);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

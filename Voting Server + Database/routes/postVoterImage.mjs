import express from 'express';
import multerConfig from '../config/multerConfig.js';
import { authentication } from '../middleware/authentication.mjs';
import pinataSDK from '@pinata/sdk';
import lighthouse from '@lighthouse-web3/sdk';
import dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config();
const router = express.Router();

// Pinata setup
const pinata = new pinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY
});

// Lighthouse setup
async function uploadToLighthouse(buffer, name) {
  try {
    const response = await lighthouse.uploadBuffer(
      buffer,
      process.env.LIGHTHOUSE_API_KEY,
      name
    );

    if (!response || typeof response !== 'object' || !response.data || !response.data.Hash) {
      throw new Error("Invalid response from Lighthouse");
    }

    return response.data.Hash;
  } catch (err) {
    console.error("Lighthouse upload failed:", err.message || err);
    return null;
  }
}

router.post('/postVoterImage', authentication, multerConfig.uploadVoter, async (req, res) => {
  try {
    const { accountAddress } = req;
    const buffer = req.file.buffer;

    const pinataStream = Readable.from(buffer);
    const pinataResult = await pinata.pinFileToIPFS(pinataStream, {
      pinataMetadata: { name: `voter-${accountAddress}` }
    });

    const filecoinCid = await uploadToLighthouse(buffer, `voter-${accountAddress}`);

    res.status(200).json({
      success: true,
      cid: pinataResult.IpfsHash,
      filecoin_cid: filecoinCid,
      provider: 'pinata'
    });

  } catch (error) {
    console.error("Voter image upload failed:", error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

export default router;

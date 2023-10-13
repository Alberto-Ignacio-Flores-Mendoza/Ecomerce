import cloudinary from "cloudinary"
import express from "express"
import dotenv from "dotenv";


const router= express.Router()
dotenv.config();

cloudinary.v2.config({
  cloud_name: 'ddwymvr6k',
  api_key: '968851625623935',
  api_secret: 'wS9e4-2lQWV0zUIkeSMXXX6EPgo',
  secure: true,
});

router.delete('/:public_id', async(req, res)=> {
  const {public_id} = req.params;
  try {
      await cloudinary.uploader.destroy(public_id);
      res.status(200).send();
  } catch (e) {
      res.status(500).send(e.message)
  }
})

export default router
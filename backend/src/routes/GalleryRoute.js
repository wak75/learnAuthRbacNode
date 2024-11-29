import express from 'express'
import Image from '../models/ImageModel.js'
const galleryRoute = express.Router()

galleryRoute.get("/gallery",async (req, res)=>{
    try {
            const fullImages = await Image.find({currentstauts:"public"}).populate('uploader', 'username')

            return res
                      .status(200)
                      .send(fullImages)
    } catch (error) {
            return res
                      .status(400)
                      .json({message: `Something is quite not right here`})
    }

})

export default galleryRoute
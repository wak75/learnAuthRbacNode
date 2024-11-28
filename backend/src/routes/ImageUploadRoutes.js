import express, { Router } from 'express'
import verify_token from '../middleware/AuthMiddleware.js'
import multer from 'multer'
import { uploadImage, getUserImages,toggleVisibility, deleteImage} from '../controller/ImageController.js'
import page_access from '../middleware/PageAccessMiddleware.js'
import {BlobServiceClient} from '@azure/storage-blob';
const ImageRoute = express.Router()




// const azureStorage = multer.memoryStorage();

// const storage = multer.diskStorage({
    
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename:(req, file, cb)=>{
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        
//         cb(null, `${uniqueSuffix}-${file.originalname}`)
//     }
// })


const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WEBP files are allowed.'), false)
    }
}

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
})





ImageRoute.post("/:name/upload", verify_token,page_access,upload.single('image'),uploadImage)
ImageRoute.get("/:name/allimages", verify_token,page_access, getUserImages)
ImageRoute.post('/:name/:imageid/visibility',verify_token, toggleVisibility )
ImageRoute.post("/:name/:imageid/delete",verify_token, deleteImage)

export default ImageRoute



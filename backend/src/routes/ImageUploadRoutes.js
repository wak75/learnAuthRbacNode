import express, { Router } from 'express'
import verify_token from '../middleware/AuthMiddleware.js'
import multer from 'multer'
import { uploadImage, getUserImages,toggleVisibility, deleteImage} from '../controller/ImageController.js'
import page_access from '../middleware/PageAccessMiddleware.js'
const ImageRoute = express.Router()

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename:(req, file, cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

const fileUpload = multer({storage})

ImageRoute.post("/:name/upload", verify_token,page_access,fileUpload.single('image'),uploadImage)
ImageRoute.get("/:name/allimages", verify_token,page_access, getUserImages)
ImageRoute.post('/:name/:imageid/visibility',verify_token, toggleVisibility )
ImageRoute.post("/:name/:imageid/delete",verify_token, deleteImage)

export default ImageRoute
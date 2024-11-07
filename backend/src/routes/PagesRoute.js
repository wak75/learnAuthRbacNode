import express from 'express'
import verify_token from '../middleware/AuthMiddleware.js'
import page_access from '../middleware/PageAccessMiddleware.js'

const page_route = express.Router()

page_route.get("/gallery",(req, res)=>{
    return res 
                .status(200)
                .json({message: `This is the gallery open to everyone`})
})

page_route.get("/page/:name", verify_token,page_access,(req, res)=>{
    
        return res
                .status(200)
                .json({message: `Welcome to the page ${req.user.name}`})
   
    
})

export default page_route
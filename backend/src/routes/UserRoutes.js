import express from 'express'
import verify_token from '../middleware/AuthMiddleware.js'
import permitted_roles from '../middleware/RoleBasedMiddleware.js'

const user_router = express.Router()

user_router.get("/admin", verify_token ,permitted_roles("admin") ,(req, res)=>{
    res.status(200).json({message: `Welcome Admin`})
})

user_router.get("/moderator", verify_token, permitted_roles("admin", "moderator"),(req, res)=>{
    res.status(200).json({message: `Welcome Moderator`})
})

user_router.get("/user", verify_token, permitted_roles("admin", "moderator", "user"),(req, res)=>{
    res.status(200).json({message: `Welcome User`})
})


export default user_router
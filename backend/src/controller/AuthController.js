import bcrypt from 'bcryptjs'
import User from "../models/UserModel.js"
import jwt from "jsonwebtoken"
const register = async (req, res) =>{
    const {username, password, role }  = req.body
    const hashed_password = await bcrypt.hash(password, 10)

    try{

        const new_user = User({
                                username:username, 
                                password:hashed_password,
                                role: role
                                })
        
        await new_user.save()
        res
            .status(201)
            .json({
                message: `User added successfully ${username}`
            })
    }catch(error){
        res
            .status(500)
            .json({
                message: `User failed to add ${username}`
            })
    }

}   

const login = async (req, res) =>{

    const { username, password } = req.body
    try{
        const user  = await User.findOne({username})
        if(!user){
            res
                .status(404)
                .json({
                    message: `No user found: ${username}`
                })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Password not matched"})
        }

        const token = jwt.sign(
            {
                user:{

                    id: user._id, 
                    role: user.role,
                }
            }, 
            process.env.JWT,
            {expiresIn: '1h'}
        )

        res.status(200).json({token})

    }catch(error){
        res.status(500).json({message:`Something is quite not right`})
    }

}

export  {login, register}
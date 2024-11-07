import express from 'express'
import jwt, { decode } from 'jsonwebtoken'

const verify_token = (req, res, next) =>{
    let token
    let auth_header = req.headers.authorization || req.headers.Authrization
    if(auth_header && (auth_header.startsWith('Bearer') || auth_header.startsWith('bearer'))){
        token = auth_header.split(" ")[1]
        console.log(token)

        if(!token){
            return res
                        .status(401)
                        .json({message: `No token found for ${req.username}. Authorization declined`})
        }

        try{
            const decoded_token = jwt.verify(token, process.env.JWT)
            console.log('Decoded Token:', decoded_token)
            req.user = decoded_token.user
            console.log('Set User:', req.user)
            next()
        }catch(error){
            res.status(400).json({message: `Invalid token`})
        }
    }else{
        res
            .status(400)
            .json({message: `Authorization fialed very very badly as bearer token is not found`})
    }

}

export default verify_token
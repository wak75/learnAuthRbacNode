const permitted_roles = (...roles) =>{
     return (req, res, next) => {
        
        if(!roles.includes(req.user.role)){
            return res 
                        .status(403)
                        .json({message: `the user is not allowed to access the following route`})
        }
        next()
     }
}

export default permitted_roles
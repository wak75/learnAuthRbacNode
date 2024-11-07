const page_access = (req, res, next) =>{
    const param_name = req.params.name
    const user_data = req.user

    console.log(user_data.role)

    if(user_data.role === 'admin' || user_data.role == 'moderator'){
        next()
        return
    }else if(param_name === user_data.name){
        next()
        return
    }else{
        res
        .status(403)
        .json({message: `You are not authorized to view the page ${user_data.name}`})
    }

   
}

export default page_access
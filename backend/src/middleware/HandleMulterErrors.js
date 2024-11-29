import multer from "multer";

const handleMulterError = (err, req, res, cb)=>{

    if(err instanceof multer.MulterError){
        return res  
                    .status(400)
                    .json({
                        "error": err.message || 'An error occurred during file upload.'
                    })
    }else if (err){
        return res 
                    .status(400)
                    .json({
                        "error": err.message || 'Something is horibelly wrong'
                    })
                    
    }else{
        res.json({
            message: "all upload checks passed"
        })
        next()
    }

}

export default handleMulterError
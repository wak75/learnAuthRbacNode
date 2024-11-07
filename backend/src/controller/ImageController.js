
import Image from "../models/ImageModel.js"

const uploadImage = async (req ,res)=>{
    try{

        console.log("!!!!!!!!!!!!!")
        
        const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`
        
        console.log('File:', req.file)
        console.log('User:', req.user)

        
        const image = new Image({
            filePath: req.file.path, 
            imageUrl:imageUrl,
            uploader:req.user.id,
        })
        await image.save()

        res 
            .status(200)
            .json({message: `Image uploaded successfully ${req.user.name}`})
    }catch(error){
        return res
            .status(400)
            .json({message: `Failed to uplaod image ${error}`})
    }
}

const getUserImages = async (req, res) =>{
    try{
        console.log(req.user)
        console.log(req.params.name)
        const allImages =  await Image.find({uploader:req.user.id})
        res
            .status(200)
            .send(allImages)
    }catch(error){
        return res 
                    .status(500)
                    .json({message:`Something is quite not right ${error}`})

    }
}

export {uploadImage, getUserImages}
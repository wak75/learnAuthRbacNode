
import Image from "../models/ImageModel.js"
import User from "../models/UserModel.js"
import fs  from 'fs'

const uploadImage = async (req ,res)=>{
    try{

        console.log("!!!!!!!!!!!!!")
        
        const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`
        
        console.log('File:', req.file)
        console.log('User:', req.user)

        const defaultStatus = 'private'
        const image = new Image({
            filePath: req.file.path, 
            imageUrl:imageUrl,
            uploader:req.user.id,
            currentstauts: defaultStatus,
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

    const currentUser = req.params.name
    if(req.user.role ==='admin' || req.user.role == 'moderator'){
        const user = await User.findOne({username: currentUser})
        if(!user){
            return res  
                        .status(404)
                        .json({messaeg: `${req.params.name} not found`})
        }

        const allImages = await Image.find({uploader:user.id})
        return res
                    .status(200)
                    .send(allImages)

    }
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

const toggleVisibility = async (req, res) => {
    try {
        const { name, imageid } = req.params;
        const requestingUser = req.user;
        
        const image = await Image.findById(imageid);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const imageOwner = await User.findById(image.uploader);
        if (!imageOwner) {
            return res.status(404).json({ message: 'Image owner not found' });
        }

        const hasPermission = 
            (imageOwner.username === name && requestingUser.id === image.uploader.toString()) || 
            ['admin', 'moderator'].includes(requestingUser.role);

        if (!hasPermission) {
            return res.status(403).json({ 
                message: 'You do not have permission to modify this image visibility' 
            });
        }

        image.currentstauts = image.currentstauts === 'public' ? 'private' : 'public';
        await image.save();

        return res.status(200).json({
            message: `Image visibility updated to ${image.currentstauts}`,
            imageId: imageid,
            owner: name,
            visibility: image.currentstauts
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Failed to update image visibility',
            error: error.message
        });
    }
}

const deleteImage = async (req, res) =>{
   

    try{
        const {name, imageid}  = req.params
        const requestingUser = req.user
    
        const image = await Image.findById(imageid);

        if (!image) {
            return res
                    .status(404)
                    .json({ message: `Image not found` });
        }
        
        const imageOwner = await User.findById(image.uploader);
        if (!imageOwner) {
            return res
                        .status(404)
                        .json({ message: 'Image owner not found' });
        }

        const hasPermission = 
            (imageOwner.username === name && requestingUser.id === image.uploader.toString()) || 
            ['admin', 'moderator'].includes(requestingUser.role);
    
        if (!hasPermission) {
            return res.status(403).json({ 
                message: 'You do not have permission to delete the image' 
            });
        }
    
        fs.unlinkSync(image.filePath, (error)=>{
            if(err){
                return res
                            .status(500)
                            .json({messaege: `Failed to delete the physical media ${error}`})
            }
        })
        
        await Image.findByIdAndDelete(imageid);

        return res.status(200).json({
            message: 'Image deleted successfully',
            deletedImage: {
                id: imageid,
                owner: name
            }
        });

    }catch(error){
        return res
                  .status(500)
                  .json({
                        message: 'Failed to delete image',
                        error: error.message
                    })
    }
}

export {uploadImage, getUserImages, toggleVisibility, deleteImage}
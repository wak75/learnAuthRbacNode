import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    filePath:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true,
    }, 
    uploader:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    uploadTime:{
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model("Image", imageSchema)

import express from 'express'
import dotenv from 'dotenv'
import  router  from "./routes/AuthRoutes.js"
import dbConnect from './config/DBConnection.js'
import user_router from './routes/UserRoutes.js'
import page_route from './routes/PagesRoute.js'
import ImageRoute from './routes/ImageUploadRoutes.js'
import galleryRoute from './routes/GalleryRoute.js'
dotenv.config()
const port = process.env.PORT || 6000
const app = express()
app.use(express.json())

dbConnect()


app.use("/uploads", express.static('uploads'))

app.use('/api/auth', router)
app.use('/api/data', user_router)
app.use('/user', page_route)
app.use('/api/images', ImageRoute)
app.use("/", galleryRoute)


app.listen(port,()=>{
    console.log(`The Server is running on port ${port}`)
})



import express from 'express'
import dotenv from 'dotenv'
import  router  from "./routes/AuthRoutes.js"
import dbConnect from './config/DBConnection.js'
import user_router from './routes/UserRoutes.js'
dotenv.config()
const port = process.env.PORT || 6000
const app = express()
app.use(express.json())

dbConnect()



app.use('/api/auth', router)
app.use('/api/data/', user_router)


app.listen(port,()=>{
    console.log(`The Server is running on port ${port}`)
})


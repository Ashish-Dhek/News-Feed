import express, { urlencoded } from 'express';
import mongoose, { connect } from 'mongoose';
import 'dotenv/config'
import cors from 'cors';
import connectDB from './config/db.js';
import { authRouter } from './routes/authRoute.js';
import userRouter from './routes/usersRoute.js';
import postRouter from './routes/postRoute.js';
import commentRouter from './routes/commentRoute.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';



const app= express();


// to get directory name manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




// Middleware
app.use(express.json())  // all the request getting from frontend will be parse to json
app.use(cors({origin:"http://localhost:5173",credentials:true})) //we can acces backend form any frontend
app.use(urlencoded({extended:true}))
app.use(cookieParser())
app.use("/images",express.static(path.join(__dirname,"/images")))



// database conenction
connectDB()


app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/posts",postRouter)
app.use("/api/comments",commentRouter)



// image upload
const storage= multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        
        fn(null,req.body.img)
    }

    
})


const upload= multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded ")

}) 





app.listen(process.env.PORT,()=>{
    console.log("server started")
})
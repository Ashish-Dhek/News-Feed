import mongoose from "mongoose";
import 'dotenv/config'


const connectDB= async()=>{
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('MongoDB connected...');
    }).catch((e)=>{
        console.log(e);
    })
}

export default connectDB


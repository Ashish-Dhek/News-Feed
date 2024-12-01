import mongoose from "mongoose";


const PostSchema= new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    desc:{
        type:String,
        required: true
    },
    photo:{
        type:String,
        default:''
    },
    username:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    likes:{
        type:[String],
        default:[]
    },
    views:{
        type:[String],
        default:[]
    },
    comments:{
        type:[String],
        default:[]
    }


},{timestamps:true})



const Post= mongoose.models.Post || mongoose.model("Post",PostSchema);

export default Post
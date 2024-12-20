import mongoose from "mongoose";


const CommentSchema= new mongoose.Schema({
   
    comment:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required: true
    },
    userId:{
        type:String,
        required:true
    },
    likes:{
        type:[String],
        default:[]
    },
    replies: [
        {
          replyText: {
            type: String,
            required: true,
          },
          replyAuthor: {
            type: String,
            required: true,
          },
        },
      ],

},{timestamps:true})



const Comment= mongoose.models.Comment|| mongoose.model("Comment",CommentSchema);

export default Comment
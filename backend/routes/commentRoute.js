import express from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import Post from "../models/Post.js"
import jwt from "jsonwebtoken"
import Comment from "../models/Comment.js"
import verifyToken from "../verifyToken.js"

const commentRouter= express.Router()


//create Comment

commentRouter.post("/create", verifyToken,  async(req,res)=>{

    try {

        const newComment= new Comment(req.body)
        const savedComment= await newComment.save()
        res.status(200).json(savedComment)
        
    } catch (error) {
        res.status(500).json(error)
    }
})



// update Comment

commentRouter.put("/:id",verifyToken,  async (req, res) => {

    try {
        
        

        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
        res.status(200).json(updatedComment)


    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }

})


// delete comment
commentRouter.delete("/:id", verifyToken,  async(req,res)=>{
    
    try {
        
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment deleted succesfully")

    } catch (error) {
        res.status(500).json(error)
    }
})






// get All comments from one post

commentRouter.get("/post/:postId", async(req,res)=>{

    try {
            const comments= await Comment.find({postId:req.params.postId})
            res.status(200).json(comments)


    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
})







// adding reply to a comment
commentRouter.post("/reply/:id", verifyToken, async(req,res)=>{
    try {
        const {id}= req.params;
        const {replyText, replyAuthor}= req.body

        if (!replyText || !replyAuthor) {
            return res.status(400).json({ message: 'Reply text and author are required' });
          }

          const updateComment= await Comment.findByIdAndUpdate(
            id,{$push:{replies:{replyText,replyAuthor}}},
            {new:true}
          )
          
          if (!updateComment) {
            return res.status(404).json("Comment not found");
          }

          return res.status(200).json({comment: updateComment });


        
    } catch (error) {
        return res.status(500).json(error);
    }
})


// fetching all replies
commentRouter.get("/reply/:id", verifyToken, async(req,res)=>{
    try {
        
        const commentId= req.params.id
        const comment = await Comment.findById(commentId);

        // If comment not found, send a 404 error
        if (!comment) {
            return res.status(404).json('Comment not found' );
        }

        // console.log(comment.replies)

        // Return the replies from the comment
        return res.status(200).json({ replies: comment.replies });

        
    } catch (error) {
        return res.status(500).json(error);
    }
})




export default commentRouter
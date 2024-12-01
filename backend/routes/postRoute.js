import express, { text } from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import Post from "../models/Post.js"
import jwt from "jsonwebtoken"
import verifyToken from "../verifyToken.js"


const postRouter= express.Router()


//create Post

postRouter.post("/create", verifyToken, async(req,res)=>{

    try {

        const newPost= new Post(req.body)
        const savedPost= await newPost.save()
        res.status(200).json(savedPost)
        
    } catch (error) {
        res.status(500).json(error)
    }
})



// update Post

postRouter.put("/:id", verifyToken,  async (req, res) => {

    try {
        
        

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
        res.status(200).json(updatedPost)


    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }

})


// delete Post
postRouter.delete("/:id", verifyToken,  async(req,res)=>{
    
    try {
        
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("Post deleted succesfully")

    } catch (error) {
        res.status(500).json(error)
    }
})



// get One Post

postRouter.get("/get/:id", async(req,res)=>{

    try {
            const post= await Post.findById(req.params.id)

           
            res.status(200).json(post)


    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
})



// get All Post

postRouter.get("/", async(req,res)=>{

    const query= req.query
    console.log(query)

    try {

        // geting search post
        const searchFilter= {
            title: {$regex: query.search || ""}
        }
            const post= await Post.find(searchFilter)
            res.status(200).json(post)


    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
})



// get user post

postRouter.get("/user/:id", async(req,res)=>{

    try {
            const post= await Post.find({userId:req.params.id})
            res.status(200).json(post)


    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
})


// post liked

postRouter.put("/like/:id", verifyToken, async(req,res)=>{

    try {
            // console.log(req.body)
            const currentUserId = req.body._id
            const post = await Post.findById(req.params.id)

                    // if the user has already liked the post, remove it
                    // Otherwise, add him into the likes array
            
                    if(post.likes.includes(currentUserId)){
                       post.likes = post.likes.filter((id) => id !== currentUserId)
                       await post.save()
                       return res.status(200).json({msg: "Successfully unliked the post"})
                    } else {
                       post.likes.push(currentUserId)
                      
                       await post.save()
                       return res.status(200).json({msg: "Successfully liked the post"})
                    } 
        
    } catch (error) {
        res.status(500).json(error)
    }
})


// view check


postRouter.put("/view/:id", verifyToken, async(req,res)=>{

    try {
            // console.log(req.body)
            const currentUserId = req.body._id
            const post = await Post.findById(req.params.id)

                  
            
                    if(post.views.includes(currentUserId)){
                       
                    } else {
                       post.views.push(currentUserId)
                       await post.save()
                       return res.status(200).json({msg: "Successfully liked the post"})
                    } 
        
    } catch (error) {
        res.status(500).json(error)
    }
})






export default postRouter
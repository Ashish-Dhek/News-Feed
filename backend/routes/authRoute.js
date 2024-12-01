import express from 'express'
import User from '../models/User.js'
import  bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'

const authRouter= express.Router()




// Registering user

authRouter.post("/register", async(req,res)=>{

    try {

        const {username,email,password}= req.body

        const salt= await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password, salt)


        const newUSer=new User({username,email,password:hashedPassword})
        const savedUser= await newUSer.save()

        res.status(200).json(savedUser)
        
    } catch (error) {
        res.status(500).json(error)
    }

})


// Login

authRouter.post("/login", async(req,res)=>{

    try {

        const {email}=req.body

        const user=await User.findOne({email})

        if(!user)
        {
            return res.status(404).json("User not found")
        }


        const match= await bcrypt.compare(req.body.password,user.password)

        if(!match)
        {
            return res.status(401).json("Invalid credantials!")
        }


        // creating token

        const token= jwt.sign({_id:user._id,username:user.username,email:user.email}, process.env.SECRET, {expiresIn:"1d"})
        const {password: _,...info}=user._doc


        res.cookie("token",token).status(200).json(info)



        
        
    } catch (error) {
        res.status(500).json(error)
    }
})



// logout

authRouter.get("/logout", async(req,res)=>{
    
    try {

        res.clearCookie("token",{sameSite:"none",secure:true})
        .status(200).send("User logged out")



    } catch (error) {
        res.status(500).json(error)
    }
})



// refetch user after reloading
authRouter.get("/refetch", async(req,res)=>{

    try {
        const token =req.cookies.token
        jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
            if(err)
            {
                return res.status(404).json(err)
            }
            res.status(200).json(data)
        })

    } catch (error) {
        res.status(500).json(error)
    }   

})



export {authRouter}
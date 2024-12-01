import express from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import { authRouter } from "./authRoute.js"
import verifyToken from "../verifyToken.js"


const userRouter= express.Router()




// update

userRouter.put("/:id", verifyToken, async (req, res) => {

    try {
        
        // console.log(req.body)
        if(req.body.password){
            const salt= await bcrypt.genSalt(10)
            req.body.password= await bcrypt.hash(req.body.password,salt)

        }   

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
        res.status(200).json(updatedUser)


    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }

})





// get user

userRouter.get("/get/:id", verifyToken, async(req,res)=>{

    try {
            const user= await User.findById(req.params.id)

            const {password,...info}=user._doc
            res.status(200).json(info)


    } catch (error) {
        // console.log(error)

        
        res.status(500).json(error)
    }
})




export default userRouter
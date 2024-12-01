import jwt from "jsonwebtoken"



const verifyToken= (req,res,next)=>{
    const token= req.cookies.token

    if(!token)
    {
        return res.status(401).json("Not authorized")
    }

    jwt.verify(token,process.env.SECRET, async(err,data)=>{

        if(err)
        {
            return res.status(403).json("Token is not valid")
        }
        else
        {
            req.userId= data._id
            next()
        }
    })

}


export  default verifyToken
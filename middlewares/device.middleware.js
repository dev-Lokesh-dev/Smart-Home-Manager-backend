import { user } from "../models/user.model.js"; 
import jwt from "jsonwebtoken";

// const secretkey=process.env.JWT_KEY;
export const validatedata=async (req,res,next)=>{
    
    const {username,newRoom}=req.body;
    console.log(username,newRoom)
    
    if(!username||!newRoom){
        return res.status(400).json({msg:"Bad request"})
    }
    res.locals.username=username;
    res.locals.roomname=newRoom;
    const validuser= await user.findOne({username})
    
    if(!validuser){
        return res.status(400).json({msg:"Bad request"})
    }
    next();
}

// export const tokenvalidate=async(req,res,next)=>{
//   const token= req.headers["authorization"];
//   if(!token){
//     res.status(401).json({message:"Unauthorized access",
//       error:err.message
//     })
//   }
//   try{
//   const payload=jwt.verify(token,secretkey);
//   res.locals=payload
//   next()
//   }catch(err){
//     res.status(401).json({message:"Unauthorized access",
//       error:err.message
//     })
//   }
// }

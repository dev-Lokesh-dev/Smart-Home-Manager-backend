import  {routines} from "../models/routines.model.js";
import { user } from "../models/user.model.js";

const createroutine= async(req,res)=>{
  const {username,type,time}=req.body;

  if(!username||!type||!time){
     res.status(400).json({msg:"Bad request"})
  }
  

  try{
    const newroutine={
      username,
      routine:type,
      time,
     }
    await routines.create(newroutine)
    res.status(200).json({msg:"Routine Created",
        routine:newroutine
    })
  }catch(err){
    res.status(500).json({msg:"Internal server error",
        error:err.message
    })
  }
  
}

const updateRoutine = async (req,res) => {
  const {username,lastroutine,type,time} = req.body;
  
  if(!username||!lastroutine||!time||!type){
    res.status(400).json({msg:"Bad request"})
  }
 
  const data = await routines.findOne({username:username, routine: lastroutine});
 
  if (!data) {
     return res.status(404).json({msg: 'Record not found'});
  }
 
  data.username = username;
  data.routine = type;
  data.time = time;
 
  await data.save();
 
  res.status(200).json({msg:'udated successfully'})
 
 
 }

 const deleteRoutine = async (req, res) => {
  const { username, type } = req.body;
  console.log(username,type)
  try {
    const result = await routines.deleteOne({ username, routine:type });

    if (result.deletedCount === 0) {
      return res.status(400).json({ msg: "Check your username and routine" });
    }

    res.status(200).json({ msg: "Routine deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

const getroutine= async(req,res)=>{
  const {username}=req.params;
  
  if(!username){
    return res.status(400).json({msg:"Bad request"})
 }
try{
    const data= await routines.find({username})
    return res.status(200).send(data)
}catch(err){
    res.status(500).json({msg:"Internal server error",
        error:err.message
    })
 }
}

export {createroutine,updateRoutine,deleteRoutine,getroutine}
import { user,roomNdevice } from "../models/user.model.js";
const createroomNdevice= async (req,res)=>{

    const devices=req.body.Devices
    const username=res.locals.username;
    const roomname=res.locals.roomname;
    try{
    const new_roomNdevice={
        username,
        roomname,
        device:devices,
    }
   
    const rd=await roomNdevice.create(new_roomNdevice);
   
    res.status(201).json({msg:"room and device added successfully"});
    }catch(err){
        res.status(500).json({msg:"Internal server error!",
            error:err.message
        })
    }
}

const deleteRoom=async (req,res)=>{
    const username=res.locals.username;
    const roomname=res.locals.roomname;
    try{
        await roomNdevice.deleteOne({$and:[{username:username},{roomname:roomname}]})
        res.status(200).json({msg:"user deleted"})
    }catch(err){
        res.satus(500).json({msg:"Internal server error",
            error:err.message
        })
    }
}

const updateDevive = async (req,res) => {
 const {username,lastName,Newname,devices} = req.body;

 if(!username ||!lastName ||!Newname ||!devices){
    res.status(400).json({msg:'any field is missing'})
 }

 const data = await roomNdevice.findOne({username:username, roomname: lastName});

 if (!data) {
    return res.status(404).json({msg: 'Record not found'});
 }

 data.username = username;
 data.roomname = Newname;
 data.device = devices;

 await data.save();

 res.status(200).json({msg:'udated successfully'})


}

const getroom= async (req,res)=>{
    const {username}=req.params;
    if(!username){
        return res.status(400).json({msg:"Bad request"})
    }
    try{
        const data= await roomNdevice.find({username})
        return res.status(200).send(data)
    }catch(err){
        res.status(500).json({msg:"Internal server error",
            error:err.message
        })
    }
}

const updateState = async (req, res) => {
    const { username, roomname, devicename, newState } = req.body;
  
    if (!username || !roomname || !devicename || typeof newState !== "boolean") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    try {
      const updatedRoom = await roomNdevice.findOneAndUpdate(
        { username, roomname, "device.devicename": devicename },
        { $set: { "device.$.state": newState } }
      );
  
      if (!updatedRoom) {
        return res.status(404).json({ error: "User, room, or device not found" });
      }
  
      res.json({ message: "Device state updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
};


export {createroomNdevice,deleteRoom,updateDevive,getroom,updateState}
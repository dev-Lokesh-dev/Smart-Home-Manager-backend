import {model,Schema} from "mongoose";

const userschema=new Schema({
    name:{
     type:String,
     required:true
    },
    username:{
        type:String,
        required:true,
        minlength:3,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    confirmPassword:{
        type:String,
        minlength:6
    },
    
})

const user= model("user",userschema)

const deviceschema= new Schema({
    devicename:{
        type:String,
        required:true
    },
    state:{
      type:Boolean,
      default:false
    },
    timing:{
      type:String
    }
},
{timestamps: true })

const roomdevice= new Schema({
  username:{
    type:String,
    required:true
  },
  roomname:{
    type:String,
    required:true
  },
  device:{
    type: [deviceschema],
    default:[]
}
})

const roomNdevice= model("roomdevice",roomdevice)

export {user,roomNdevice}
import {Router} from "express";
import { createroomNdevice,deleteRoom ,updateDevive,getroom,updateState} from "../controller/roomNdevice.control.js";
import { validatedata } from "../middlewares/device.middleware.js";
const roomNdeviceRouter=Router();

roomNdeviceRouter.post('/update',updateDevive)
roomNdeviceRouter.post('/updateState',updateState)
roomNdeviceRouter.get("/send/:username",getroom)
roomNdeviceRouter.use(validatedata);
roomNdeviceRouter.post("/create",createroomNdevice)
// roomNdeviceRouter.update("/update")
roomNdeviceRouter.delete("/delete",deleteRoom)

export {roomNdeviceRouter}
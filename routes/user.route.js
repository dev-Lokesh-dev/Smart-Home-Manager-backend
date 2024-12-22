import {Router} from "express";
// import { userSchemaValidation } from "../middlewares/user.middleware.js";
import { register,login} from "../controller/user.control.js";

const userRouter=Router();

userRouter.post("/signup",register);
userRouter.post("/login",login)


export {userRouter}
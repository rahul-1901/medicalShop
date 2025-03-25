import Usermodel from "../models/user.model.js";
import {Router} from 'express';
import { searchedUser, userDetails } from "../controllers/user.controller.js";

const userRoutes = Router();
userRoutes.get("/userDetails", userDetails)
userRoutes.post("/searchedUser", searchedUser)

export default userRoutes
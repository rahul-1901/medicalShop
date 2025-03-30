import {Router} from 'express';
import { addCustomer, searchedUser, userDetails } from "../controllers/admin.controller.js";
import { userAuthentication } from "../middleware/admin.middleware.js";

const userRoutes = Router();
userRoutes.get("/userDetails", userAuthentication, userDetails)
userRoutes.post("/searchedUser", userAuthentication, searchedUser)
userRoutes.post("/createUser", userAuthentication, addCustomer)

export default userRoutes
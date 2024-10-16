import express from "express"
import {updateUser} from "../controllers/user.controller.js";
import {protectRoute} from "../middleware/protectRoute.js";

const router = express.Router();

router.put('/updateUser', updateUser, protectRoute)
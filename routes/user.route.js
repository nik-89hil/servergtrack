import express from "express";
import { findAndAddUser , profileGetter } from "../controllers/user.controller.js";
import  protect from  "../middleware/protect.js";


const router = express.Router();



router.post("/auth" ,findAndAddUser);
router.get("/my-profile",protect, profileGetter);


export default router
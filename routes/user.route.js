import express from "express";
import { findAndAddUser } from "../controllers/user.controller.js";
import protect from "../middleware/protect.js";


const router = express.Router();



router.post("/auth",protect ,findAndAddUser);
// router.get("/my-profile",profileGetter);


export default router
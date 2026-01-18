import express from "express";
import { addExam, addComment,deleteExam, deleteComment, collectStats} from "../controllers/exam.controller.js";
import { adminProtect } from "../middleware/adminprotect.js";
import protect from "../middleware/protect.js";

const router = express.Router();



router.post("/add-exam",protect, adminProtect, addExam);
router.post("/add-comment/:id",protect , adminProtect,addComment);
router.get("/delete-exam/:id",protect,adminProtect, deleteExam);
router.get("/delete-comment/:id",protect, adminProtect, deleteComment);
router.get("/get-stats", collectStats)

export default router
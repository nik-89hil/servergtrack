import express from "express";
import { addExam, addComment} from "../controllers/exam.controller";

const router = express.Router();



router.post("/add-exam",addExam);
router.post("/add-comment",addComment);


export default router
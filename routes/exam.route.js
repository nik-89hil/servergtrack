import express from "express";
import {getAllExams, getResult, getExam, getApplication} from "../controllers/exam.controller.js"
import protect from "../middleware/protect.js";

const router = express.Router();



router.get("/all-exam",protect, getAllExams);
router.get("/application",protect, getApplication);
router.get("/result",protect, getResult);
router.get("/exam/:id",protect, getExam);


export default router
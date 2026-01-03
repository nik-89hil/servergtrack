import express from "express";
import {getAllExams, getResult, getExam, getApplication} from "../controllers/exam.controller.js"

const router = express.Router();



router.get("/all-exam", getAllExams);
router.get("/application",getApplication);
router.get("/result",getResult);
router.get("/exam/:id",getExam);


export default router
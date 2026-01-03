import Exam from "../models/exam.model.js"
import Comment from "../models/comment.model.js"



export const addExam = async (req, res) => {
    try {

        const { title, category, conductedBy, intro, description } = req.body;

        const data = await Exam.create({
            title,
            category,
            conductedBy,
            intro,
            description,
        });

        res.json({
            data,
            success: true
        })

    } catch (error) {
        res.status(401).json({ message: 'error in exam category' })

    }

}


export const addComment = async (req, res) => {
    try {
        const { id, text, link, linkTitle, status } = req.body;

        const data = await Comment.create({
            text,
            link,
            linkTitle,
            status,
        });


        const findit = await Exam.findByIdAndUpdate(
            id,
            { $push: { comments: data._id } },
            { new: true }
        )

        res.json({
            success:true,
            findit,
        })


    } catch (error) {
        res.status(401).json({ message: error.message })

    }
}

export const getAllExams = async(req,res) => {
    try {

        const data = await Exam.find().select("comment") ;

        res.json(data);
        
    } catch (error) {
        res.status(401).json({ message: error.message })
        
    }
}

export const getResult = async(req,res) => {
    try {

        const data = await Comment.find({status:"result"}) ;

        res.json(data);
        
    } catch (error) {
        res.status(401).json({ message: error.message })
        
    }
}

export const getApplication = async(req,res) => {
    try {

        const data = await Comment.find({status:"application"}) ;

        res.json(data);
        
    } catch (error) {
        res.status(401).json({ message: error.message })
        
    }
}

export const getExam = async(req,res) => {
    try {

        const id = req.params.id;

        const data = await Exam.findById(id) ;

        res.json(data);
        
    } catch (error) {
        res.status(401).json({ message: error.message })
        
    }
}
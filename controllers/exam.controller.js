import Exam from "../models/exam.model.js"
import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"


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
            message: "Exam added successfully !!",
            success: true
        })

    } catch (error) {
        res.status(401).json({ message: error.message, success: false });

    }

}


export const addComment = async (req, res) => {
    try {
        const id = req.params.id;
        const { text, link, linkTitle, status } = req.body;

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
        );

        if (findit === null) {
            res.json({
                message: "exam doesn't exist, can't add comment...",
                data: null,
                success: true
            })
        }

        res.json({
            data: data,
            success: true,
            findit,
        })


    } catch (error) {
        res.status(401).json({ message: error.message, success: false })

    }
}

export const getAllExams = async (req, res) => {
    try {

        const data = await Exam.find().select("-comments");

        res.json(data);

    } catch (error) {
        res.status(401).json({ message: error.message })

    }
}

export const getResult = async (req, res) => {
    try {

        const data = await Comment.find({ status: "result" });

        if (data.length === 0) {
            res.json({
                message: "doesn't contain any result..",
                data: null,
                success: true,
            });
        }

        res.json({
            message: "loaded all results successfully !!",
            data,
            success: true
        });


    } catch (error) {
        res.status(401).json({ message: error.message, success: false })

    }
}

export const getApplication = async (req, res) => {
    try {

        const data = await Comment.find({ status: "application" });

        if (data.length === 0) {
            res.json({
                message: "doesn't contain any application..",
                data: null,
                success: true,
            });
        }

        res.json({
            message: "loaded all application successfully !!",
            data,
            success: true
        });

    } catch (error) {
        res.status(401).json({ message: error.message, success: false });

    }
}

export const getExam = async (req, res) => {
    try {

        const id = req.params.id;

        const data = await Exam.findById(id).select("-comments");

        if (data === null) {
            res.json({
                message: "Exam not exist..",
                data: null,
                success: true,
            })
        }

        res.json({
            message: "Exam loaded successfully !!",
            data: data,
            success: true
        });

    } catch (error) {
        res.status(401).json({ message: error.message, success: false })

    }
}

export const deleteExam = async (req, res) => {
    try {

        const id = req.params.id;

        const result = await Exam.findByIdAndDelete(id);

        if (result === null) {
            res.json({
                message: "already deleteted or never exist..",
                data: null,
                success: true,
            })
        }

        res.json({
            message: "success fully deleted !!",
            data: null,
            success: true
        });


    } catch (error) {

        res.status(401).json({ message: error.message, success: false });

    }
}

export const deleteComment = async (req, res) => {
    try {


        const id = req.params.id;

        const result = await Comment.findByIdAndDelete(id);

        if (result === null) {
            res.json({
                message: "already deleteted or never exist..",
                data: null,
                success: true,
            })
        }

        res.json({
            message: "success fully deleted !!",
            data: null,
            success: true
        });


    } catch (error) {

        res.status(401).json({ message: error.message, success: false });

    }
}

export const collectStats = async (req, res) => {
    try {

        const toExams = await Exam.countDocuments();
        const tobank = await Exam.countDocuments({ category: "banking" });
        const tossc = await Exam.countDocuments({ category: "ssc" });
        const torailway = await Exam.countDocuments({ category: "railway" });
        const toother = await Exam.countDocuments({ category: "other" });
        const touser = await User.countDocuments({isAdmin:false});
        const tocomment = await Comment.countDocuments();

        res.json({
            toExams,
            tobank,
            tossc,
            torailway,
            toother,
            tocomment,
            touser,
            message:"Total Stats are fetched successfully !!",
            success:true
        });


    } catch (error) {
        res.status(401).json({
            message: error.message,
            success: false
        })

    }
}
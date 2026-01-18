

export const adminProtect = (req,res,next) => {
    try {

        const checkAdmin = req.user.isAdmin ;

        if(!checkAdmin){
            //means it is user trying to go in admin

            res.json({
                message:"You are not authorised for this...",
                isUser:true,
                success:false,
            });
            return
        }

        next();

    } catch (error) {

        res.status(401).json({
            message:error.message,
            success:false
        })
        
    }


}
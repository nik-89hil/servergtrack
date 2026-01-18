import { OAuth2Client } from 'google-auth-library'
import User from  '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const findAndAddUser = async (req, res) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    try {
    const { token } = req.body

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const { name, email, picture, sub } = ticket.getPayload()

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        picture,
        googleId: sub
      })
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful',
      token: jwtToken,
      data:user,
      success:true
    })

    } catch (err) {
    res.status(401).json({ message: 'Authentication failed', success:false })
  }


};

export const profileGetter = async (req,res ) =>{
  try {

    const user = req.user ;
    let finduser = await User.findById(user._id).select("-googleId");

    if(!finduser){
      res.json({
        isLogin:false,
        message:"Please, create your account using google..."
      });

    }

    res.status(200).json({
        message:"fetching successfully",
        data:finduser,
        success:true
    })


    
  } catch (error) {
    res.status(401).json({ message: 'failed to get Information', success:false })
  }

}
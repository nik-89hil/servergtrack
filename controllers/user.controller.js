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
      user
    })

    } catch (err) {
    res.status(401).json({ message: 'Authentication failed' })
  }

//   try {
//     const { name, email } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: "User already exists" });

//     const user = await User.create({ name, email, password });

//     res.json({
//       message: "Registration successful",
//       token: generateToken(user._id),
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
};

export const profileGetter = async (req,res ) =>{
  try {

    const user = req.user ;
    let finduser = await User.findById(user._id).select("-googleId");

    if(!finduser){
      res.json({
        isLogin:false,
        message:"Please, create your account"
      });

    }

    res.status(200).json({
      ...finduser
    })


    
  } catch (error) {
    res.status(401).json({ message: 'failed to get Information' })
  }

}
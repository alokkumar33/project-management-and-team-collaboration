import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const {name,email,password,profileImageUrl,adminJoinCode} = req.body;

    if(!name || !email || !password || name==='' || email==='' || password===''){
        return next(errorHandler(400, 'Name, email and password are required'));
    }

    //check if user already exists
    const isAlreadyExist = await User.findOne({email});
    if(isAlreadyExist){
        return next(errorHandler(400, 'User already exists'));
    }

    //check user role
    let role = 'user';
    if(adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE){
        role = 'admin';
    }

    const hashedPassword = await bcryptjs.hashSync(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profileImageUrl,
        role
    });

    try {
        await newUser.save();
        res.status(201).json({success:true, message:'Signup successfully'});
    } catch (error) {
        next(error.message);
    }


}

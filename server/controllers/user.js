import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import Users from '../models/Users.js';
export const signIN = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const existingUser = await Users.findOne({email});
        if(!existingUser){
         return res.status(404).json({message:"User not exist..."});
        }
        const samepassward = await bcrypt.compare(password,existingUser.password);
        if(!samepassward) {
         return res.status(404).json({message:'Password not match...'});
        }
        const token = jwt.sign({email:existingUser.email, id:existingUser._id},'test',{expiresIn:"1hr"});
        return res.status(200).json({token, result:existingUser});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'something went wrong please try again later...'});
    }

}

export const signUP = async (req,res)=>{
    try {

        const {   firstName,lastName,email,password,confirmPassword} = req.body;
        const existingUser = await Users.findOne({email});
        if(existingUser){
         return res.status(404).json({message:"User Already exist ..."});
        }
        if(password!== confirmPassword){
            return res.status(404).json({message:"Password is not same...."})
        }
        const pwd = await bcrypt.hash(password,13);
        const result = await Users.create({email:email, name: `${firstName} ${lastName}`, password:pwd});
        console.log(result);
        const token = jwt.sign({email:result.email, id:result._id},'test',{expiresIn:"1hr"});
        return res.status(200).json({token, result:result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong please try again later...' });
    }
}
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export  const getPosts= async (req,res)=>{
    try {
        // res.send('This Works');
        const postMessages  = await PostMessage.find({})
        // console.log(postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message:error.message})
        console.log(error);
    }
}

export const createPost = async(req,res)=>{
    const post = req.body;
    
    const newPost = new PostMessage({ ...post, Creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.send(409).json({message:error.message})
    }
}

export const updatePost = async(req,res)=>{

    const id = req.params.id;
    console.log(id);
    const { title, message, Creator, selectedFile, tags } = req.body;   
     try {
        if(mongoose.Types.ObjectId.isValid(id)){
            const updatedPost = { Creator, title, message, tags, selectedFile, _id: id };
            // const post = PostMessage.findById(id);
            await PostMessage.findByIdAndUpdate(id, {Creator:Creator, title:title, message:message, tags:tags,selectedFile:selectedFile}, { new: true });
            res.json(updatedPost);
        }
        // else{
        //  return    res.send(404).json({message:"Post not found"});
        // }
    } catch (error) {
        console.log(error);
         res.sendStatus(404).json({message:error.message});
    }
}

export const deletePost  = async(req,res)=>{
  const id = req.params.id;
  try {
    if(mongoose.Types.ObjectId.isValid(id)){
        await PostMessage.findByIdAndRemove(id);
        res.send("Post delete successfully...");
    }
    // else{
    //   return  res.send(404).json({message:"Post not found"});
    // }
  } catch (error) {
    console.log(error);
    res.send(501).json({message:error.message})
  }
}
export const updateLikePost = async(req,res)=>{
     const id= req.params.id;
     try {
        if(!req.userId){
            return res.json({message:"unAuthorized..."});
        }
        if(mongoose.Types.ObjectId.isValid(id)){
            const post = await PostMessage.findById(id);

            const index = post.likes.findIndex((id) => id ===String(req.userId));

            if (index === -1) {
              post.likes.push(req.userId);
            } else {
              post.likes = post.likes.filter((id) => id !== String(req.userId));
            }
           const updatedPost=  await PostMessage.findByIdAndUpdate(id,post,{new:true} );
           console.log('in controller');
            res.json(updatedPost);
        }
        // else{
        //   return  res.send(404).json({message:"Post not found"});
        // }
     } catch (error) {
        res.send(501).json({message:error.message})
     }
}
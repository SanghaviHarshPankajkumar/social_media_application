import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export  const getPosts= async (req,res)=>{
    try {
        // res.send('This Works');
        const {page} = req.query;
        const LIMIT  = 6;
        const total = await PostMessage.countDocuments({});
        const startIndex = Number(page-1)*LIMIT;
        const postMessages  = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)
        // console.log(postMessages);
        res.status(200).json({data : postMessages, numberOfPage: Math.ceil(total/LIMIT), currentPage:Number(page)});
    } catch (error) {
        res.status(404).json({message:error.message})
        console.log(error);
    }
}

export const getPostsBySearch = async(req,res)=>{
    try {
        const {searchQuery, tags} = req.query;
        const title = new RegExp(searchQuery,'i');
        console.log(tags);
        const posts = await PostMessage.find({$or: [{title}, {tags: {$in: tags.split(',') }}]});
        console.log('inside the getPostBySearch');
        console.log(posts.length);
        res.json({data:posts})
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message})
    }
}

export const getPost = async(req,res) => {
    try {
        console.log('inside the getPost');
        const {id} = req.params;
        const post = await PostMessage.findById(id);
        console.log(post);
        res.json({data:post});
    } catch (error) {
        console.log(error);
        res.status(404).json*=({message:error.message})
    }
}
export const createPost = async(req,res)=>{
    const post = req.body;
    
    const newPost = new PostMessage({ ...post,tags:post.tags.split(','), Creator: req.userId, createdAt: new Date().toISOString() })
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
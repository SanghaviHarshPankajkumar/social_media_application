import axios from 'axios';

const API1 = axios.create({baseURL:'http://localhost:5000/'});

axios.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization  = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
});

export const fetchPosts = ()=> API1.get('posts');
export const createPost = (newPost)=> API1.post('posts',newPost);
export const updatePost = (id,updatedPost)=> API1.patch(`posts/${id}`,updatedPost);
export const deletePost = (id)=> API1.delete(`posts/${id}`);
export const updateLikePost = (id)=> API1.patch(`posts/${id}//likePost`);

export const signIN = (formData)=> API1.post('user/signin',formData);
export const signUP = (formData)=> API1.post('user/signup',formData);




//old approch 
// const url = 'http://localhost:5000/posts';
// export const fetchPosts = ()=> axios.get(url);
// export const createPost = (newPost)=>    axios.post(url,newPost);
// export const updatePost= (id,updatedPost)=> axios.patch(`${url}/${id}`,updatedPost);
// export const deletePost = (id)=> axios.delete(`${url}/${id}`);
// export const updateLikePost = (id)=> axios.patch(`${url}/${id}/likePost`);
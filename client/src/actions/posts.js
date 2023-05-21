import * as api from '../api';

export const getPosts=()=> async(dispatch)=>{
    try {
        console.log('this also works...');
         const {data}=  await api.fetchPosts();
         console.log(data);
         const action  = {type:'FETCH_ALL',payload:data}
         dispatch(action);
    } catch (error) {
        console.error(error);
        console.error(error.message)
    }
    
  
}

export const createPost = (post)=> async (dispatch)=>{
    try {
        const {data} = await api.createPost(post)
        const action  = {type:'CREATE', payload:data};
        dispatch(action);
    } catch (error) {
        console.error(error);
    }
}

export const updatePost= (id,updatedPost)=>async(dispatch)=>{
    try {
        console.log('in update post method');
        const {data}= await api.updatePost(id,updatedPost);
        console.log({data});
        const action= {type:'UPDATE_POST',payload:data};
        dispatch(action);
    } catch (error) {
        console.error(error);
    }
}
export const deletePost = (id)=>async(dispatch)=>{
    try {
        await api.deletePost(id);
        const action = {type:'DELETE_POST',payload:id};
        dispatch(action);

    } catch (error) {
        console.error(error);   
    }
}
export const updateLikePost = (id)=>async(dispatch)=>{
    try {
        const {data}  = await api.updateLikePost(id);
        const action  = {type:'UPDATE_POST',payload:data};
        dispatch(action);
    } catch (error) {
        console.error(error);
    }
}
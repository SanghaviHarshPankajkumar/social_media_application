import * as api from '../api';

export const getPosts=(page)=> async(dispatch)=>{
    try {
        dispatch({type: 'START_LOADING'});
        console.log('this also works...');
         const {data}=  await api.fetchPosts(page);
         console.log(data);
         const action  = {type:'FETCH_ALL',payload:data}
         dispatch(action);
         dispatch({type: 'END_LOADING'});
    } catch (error) {
        console.error(error);
        console.error(error.message)
    }
    
  
}
export const getPost=(id)=> async(dispatch)=>{
    try {
        dispatch({type: 'START_LOADING'});
        console.log('this also works...');
         const {data:{data}}=  await api.fetchPost(id);
         console.log(data);
         const action  = {type:'FETCH_POST',payload:data}
         dispatch(action);
         dispatch({type: 'END_LOADING'});
    } catch (error) {
        console.error(error);
        console.error(error.message)
    }
    
  
}

export const getPostBySearch = (searchQuery)=> async(dispatch)=> {

    try {
        dispatch({type:'START_LOADING'});
        const {data:{data}} = await api.fetchPostBySearch(searchQuery);
        const action = {type:'FETCH_BY_SEARCH', payload:data};
        dispatch(action);
        console.log(data);
        dispatch({type: 'END_LOADING'});
    } catch (error) {
        console.error(error);
    }
}
export const createPost = (post,history)=> async (dispatch)=>{
    try {
        const {data} = await api.createPost(post)
        history.push(`/posts/${data._id}`);
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
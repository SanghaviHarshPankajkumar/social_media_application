import { TextField , Paper,Button,Typography } from "@material-ui/core"
import FileBase from 'react-file-base64'
import useStyles from './styles'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { createPost } from "../../actions/posts";
import { updatePost } from "../../actions/posts";

const Form =({id,setId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData,setPostData] = useState({
        title:'',
        tags:'',
        message:'',
        selectedFile:'',
        
    });
    const user  = JSON.parse(localStorage.getItem('profile'));
    const post  = useSelector((state)=> id?state.posts.find((post)=> post._id===id):null);
  
    useEffect(()=>{
        if(post){
            setPostData(post)
        }
    },[post])
    const handleSubmit = (e)=>{
            e.preventDefault();
            if(id==null){
                console.log('id is zero');
                console.log(id);
                dispatch(createPost({...postData,name:user?.result?.name}));
                
            }
            else{
                console.log('update procedure start');
                console.log(id);
                dispatch(updatePost(id,{...postData,name:user?.result?.name}));
                setId(null);
            }
        console.log({e});
        clearPost();

    }
    const clearPost= ()=>{
        setPostData(
            {
                title:'',
                tags:'',
                message:'',
                selectedFile:'',
            }
        )
    }
    return (
        
      <Paper className={classes.paper}>
        {
            (user?.result ) ? (
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form} `} onSubmit={handleSubmit}>
                <Typography variant='h6'>{id?"Updating" : "Creating"} Post</Typography>
                <TextField className={classes.textInput} name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title: e.target.value})}/>
                <TextField className={classes.textInput} name='Tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData, tags: e.target.value})}/>
                <TextField className={classes.textInput} name='message' multiline minRows={3} variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e)=> setPostData({...postData, message: e.target.value})}/>
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false} onDone= {({base64})=> setPostData({...postData , selectedFile: base64})}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" fullWidth size="large"> Submit </Button>
                <Button  variant="contained" color="secondary" fullWidth size="small" onClick={clearPost}> Cancel </Button>
            </form>
            ):
           (
            <Typography variant="h3"> </Typography>
           )
        }
           
      </Paper>
    )
}
export default Form
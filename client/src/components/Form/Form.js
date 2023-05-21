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
        Creator:'',
        title:'',
        tags:'',
        message:'',
        selectedFile:'',
    });
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
                dispatch(createPost(postData));
                
            }
            else{
                console.log('update procedure start');
                console.log(id);
                dispatch(updatePost(id,postData));
                setId(null);
            }
        console.log({e});
        clearPost();

    }
    const clearPost= ()=>{
        setPostData(
            {
                Creator:'',
                title:'',
                tags:'',
                message:'',
                selectedFile:'',
            }
        )
    }
    return (
      <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form} `} onSubmit={handleSubmit}>
                <Typography variant='h6'>{id?"Updating" : "Creating"} Post</Typography>
                <TextField className={classes.textInput} name='creator' variant='outlined' label='Creator' fullWidth value={postData.Creator} onChange={(e)=> setPostData({...postData, Creator: e.target.value})}/>
                <TextField className={classes.textInput} name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title: e.target.value})}/>
                <TextField className={classes.textInput} name='Tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData, tags: e.target.value})}/>
                <TextField className={classes.textInput} name='message' multiline minRows={3} variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e)=> setPostData({...postData, message: e.target.value})}/>
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false} onDone= {({base64})=> setPostData({...postData , selectedFile: base64})}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" fullWidth size="large"> Submit </Button>
                <Button  variant="contained" color="secondary" fullWidth size="small" onClick={clearPost}> Cancel </Button>
            </form>
      </Paper>
    )
}
export default Form
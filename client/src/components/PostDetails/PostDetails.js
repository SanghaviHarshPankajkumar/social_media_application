import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import useStyles from './styles'
import moment from 'moment';
import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import {getPost} from '../../actions/posts'
const PostDetails = ()=>{

    const {post,posts,isLoading} = useSelector((state)=> state.posts);
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const {id} = useParams();
    useEffect(()=>{
       dispatch(getPost(id));
    },[id]);
    if(!post) return null;
    if(isLoading) {
        return(
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="10em"/>
            </Paper>
        )
    }
    return(
        <Paper style={{padding:'20px', borderRadius:'15px'}} elevation={6}>

            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant='h3' component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant='h6' color='textSecondary' component="h2"> {post.tags} </Typography>
                    <Typography gutterBottom variant='body1' component='p'>{post.message} </Typography> 
                    <Typography variant='h6'>Created By: {post.name}</Typography>
                    <Typography variant='body1'>Created At: {moment(post.createdAt).fromNow()}</Typography>
                    
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile|| 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title}/>

                </div>
            </div>
        </Paper>
    )
}
export default PostDetails;
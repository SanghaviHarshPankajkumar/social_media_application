import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import useStyles from './styles'
import moment from 'moment';
import { CircularProgress, Divider, Paper, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import {getPost, getPostBySearch} from '../../actions/posts'
import Comments from './Comments/Comments';
const PostDetails = ()=>{

    const {post,posts,isLoading} = useSelector((state)=> state.posts);
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const {id} = useParams();
    useEffect(()=>{
        if(post)
       { 
        dispatch(getPostBySearch({search:'none', tags: post.tags.join(',')}))
       }
    },[post]);

    useEffect(()=>{
       dispatch(getPost(id));
    },[id]);
    if(!post) return null;
    if(isLoading ) {
        return(
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="10em"/>
            </Paper>
        )
    }
    const openPost=(_id) =>{
        history.push(`/posts/${_id}`);
    }
    const recomendedPost = posts.filter(({_id})=> _id!==post._id)
    return(
        <Paper style={{padding:'20px', borderRadius:'15px'}} elevation={6}>

            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant='h3' component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant='h6' color='textSecondary' component="h2"> {post.tags.map((tag)=> (`#${tag}`))} </Typography>
                    <Typography gutterBottom variant='body1' component='p'>{post.message} </Typography> 
                    <Typography variant='h6'>Created By: {post.name}</Typography>
                    <Typography variant='body1'>Created At: {moment(post.createdAt).fromNow()}</Typography>
                    
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile|| 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title}/>
                </div>
            </div>
            <Divider style={{margin:'20px'}}/>
            <div className={classes.section}>
                <Comments post={post}/>
            </div>
            {recomendedPost.length>0 && 
            <div className={classes.section} >
                <Typography gutterBottom variant='h5'>You may also like these</Typography>
                <Divider/>
                <div className={classes.recommendedPosts}>
                    {recomendedPost.map(({title, name, message,selectedFile,_id,likes}) => (
                        <div style={{margin:'20px', cursor:'pointer'} } className={classes.section} onClick={()=> openPost(_id)}>
                            <Typography variant='h6' gutterBottom> {title} </Typography>
                            <Typography variant='subtitle2' gutterBottom>{name}</Typography>
                            <Typography variant='subtitle2' gutterBottom>{message}</Typography>
                            <Typography variant='subtitle1' gutterBottom>{likes.length} Likes</Typography>
                            <img src = {selectedFile} width="200px" alt='background'/>

                        </div>
                    ))}
                </div>
            </div> 
            }
        </Paper>
    )
}
export default PostDetails;
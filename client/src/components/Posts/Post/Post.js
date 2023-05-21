import useStyles from './styles';
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete'
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, updateLikePost } from '../../../actions/posts';
const Post =({post, id,setId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
        <div className={classes.overlay}>
            <Typography variant='h6'>{post.Creator}</Typography>
            <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
            <Button style={{color:'white'}} size='small' onClick={()=>{   setId(post._id);}}>
                <EditIcon fontSize='medium'></EditIcon>
            </Button>
        </div>
        <div className={classes.details}>
            <Typography variant='body2' color='textSecondary'>{post.tags}</Typography>
        </div>
            <Typography variant='h5' className={classes.title} gutterBottom>{post.title}</Typography>
        <CardContent>
            <Typography variant='body2' type='p' color='textSecondary'>{post.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button color='primary' size='small' onClick={()=>{
           dispatch(updateLikePost(post._id))
          }} >
            <ThumbUpAltIcon fontSize='small'/>
           &nbsp; Like &nbsp;
            { post.likeCount}
          </Button>
          <Button color='primary' size='small' onClick={()=>{
            dispatch(deletePost(post._id))
          }}>
            <DeleteIcon fontSize='small'/>
          </Button>
        </CardActions>
      </Card>
    )
}
export default Post
import Post from "./Post/Post"
import {Grid, CircularProgress} from '@material-ui/core'
import { useSelector } from "react-redux"
import useStyles from './styles'

const Posts =({id, setId})=>{
    const classes = useStyles();
    
    const {posts,isLoading}  = useSelector((state)=> state.posts);
    console.log(posts);
    console.log(posts.length);
    if(isLoading===false && posts.length===0) return 'NO Posts are there';
    return (
      isLoading? <CircularProgress/>:(
         <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {
                posts.map((post)=>(
     
                    <Grid key={post._id} item xs={12} sm={6} lg={4}>
                        <Post post={post} id={id} setId= {setId}/>
                    </Grid>
                ))
            }
        

         </Grid>

      )
    )
}
export default Posts
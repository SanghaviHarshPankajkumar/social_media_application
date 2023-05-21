import { Container,Grow,Grid} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Posts from '../Posts/Posts.js'
import Form from '../Form/Form.js'
import {getPosts} from'../../actions/posts.js';
const Home = ()=>{

    const dispatch = useDispatch();
    const [id,setId] =  useState(null);
     useEffect(()=>{
          dispatch(getPosts());
     },[dispatch]);
    return(
        <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
            <Posts id={id} setId ={setId}/>
            </Grid>
           <Grid item xs={12} sm={4}>
               <Form setId={setId} id={id}/>
           </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}
export default Home;
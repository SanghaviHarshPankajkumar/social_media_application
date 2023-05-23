import { Container,Grow,Grid, Paper, AppBar, TextField, Button} from "@material-ui/core";
import ChipInput from 'material-ui-chip-input'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Posts from '../Posts/Posts.js'
import Form from '../Form/Form.js'
import Pagination from '../Pagination/Pagination.js'
import {getPosts, getPostBySearch} from'../../actions/posts.js';
import { useHistory, useLocation } from "react-router-dom";
import useStyles from './styles.js'
function useQuery(){
  return new URLSearchParams(useLocation().search);
}
const Home = ()=>{

    const dispatch = useDispatch();
    const [id,setId] =  useState(null);
    const classes = useStyles();
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') ||1 ; 
    const searchQuery = query.get('searchQuery');

    const [search,setSearch] = useState("");
    const [tags,setTags] = useState([]);

 
     const handleSearch = (e)=>{
        if(e.keyCode===13){
            SearchPost();
        }
     }
     const handleAdd = (e)=>{
        setTags([...tags, e]);
     }
     const handleDelete = (tag)=>{
        setTags(tags.filter((tag1)=> tag1!==tag));
     }

     const SearchPost = ()=>{
        if(search.trim() || tags.length>0){
           dispatch( getPostBySearch({search, tags: tags.join(',')}))
           history.push(`/posts/search?searchQuery=${search}&tags=${tags.join(',')}`);
        }
        else{
            history.push('/');
        }
     }
    return(
        <Grow in>
        <Container maxWidth='xl'>
          <Grid container justifyContent='space-between' alignItems="stretch" spacing={3} className={classes.gridContainer} >
            <Grid item xs={12} sm={6} md={9}>
            <Posts id={id} setId ={setId}/>
            </Grid>
           <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit" >
                <TextField
                  fullWidth
                  variant="outlined"
                  name="search"
                  label="Search Posts"
                  value={search}
                  onChange={(e)=> setSearch(e.target.value)}
                  onKeyPress={handleSearch}
                />

                <ChipInput
                fullWidth
                 variant="outlined"
                 value={tags}
                 label= "Search By tags"
                 style={{margin:"10px 0"}}
                 onAdd={handleAdd}
                 onDelete={handleDelete}
                />
                <Button color="primary" variant="contained" onClick={SearchPost} className={classes.searchButton} > Search </Button>
            </AppBar>
               <Form setId={setId} id={id}/>
               {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
           </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}
export default Home;
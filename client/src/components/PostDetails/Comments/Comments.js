import React, { useEffect, useRef, useState } from 'react'
import useStyles from './styles';
import { Button, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createComment } from '../../../actions/posts';
const Comments = ({post}) => {
    const classes  = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const commentRef = useRef();
    const handleClick = async()=>{
          const final_commment = `${post?.name} : ${comment}`;
      const new_comments = await dispatch(createComment(post._id, {comment: final_commment}));
          setComments(new_comments);
          // console.log(new_comments);
          setComment("");
          commentRef.current.scrollIntoView({behevior: 'smooth'});
    }

  return (
    <div className={classes.commentsOuterContainer}>
              <Typography gutterBottom variant='h6'>Comments</Typography>
        <div style={{width:'100%', padding:'20px'}}>
         
            <TextField multiline minRows={1} maxRows={3} style={{width:'80%'}}  variant='outlined' label='Write a Comment...' value = {comment} onChange={(e)=> setComment(e.target.value)}/>
            <Button style={{marginLeft:'20px', width:'15%'}} variant='contained'   onClick={handleClick} disabled={!comment} color='primary'>
                Submit
            </Button>
        </div>
      <div className={classes.commentsInnerContainer}>
        {
            comments.map((c,i)=>(
                <Typography gutterBottom variant='subtitle1' key={i}>
                  <strong>{c.split(' :')[0]} </strong>
                    {`: ${c.split(' :')[1]}`}
                </Typography>
            ))
        }
      <div ref={commentRef}/>
      </div>
    </div>
  )
}

export default Comments

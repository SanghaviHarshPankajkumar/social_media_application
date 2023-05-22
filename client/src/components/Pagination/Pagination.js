import React from 'react'

import {Pagination,PaginationItem } from '@material-ui/lab';
import useStyles from './styles';
import { Link } from 'react-router-dom';
const Paginate = ()=>{
    
    const classes  = useStyles();

    return(
        <Pagination 
        page={1}
        count={5}
        classes={{ul: classes.ul}}
        variant='outlined'
        color='primary'
        renderItem={(item)=>(
            <PaginationItem {...item} component={Link} to= {`/posts?Page=${1}`} />
        )}
        />
    )

}

export default Paginate;
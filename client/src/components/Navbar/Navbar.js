
import { Button, AppBar,Avatar,Toolbar,Typography} from "@material-ui/core";
import useStyles from './styles.js';
import {Link, useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode'
import image from '../../image/saved_image.png'
// TODO ADD IMAGE IN LINE NO. 14 
const Navbar = ()=>{
    const classes  = useStyles();
    const location = useLocation();
    const history  = useHistory();
    const dispatch = useDispatch();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = ()=>{
        setUser(null);
        dispatch({type:'LOGOUT'});
        history.push('/Login');
        
    }
    useEffect(()=>{
      const token = user?.token;
      if(token){
        const decodedToken = decode(token);
        if(decodedToken.exp*1000 < new Date().getTime()){
            logout();
        }
      }
      setUser(JSON.parse(localStorage.getItem('profile')))   ;
    },[location])
    return(
        <AppBar className={classes.appBar} position="static" color='inherit'>
       <Link to="/" style={{font:'none', textDecoration:'none'}}> <Typography className={classes.heading} variant="h2" align="center"> Social App</Typography></Link>
        <img className={classes.image} src={image} alt='main' height='60'/>

        <Toolbar className={classes.toolbar}>
         {
            user? (
                <div className={classes.profile} >
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}> LogOut</Button>
                </div>
            ):
             (
                <Button component={Link} to='/Login' variant='contained' color='primary'>Sign IN</Button>
             )
            
         }

        </Toolbar>
      </AppBar>
    )
}
export default Navbar;
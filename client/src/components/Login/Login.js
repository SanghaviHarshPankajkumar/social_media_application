
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import Input from './Input.js';
import Icon from './Icon.js'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined.js'
import useStyles from './styles'
import { useState } from 'react';
import { signIN,signUP } from '../../actions/auth.js';
// import {GoogleLogin} from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Login= ()=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const initialState = {
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''

    };
    const [isSignUp,setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState(initialState);
    console.log('inside the Login');

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(form);
        if(isSignUp){
            dispatch(signUP(form,history));
        }
        else{
            dispatch(signIN(form,history));
        }
    }
    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const handleShowPassword=()=>{
        setShowPassword(!showPassword);
    }
    const googleSuccess= async (res)=>{
             console.log(res);
             const result=  res?.profileObj;
             const token = res?.tokenId;
             try {
                dispatch({type:'AUTH', data:{result,token}});
                history.push('/');
             } catch (error) {
                console.log(error);
             }
    }
    const googleFalier = (err)=>{
        console.log(err);
        alert('Google Sign In was unsuccessful. Try again later');
    }
    const switchMode = ()=>{
        setForm(initialState);
        setIsSignUp((prev)=> !prev);
        setShowPassword(false);
    }
    return (
       <Container component='main' maxWidth='xs'>

        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
        <Typography component='h1' variant='h5'>{isSignUp?'Sign UP':'Sign IN'} </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>

            <Grid container spacing={3}>
                {
                    isSignUp && (
                        <>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half/>

                        </>
                    )
                }
                <Input name="email" label='Email Address' handleChange={handleChange} type='email'/>
                <Input name='password' lable = 'Password' handleChange={handleChange} type={showPassword? 'text': 'password'} handleShowPassword={handleShowPassword}/>
                {
                    isSignUp && (
                        <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type='password'/>
                    )
                }
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                {isSignUp? 'SignUP': 'SignIn'}
            </Button>
                        <GoogleLogin onSuccess={googleSuccess} onError={googleFalier} />
            <Grid container justifyContent='flex-end'>
                <Grid item>
                    <Button onClick={switchMode}>
                        {isSignUp ? 'Already have Account? SignIN':'New User Sign Up'}
                    </Button>
                </Grid>
            </Grid>
        </form>
        </Paper>

       </Container>
    )
}
export default Login;
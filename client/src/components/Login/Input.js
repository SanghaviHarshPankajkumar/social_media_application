import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({name,handleChange,label,half,autoFocus,type,handleShowPassword})=>{

    return(
        <Grid item xs={12} sm={half? 6:12}>
            
     <TextField 
     name={name}
     onChange={handleChange}
     type={type}
     label = {label}
     autoFocus={autoFocus}
     InputProps={name==='password'? {
         endAdornment:(
             <InputAdornment position='end'>
                <IconButton onClick={handleShowPassword}>
                    {type==='password'? <Visibility/> : <VisibilityOff/>}
                </IconButton>
            </InputAdornment>
        ),
    }:null}
    variant="outlined"
    required
    fullWidth
    />
    </Grid>
    )

}
export default Input;
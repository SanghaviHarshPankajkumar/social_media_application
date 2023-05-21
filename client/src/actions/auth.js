import * as api from '../api';

export const signIN=(form,history)=> async(dispatch)=>{

    try {
        const {data} = await api.signIN(form);
        const action = {type:'AUTH',payload:data};
    
        dispatch(action);
        history.push('/');
        
    } catch (error) {
        console.log(error);
    }
}
export const signUP= (form,history)=> async(dispatch)=>{
    try {
        console.log('inside the signUP');
        const {data} = await api.signUP(form);
        console.log(data);
        const action = {type:'AUTH', payload: data};
        dispatch(action);
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}
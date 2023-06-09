/* eslint-disable import/no-anonymous-default-export */


export default (state={authData:null},action)=>{

      switch (action.type) {
        case 'AUTH':
            console.log(action.payload);
            localStorage.setItem('profile',JSON.stringify({...action?.payload}));

            return {...state,authData:action?.data};
        case 'LOGOUT':
            localStorage.removeItem ('profile');
            return {...state,authData:null};
        default:
            return state;
      }
}
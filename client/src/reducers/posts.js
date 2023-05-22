/* eslint-disable import/no-anonymous-default-export */


export default (posts=[],action)=>{
   
    switch (action.type) {
        case 'FETCH_ALL':
            console.log('this works also...');
            return action.payload ;
        
        case 'FETCH_BY_SEARCH':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];

        case 'UPDATE_POST':
            // console.log('inside the post....');
            // console.log(posts[0]._id);
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));

        case 'DELETE_POST':
            return posts.filter((post) => post._id !== action.payload);
            
        default:
            return posts ;
    }
   

}
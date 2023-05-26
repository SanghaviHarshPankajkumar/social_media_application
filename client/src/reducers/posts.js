/* eslint-disable import/no-anonymous-default-export */


export default (state={posts:[], isLoading:true},action)=>{
   
    switch (action.type) {

        case 'START_LOADING':
            return {...state,isLoading:true};
        case 'END_LOADING':
            return {...state,isLoading: false};
        case 'FETCH_ALL':
            return {
                ...state,
                posts: action.payload.data,
                numberOfPage: action.payload.numberOfPage,
                currentPage: action.payload.currentPage
            }
        case 'FETCH_POST':
            return {
                ...state,
                post:action.payload
            }
        case 'FETCH_BY_SEARCH':
            return {...state, posts:action.payload};
        case 'CREATE':
            return {...state, posts: [...state.posts, action.payload]};

        case 'UPDATE_POST':
            // console.log('inside the post....');
            // console.log(posts[0]._id);
            return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};

        case 'DELETE_POST':
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};

        case 'CREATE_COMMENT':
            return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};
            
        default:
            return state ;
    }
   

}
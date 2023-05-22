
import { Container} from "@material-ui/core";

import Navbar from './components/Navbar/Navbar.js'
import Home from "./components/Home/Home.js";
import { BrowserRouter,Redirect,Route,Switch } from "react-router-dom";
import Login from "./components/Login/Login.js";
import PostDetails from "./components/PostDetails/PostDetails.js";

/* *******************************************
        starting :- DATE: 01/05/2023
        BREAK :- DAY 7 to DAY 20 TILL :- 20/05/2023  
        CURRENT:- DAY 22 DATE:22/05/2023
********************************************** */


function App() {
 
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    // <div className="App">
    // <h1>hello</h1>
    // </div>
   

        <BrowserRouter>
        <Container maxWidth='xl'>
         <Navbar/>
         <Switch>
       <Route exact path="/" component={()=> <Redirect to="/posts"/>}/>
       <Route exact path="/posts" component={Home}/>
        <Route exact path="/posts/search" component={Home}/>
        <Route exact path="/posts/:id" component={PostDetails}/>
        <Route path="/login" component={()=> (!user ? <Redirect to="/posts"/> : <Login/>)}/>
      </Switch>
        </Container>
        </BrowserRouter>
  );
}

export default App;

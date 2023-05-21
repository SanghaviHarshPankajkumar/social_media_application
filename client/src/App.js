
import { Container} from "@material-ui/core";

import Navbar from './components/Navbar/Navbar.js'
import Home from "./components/Home/Home.js";
import { BrowserRouter,Route,Switch } from "react-router-dom";
import Login from "./components/Login/Login.js";


/* *******************************************
        starting :- DATE: 01/05/2023
        BREAK :- DAY 7 to DAY 20 TILL :- 20/05/2023  
        CURRENT:- DAY 21 DATE:21/05/2023
********************************************** */


function App() {
 
  return (
    // <div className="App">
    // <h1>hello</h1>
    // </div>
    <Container maxidth="lg">

        <BrowserRouter>
         <Navbar/>
         <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
        </BrowserRouter>
    </Container>
  );
}

export default App;

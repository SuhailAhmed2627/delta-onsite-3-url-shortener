import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Login, SignUp, Dashboard } from "./index.js";

const App = () => {
   return (
      <Router>
         <Switch>
            <Route exact path="/">
               <Home />
            </Route>
            <Route path="/dashboard">
               <Dashboard />
            </Route>
            <Route path="/signup">
               <SignUp />
            </Route>
            <Route path="/login">
               <Login />
            </Route>
         </Switch>
      </Router>
   );
};

render(<App />, document.getElementById("root"));

import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const Routes : React.FC = () => {
    return (
        <Router>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/" exact component={Home} />
        </Router>
    )
}

export default Routes;

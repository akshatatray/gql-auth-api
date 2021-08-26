import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { useLoginStatusQuery } from "../generated/graphql";

const Routes : React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { loading, data, error } = useLoginStatusQuery({ fetchPolicy: "network-only" });

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }

    if (loading) {
        return null;
    } else if (!loading && (data && !data.loginStatus)) {
        return  (
            <Router>
                <Navbar toggleNav={toggleNav} />
                <MobileNavbar isOpen={isOpen} toggleNav={toggleNav} />
                <Switch>    
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="*" component={Login} />
                </Switch>
            </Router>
        );
    } else {
        return (
            <Router>
                <Navbar toggleNav={toggleNav} />
                <MobileNavbar isOpen={isOpen} toggleNav={toggleNav} />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/home" exact component={Home} />
                    <Route path="*" component={Home} />
                </Switch>
            </Router>
        );
    }
}

export default Routes;

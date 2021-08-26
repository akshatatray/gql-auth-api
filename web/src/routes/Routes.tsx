import React, { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Private from "./Private";
import Public from "./Public";

const Routes : React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }
    return (
        <Router>
            <Navbar toggleNav={toggleNav} />
            <MobileNavbar isOpen={isOpen} toggleNav={toggleNav} />
            <Public path="/login" exact component={Login} />
            <Public path="/register" exact component={Register} />
            <Private path="/" exact component={Home} />
        </Router>
    )
}

export default Routes;

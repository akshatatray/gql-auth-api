import React, { useState } from "react";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
import Navbar from "../../components/Navbar/Navbar";

const Home : React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <Navbar toggleNav={toggleNav}/>
            <MobileNavbar isOpen={isOpen} toggleNav={toggleNav}/>
        </div>
    )
}

export default Home;

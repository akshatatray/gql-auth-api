import React, {useState, useEffect} from 'react';
import { 
    Nav, 
    NavbarContainer, 
    NavLogo,
    LogoB,
    MobileIcn,
    NavMenu,
    NavItem,
    NavLink,
    NavBtn,
    NavBtnLink
} from './Navbar.Elements';
import { FaBars } from 'react-icons/fa';
import logoBlue from "../../assets/img/logoBlue.svg";
import logoWhite from "../../assets/img/logoWhite.svg";

interface NavbarProps {
    toggleNav: () => void;
}

const Navbar : React.FC<NavbarProps> = ({ toggleNav }) => {
    const [navscroll, setNavscroll] = useState(false);

    const handleNavscroll = () => {
        (window.scrollY >= 72) ? setNavscroll(true) : setNavscroll(false);
    }

    useEffect (() => {
        window.addEventListener('scroll', handleNavscroll);
    }, []);

    return (
        <>
            <Nav navscroll={navscroll ? 1 : 0}>
                <NavbarContainer>
                    <NavLogo navscroll={navscroll ? 1 : 0}>
                        <LogoB alt="logo" src={navscroll ? logoWhite : logoBlue} />
                    </NavLogo>
                    <MobileIcn onClick={toggleNav}>
                        <FaBars style={navscroll ? {color: "#FFFFFF"} : {color: "#4B38D3"}}/>
                    </MobileIcn>
                    <NavMenu>
                        <NavItem>
                            <NavLink navscroll={navscroll ? 1 : 0} to="/product">Product</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink navscroll={navscroll ? 1 : 0} to="/learn">Learn</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink navscroll={navscroll ? 1 : 0} to="/download">Download</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink navscroll={navscroll ? 1 : 0} to="/register">Register</NavLink>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink navscroll={navscroll ? 1 : 0} to="/login">LOG IN</NavBtnLink>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar;

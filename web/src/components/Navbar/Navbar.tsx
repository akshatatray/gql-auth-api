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
import { useLoginStatusQuery, useLogoutMutation } from '../../generated/graphql';
import { setAccessToken } from '../../accessToken';

interface NavbarProps {
    toggleNav: () => void;
}

const Navbar : React.FC<NavbarProps> = ({ toggleNav }) => {
    const [navscroll, setNavscroll] = useState(false);
    const { loading, data, error } = useLoginStatusQuery({ fetchPolicy: "network-only" });
    const [logout, {client}] = useLogoutMutation();

    const handleNavscroll = () => {
        (window.scrollY >= 54) ? setNavscroll(true) : setNavscroll(false);
    }

    useEffect (() => {
        window.addEventListener('scroll', handleNavscroll);
    }, []);

    if (error || loading) {
        return null;
    }

    if (!data?.loginStatus) {
        return (
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
        )
    }

    return (
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
                            <NavLink navscroll={navscroll ? 1 : 0} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink navscroll={navscroll ? 1 : 0} to="/explore">Explore</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink navscroll={navscroll ? 1 : 0} to="/message">Message</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink navscroll={navscroll ? 1 : 0} to="/profile">Profile</NavLink>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink 
                            navscroll={navscroll ? 1 : 0} 
                            to="/" 
                            onClick={async () => {
                                await logout();
                                setAccessToken("");
                                await client!.resetStore();
                            }}
                        >
                            LOG OUT
                        </NavBtnLink>
                    </NavBtn>
            </NavbarContainer>
        </Nav>
    )
}

export default Navbar;

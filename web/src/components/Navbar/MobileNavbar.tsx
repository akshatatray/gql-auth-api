import React from "react";
import {
    MobileNavbarContainer,
    CloseIcon,
    Icon,
    MobileNavbarWrapper,
    MobileNavbarMenu,
    MobileNavbarLink,
    MobileBtnWrapper,
    MobileNavRouter
} from "./MobileNavbar.Elements";

interface MobileNavbarProps {
    isOpen: boolean;
    toggleNav: () => void;
}

const MobileNavbar : React.FC<MobileNavbarProps> = ({ isOpen, toggleNav }) => {
    return (
        <MobileNavbarContainer isOpen={isOpen} onClick={toggleNav}>
            <Icon onClick={toggleNav}>
                <CloseIcon />
            </Icon>
            <MobileNavbarWrapper>
                <MobileNavbarMenu>
                    <MobileNavbarLink to="about" onClick={toggleNav}>
                        About
                    </MobileNavbarLink>
                    <MobileNavbarLink to="discover" onClick={toggleNav}>
                        Discover
                    </MobileNavbarLink>
                    <MobileNavbarLink to="contact" onClick={toggleNav}>
                        Contact
                    </MobileNavbarLink>
                    <MobileNavbarLink to="register" onClick={toggleNav}>
                        Register
                    </MobileNavbarLink>
                </MobileNavbarMenu>
                <MobileBtnWrapper>
                    <MobileNavRouter to="/login">Login</MobileNavRouter>
                </MobileBtnWrapper>
            </MobileNavbarWrapper>
        </MobileNavbarContainer>
    );
}

export default MobileNavbar;

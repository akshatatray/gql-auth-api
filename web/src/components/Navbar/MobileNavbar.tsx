import React from "react";
import { setAccessToken } from "../../accessToken";
import { useLoginStatusQuery, useLogoutMutation } from "../../generated/graphql";
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
    const { loading, data, error } = useLoginStatusQuery({ fetchPolicy: "network-only" });
    const [logout, {client}] = useLogoutMutation();

    if (error || loading) {
        return null;
    }

    if (!data?.loginStatus) {
        return (
            <MobileNavbarContainer isOpen={isOpen} onClick={toggleNav}>
                <Icon onClick={toggleNav}>
                    <CloseIcon />
                </Icon>
                <MobileNavbarWrapper>
                    <MobileNavbarMenu>
                        <MobileNavbarLink to="/product" onClick={toggleNav}>
                            Product
                        </MobileNavbarLink>
                        <MobileNavbarLink to="/learn" onClick={toggleNav}>
                            Learn
                        </MobileNavbarLink>
                        <MobileNavbarLink to="/Message" onClick={toggleNav}>
                            Download
                        </MobileNavbarLink>
                        <MobileNavbarLink to="register" onClick={toggleNav}>
                            Register
                        </MobileNavbarLink>
                    </MobileNavbarMenu>
                    <MobileBtnWrapper>
                        <MobileNavRouter to="/login">LOG IN</MobileNavRouter>
                    </MobileBtnWrapper>
                </MobileNavbarWrapper>
            </MobileNavbarContainer>
        );
    }
    return (
        <MobileNavbarContainer isOpen={isOpen} onClick={toggleNav}>
            <Icon onClick={toggleNav}>
                <CloseIcon />
            </Icon>
            <MobileNavbarWrapper>
                <MobileNavbarMenu>
                    <MobileNavbarLink to="/" onClick={toggleNav}>
                        Home
                    </MobileNavbarLink>
                    <MobileNavbarLink to="/explore" onClick={toggleNav}>
                        Explore
                    </MobileNavbarLink>
                    <MobileNavbarLink to="/message" onClick={toggleNav}>
                        Message
                    </MobileNavbarLink>
                    <MobileNavbarLink to="/profile" onClick={toggleNav}>
                        Profile
                    </MobileNavbarLink>
                </MobileNavbarMenu>
                <MobileBtnWrapper>
                    <MobileNavRouter 
                        to="/"
                        onClick={async () => {
                            try {
                                await logout();
                                setAccessToken("");
                                await client!.resetStore();
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >
                        LOG OUT
                    </MobileNavRouter>
                </MobileBtnWrapper>
            </MobileNavbarWrapper>
        </MobileNavbarContainer>
    );
}

export default MobileNavbar;

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav<{ navscroll: number }>`
    background-color: ${({ navscroll }) => (navscroll ? "#4B38D3" : "transparent")};
    height: 4.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    box-shadow: ${({ navscroll }) => (navscroll ? "0 5px 20px -5px rgb(0 0 0 / 10%)" : "none")};
    z-index: 10;
    transition:  .4s all ease;

    @media screen and (max-width: 960px) {
        transition:  0.1s all ease;
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 4.5rem;
    z-index: 1;
    width: 100%;
    padding: 0 1.5rem;
    max-width: 1200px;
`;

export const NavLogo = styled.a<{ navscroll: number }>`
    color: ${({ navscroll }) => (navscroll ? "#FFFFFF" : "#4B38D3")};
    justify-content: flex-start;
    cursor: pointer;
    width: 130px;
    display: flex;
    align-items: center;
    font-weight: bold;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    transition:  0.1s all ease;
`;

export const LogoB = styled.img`
    height: 100%;
    width: 100%;
`;

export const MobileIcn = styled.div`
    display: none;

    @media screen and (max-width: 768px) {
        display: block;
        color: #FFFFFF;
        padding: 1.5rem;
        font-size: 1.5rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -1.4rem;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavItem = styled.li`
    height: 4.5rem;
`;

export const NavLink = styled(Link)<{ navscroll: number }>`
    color: ${({ navscroll }) => (navscroll ? "#FFFFFF" : "#4B38D3")};
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 2rem;
    height: 100%;
    cursor: pointer;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    font-weight: ${({ navscroll }) => (navscroll ? "400" : "500")};
    transition:  0.1s all ease;

    &.active {
        border-bottom: 0.125rem solid #FFFFFF;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtnLink = styled(Link)<{ navscroll: number }>`
    border-radius: 0.25rem;
    white-space: nowrap;
    padding: 0.45rem 1.25rem;
    color: ${({ navscroll }) => (navscroll ? "#FFFFFF" : "#4B38D3")};
    font-size: .9rem;
    font-weight: bold;
    outline: none;
    border: ${({ navscroll }) => (navscroll ? "0.125rem solid #FFFFFF" : "0.125rem solid #4B38D3")};
    cursor: pointer;
    transition:  0.1s all ease;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;

    &:hover {
        color: ${({ navscroll }) => (navscroll ? "#4B38D3" : "#FFFFFF")};
        background-color: ${({ navscroll }) => (navscroll ? "#FFFFFF" : "#4B38D3")};
    }
`;
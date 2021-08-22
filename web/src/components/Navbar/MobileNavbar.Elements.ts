import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const MobileNavbarContainer = styled.aside<{ isOpen: boolean }>`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: #4B38D3;
    display: grid;
    align-items: center;
    top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    left: 0;
    transition: .3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
`;

export const CloseIcon = styled(FaTimes)`
    color: #FFFFFF;
`;

export const Icon = styled.div`
    position: absolute;
    top: 1.5rem;
    right: 3rem;
    font-size: 1.5rem;
    cursor: pointer;
`;

export const MobileNavbarWrapper = styled.div`
    color: #FFFFFF;
`;

export const MobileNavbarMenu = styled.ul`
    padding: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 4.5rem);
    text-align: center;

    @media screen and (max-width: 480px) {
        grid-template-rows: repeat(4, 4.5rem);
    }
`;

export const MobileNavbarLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    font-family: 'Poppins', sans-serif;
    text-decoration: none;
    list-style: none;
    color: #FFFFFF;
    cursor: pointer;
`;

export const MobileBtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5rem;
`;

export const MobileNavRouter = styled(Link)`
    border-radius: 0.35rem;
    background-color: #FFFFFF;
    white-space: nowrap;
    padding: 0.75rem 1.5rem;
    color: #4B38D3;
    font-size: .9rem;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
    outline: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
`;

import styled from "styled-components";
import { Link } from "react-router-dom";

export const RegisterContainer = styled.div`
    width: 100%;
    height: calc(100vh - 72px);
    display: flex;
`;

export const DesignContainer = styled.div`
    flex: 1;
    height: 100%;
    width: 100%;
    background-color: #4B38D3;

    @media screen and (max-width: 48rem) {
        display: none;
    }
`;

export const FormContainer = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const FormWrapper = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 48rem) {
        width: 85%;
    }
`;

export const FormHead = styled.p`
    font-size: 2rem;
    font-family: 'Montserrat', sans-serif;
    width: calc(100% - 3rem);
    margin: 0 0 .25rem 0;
    color: #353535;
`;

export const FormSubHead = styled.p`
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    color: grey;
    width: calc(100% - 3rem);
    margin: 0 0 1.5rem 0;
`;

export const RegisterForm = styled.form`
    width: calc(100% - 3rem);
    height: calc(100% - 3rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const FormLabel = styled.label`
    font-size: .9rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    color: #4B38D3;
    margin: 0 0 .35rem 0;
`;

export const FormInput = styled.input`
    width: calc(100% - 1.5rem - 4px);
    height: calc(1.75rem - 4px);
    border-radius: 0.35rem;
    border: 2px solid #E1DFEC;
    margin: 0 0 1.15rem 0;
    padding: .5rem .75rem;
    font-family: 'Poppins', sans-serif;
`;

export const RegisterBtn = styled.button`
    width: 100%;
    height: 2.75rem;
    border-radius: 0.35rem;
    border: none;
    background-color: #4B38D3;
    cursor: pointer;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 1.5rem 0;
    padding: .5rem .75rem;
    font-family: 'Poppins', sans-serif;
`;

export const FormRegister = styled(Link)`
    font-size: .9rem;
    font-family: 'Poppins', sans-serif;
    text-decoration: none;
    color: black;
    font-weight: 500;
    cursor: pointer;
    width: calc(100% - 3rem);
    margin: 0 0 1.5rem 0;
`;

import React, { useState } from "react";
import { useRegisterMutation } from "../../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import {
    RegisterContainer,
    FormContainer,
    DesignContainer,
    FormWrapper,
    FormHead,
    RegisterForm,
    RegisterBtn,
    FormSubHead,
    FormInput,
    FormLabel,
    FormRegister,
} from "./Register.Elements";

const Register : React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register] = useRegisterMutation();

    return (
        <RegisterContainer>
            <FormContainer>
                <FormWrapper>
                    <FormHead>
                        Register
                    </FormHead>
                    <FormSubHead>
                        Start new friendships!
                    </FormSubHead>
                    <RegisterForm
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const res = await register({
                                variables: {
                                    registerEmail: email,
                                    registerPassword: password
                                }
                            });
                            console.log(res);
                            history.push("/login");
                        }}
                    >
                    <FormLabel>
                        Email
                    </FormLabel>
                    <FormInput 
                        type="email" 
                        value={email}
                        placeholder="deepika@biffled.com"
                        onChange={
                            (e) => setEmail(e.target.value)
                        }
                    />
                    <FormLabel>
                        Password
                    </FormLabel>
                    <FormInput 
                        type="password" 
                        value={password}
                        placeholder="Min. 6 characters"
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                    />
                        <RegisterBtn 
                            type="submit"
                        >
                            REGISTER
                        </RegisterBtn>
                    </RegisterForm>
                    <FormRegister to="/login">
                        Already registered? <span style={{color: "#4B38D3"}}>Login now!</span>
                    </FormRegister>
                </FormWrapper>
            </FormContainer>
            <DesignContainer/>
        </RegisterContainer>
    )
}

export default Register;

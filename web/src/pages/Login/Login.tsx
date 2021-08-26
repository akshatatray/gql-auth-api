import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../../accessToken";
import { LoginStatusDocument, LoginStatusQuery, useLoginMutation } from "../../generated/graphql";
import {
    LoginContainer,
    FormContainer,
    DesignContainer,
    FormWrapper,
    FormHead,
    LoginForm,
    LoginBtn,
    FormSubHead,
    FormInput,
    FormForgot,
    FormLabel,
    FormRegister
} from "./Login.Elements";

const Login : React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation();

    return (
        <LoginContainer>
            <DesignContainer></DesignContainer>
            <FormContainer>
                <FormWrapper>
                    <FormHead>
                        Login
                    </FormHead>
                    <FormSubHead>
                        Make new friends everyday!
                    </FormSubHead>
                    <LoginForm
                        onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                                const res = await login({
                                    variables: {
                                        registerEmail: email,
                                        registerPassword: password,
                                    },
                                    update: (store, {data}) => {
                                        if (!data) {
                                            return null;
                                        }
                                        store.writeQuery<LoginStatusQuery>({
                                            query: LoginStatusDocument,
                                            data: { loginStatus: data.login.user },
                                        })
                                    }
                                });
                                const { data: { login: { accessToken }}} = res as any;
                                if (accessToken) {
                                    setAccessToken(accessToken);
                                }
                                window.location.replace("/");
                            } catch (error) {
                                console.log(error);
                            }
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
                        <LoginBtn 
                            type="submit"
                        >
                            LOGIN
                        </LoginBtn>
                    </LoginForm>
                    <FormForgot>
                        Forgot Password?
                    </FormForgot>
                    <FormRegister href="/register">
                        Not registered yet? <span style={{color: "#4B38D3"}}>Create an Account</span>
                    </FormRegister>
                </FormWrapper>
            </FormContainer>
        </LoginContainer>
    )
}

export default Login;

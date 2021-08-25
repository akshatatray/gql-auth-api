import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../../accessToken";
import { useLoginMutation } from "../../generated/graphql";

const Login : React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation();

    return (
        <div>
            Login!
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const res = await login({
                        variables: {
                            registerEmail: email,
                            registerPassword: password,
                        }
                    });
                    const { data: { login: { accessToken }}} = res as any;
                    if (accessToken) {
                        setAccessToken(accessToken);
                    }
                }}
            >
                <input 
                    type="email" 
                    className="emailInput" 
                    value={email}
                    onChange={
                        (e) => setEmail(e.target.value)
                    }
                />
                <input 
                    type="password" 
                    className="emailInput" 
                    value={password}
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                />
                <button 
                    className="LoginBtn"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;

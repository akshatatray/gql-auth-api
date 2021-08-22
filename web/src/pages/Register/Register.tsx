import React, { useState } from "react";
import { useRegisterMutation } from "../../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

const Register : React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register] = useRegisterMutation();

    return (
        <div>
            Register!
            <form
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
                    className="registerBtn"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register;

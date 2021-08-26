import React from "react";
import { useUsersQuery } from "../../generated/graphql";

const Home : React.FC = () => {
    const {loading, error, data} = useUsersQuery({ fetchPolicy: "network-only" });

    if (loading) {
        return (
            <div>
                <div>Loading...</div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div>
                <div>{JSON.stringify(error)}</div>
            </div>
        );
    }

    return (
        <div>
            <div style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <ul>
                    {
                        data.users.map((user) => {
                            return (
                                <li key={user.id}>
                                    {user.id}: {user.email}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Home;

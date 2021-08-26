import React, { Component } from "react";
import { Redirect, Route } from "react-router";
import { useLoginStatusQuery } from "../generated/graphql";

interface PrivateProps {
    component: React.FC<any>,
    path: string,
    exact?: boolean,
}

const Private : React.FC<PrivateProps> = ({ ...rest }) => {
    const { loading, data, error } = useLoginStatusQuery({ fetchPolicy: "network-only" });
    if (loading) {
        return null;
    }
    if ((data && !data.loginStatus)) {
        return (
            <Route
                { ...rest }
            />
        );
    }
    return (
        <Redirect to="/" />
    )
}

export default Private;

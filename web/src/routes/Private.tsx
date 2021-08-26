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
    if (loading || (data && !data.loginStatus) || error) {
        return (
            <Redirect to="/login" />
        );
    }
    return (
        <Route
            { ...rest }
        />
    )
}

export default Private;

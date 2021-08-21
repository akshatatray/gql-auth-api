import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./userResolvers";
import { createConnection } from "typeorm";

(async () => {
    const app = express();
    app.get("/", (_req, res) => res.send("Hello World!"));

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        })
    });

    await apolloServer.start()

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("App is running on port 4000");
    });
})();

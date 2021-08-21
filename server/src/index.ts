import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./userResolvers";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./Auth";
import { sendRefreshToken } from "./middleware/sendRefreshToken";

(async () => {
    const app = express();
    app.use(cookieParser());
    app.get("/", (_req, res) => res.send("Hello World!"));

    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }
        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (error) {
            console.log(error);
            return res.send({ ok: false, accessToken: "" });
        }

        const user = await User.findOne({ id: payload.userId });
        if (!user || user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }

        sendRefreshToken(res, createRefreshToken(user));
        
        return res.send({ ok: false, accessToken: createAccessToken(user) });
    });

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({req, res}) => ({ req, res })
    });

    await apolloServer.start()

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("App is running on port 4000");
    });
})();

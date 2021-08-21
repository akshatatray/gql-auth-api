import { verify } from "jsonwebtoken";
import { MyContext } from "src/MyContext";
import { MiddlewareFn } from "type-graphql";

export const isAuth : MiddlewareFn<MyContext> = ({context}, next) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
        throw new Error("Not Authorized!");
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload as any;
    } catch (error) {
        console.log(error);
        throw new Error("Not Authorized!");
    }
    return next();
}
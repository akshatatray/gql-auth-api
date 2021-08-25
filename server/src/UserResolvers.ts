import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware, Int } from "type-graphql";
import { User } from "./entity/User";
import { compare, hash } from "bcryptjs";
import { MyContext } from "./MyContext";
import { createAccessToken, createRefreshToken } from "./Auth";
import { isAuth } from "./middleware/isAuth";
import { sendRefreshToken } from "./middleware/sendRefreshToken";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User;
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return "Hello!";
    }
    
    @Query(() => [User])
    @UseMiddleware(isAuth)
    users(@Ctx() { payload } : MyContext) {
        console.log(payload)
        return User.find();
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokens(
        @Arg("userId", () => Int) userId: number
    ) {
        await getConnection()
            .getRepository(User)
            .increment({id: userId}, "tokenVersion", 1);
        return true;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res } : MyContext
    ) : Promise<LoginResponse> {
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw new Error("Invalid Email Address or Password");
        }
        
        const valid = await compare(password, user.password);
        if (!valid) {
            throw new Error("Invalid Email Address or Password");
        }

        sendRefreshToken(res, createRefreshToken(user));

        return {
            accessToken: createAccessToken(user),
            user
        };
    }

    @Mutation(() => Boolean)
    async logout(
        @Ctx() { res } : MyContext
    ) {
        sendRefreshToken(res, "");
        return true;
    }

    @Query(() => User, { nullable: true })
    loginStatus(@Ctx() context: MyContext) {
      const authorization = context.req.headers["authorization"];
  
      if (!authorization) {
        return null;
      }
  
      try {
        const token = authorization.split(" ")[1];
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        return User.findOne(payload.userId);
      } catch (err) {
        console.log(err);
        return null;
      }
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("email") email: string,
        @Arg("password") password: string,
    ) {
        const hashedPass = await hash(password, 12);
        try {
            const isAvailable = await User.findOne({
                where: {email}
            });
            if (!isAvailable) {
                await User.insert({
                    email,
                    password: hashedPass,
                });
            } else {
                throw new Error("Email already exists!");
            }
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }
}

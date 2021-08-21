import { Resolver, Query, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { User } from "./entity/User";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return "Hello!";
    }
    
    @Query(() => [User])
    users() {
        return User.find();
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
    ) : Promise<LoginResponse> {
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw new Error("Invalid Email Address or Password");
        }
        
        const valid = await compare(password, user.password);
        if (!valid) {
            throw new Error("Invalid Email Address or Password");
        }

        return {
            accessToken: sign({ userId: user.id }, "pegqlrn1024", { expiresIn: "15m" })
        };
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

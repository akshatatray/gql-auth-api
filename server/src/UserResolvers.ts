import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "./entity/User";
import { hash } from "bcryptjs";

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

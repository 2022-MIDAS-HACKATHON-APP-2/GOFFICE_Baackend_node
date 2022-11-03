import jwt from "jsonwebtoken";
import { UserEntity } from "../entities/User";

export const access = async( user: UserEntity) => {
    const secretKey = (process.env.JWT_SECRET_KEY) ? process.env.JWT_SECRET_KEY : ""
    const token: string = await jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        secretKey,
        {
            expiresIn: "168h",
        }
    );
    return token;
}
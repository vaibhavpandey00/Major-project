"use server";

import { z } from "zod";
import { signinSchema, signupSchema } from "./zodSchema";
import { redirect } from "next/navigation";
import { connectDB } from "./db/db";
import { User } from "./db/models/User";
import { generateSalt, hashPassword } from "./passwordHash";
import { signJWT } from "./jwt";

export const signUp = async (formData: z.infer<typeof signupSchema>) => {
    try {
        await connectDB();

        const userExists = await User.findOne({ email: formData.email });
        if (userExists) {
            return { success: false, error: "User already exists" };
        }

        const salt = generateSalt();
        const hasedPassword = await hashPassword(formData.password, salt);

        const user = await User.create({ ...formData, password: hasedPassword, salt });

        // console.log("User created", user);
        return { success: true, message: "User created successfully" };
    } catch (error) {
        return { success: false, error: "Something went wrong" };
    }

}

export const signIn = async (formData: z.infer<typeof signinSchema>) => {
    try {
        await connectDB();

        const user = await User.findOne({ email: formData.email }, { _id: 1, salt: 1 });

        const userid = user?._id.toString();

        const createToken = signJWT({ userid, salt: user?.salt });
        // console.log("Token created", createToken);


        if (!user) {
            return { success: false, error: "User not found" };
        }
        return { success: true, message: "User logged in successfully" };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export const signOut = async () => {
    return redirect("/");
}
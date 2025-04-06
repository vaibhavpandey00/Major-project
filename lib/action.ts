"use server";

import { z } from "zod";
import { signinSchema, signupSchema } from "./zodSchema";
import { redirect } from "next/navigation";
import { connectDB } from "./db/db";
import { User } from "./db/models/User";
import { generateSalt, hashPassword, verifyPassword } from "./passwordHash";
import { signJWT, verifyJWT } from "./jwt";
import { cookies } from 'next/headers'

export const signUp = async (formData: z.infer<typeof signupSchema>) => {
    try {
        const validation = signupSchema.safeParse(formData);
        if (!validation.success) {
            // Flattern the error message
            const errorMessages = validation.error.errors.map((error) => {
                return {
                    message: error.message,
                    path: error.path[ 0 ],
                }
            });
            return { success: false, error: errorMessages };
        }

        await connectDB();

        const userExists = await User.findOne({ email: formData.email });
        if (userExists) {
            return { success: false, error: "User already exists" };
        }

        const salt = generateSalt();
        const hasedPassword = await hashPassword(formData.password, salt);

        await User.create({ ...formData, password: hasedPassword, salt });

        return { success: true, message: "User created successfully" };
    } catch (error) {
        return { success: false, error: "Something went wrong" };
    }

}

export const signIn = async (formData: z.infer<typeof signinSchema>) => {
    try {
        await connectDB();

        const user = await User.findOne({ email: formData.email });

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const userid = user._id.toString();
        const verifyPass = await verifyPassword(formData.password, user.salt, user.password);

        if (!verifyPass) {
            return { success: false, error: "Invalid email or password" };
        }

        // Generate the token with more user information
        const token = await signJWT({
            userid,
            email: user.email,
            name: user.name
        });

        // Make sure the token is a string
        if (typeof token !== 'string') {
            throw new Error("Generated token is not a string");
        }

        // Set the cookie with the token
        (await cookies()).set("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        return { success: true, message: "User logged in successfully" };
    } catch (error) {
        console.error("Sign in error:", error);
        return { success: false, error: error.message || "Something went wrong" };
    }
};

export const getAuthCookie = async () => {
    return (await cookies()).get("token")?.value;
}

export const deleteAuthCookie = async () => {
    return (await cookies()).delete("token");
}

export const logOut = async () => {
    try {
        await deleteAuthCookie()
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to log out" }
    }
}
"use server";
import { Session } from "@/lib/zodSchema"
import { z } from "zod";
import crypto from "crypto";

export type Cookies = {
    set: (
        key: string,
        value: string,
        options: {
            expires: Number,
            sameSite: "lax" | "strict",
            secure?: boolean,
            httpOnly?: boolean
        }
    ) => void
    get: (key: string) => { name: string, value: string } | undefined
    delete: (key: string) => void
}

// TODO: Create a session using cookies
export const createSession = async (user: z.infer<typeof Session>, cookies: Cookies) => {
    const sessionId = crypto.randomBytes(512).toString("hex").normalize();
}
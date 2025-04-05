import { use } from "react";
import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(3).max(50),
    username: z.string(),
    email: z.string().includes("@").includes(".com"),
    password: z.string().min(6).includes("A-Z").includes("a-z").includes("0-9").includes("@"),
})

export const signinSchema = z.object({
    email: z.string().includes("@").includes(".com"),
    password: z.string().min(6).includes("A-Z").includes("a-z").includes("0-9").includes("@")
})

export const Session = z.object({
    _id: z.string(),
    username: z.string(),
})
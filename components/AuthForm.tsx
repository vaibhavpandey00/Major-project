"use client";
import React, { useState } from 'react'
import Form from 'next/form'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signUp, signIn } from '@/lib/action';
import { toast } from 'sonner';

const AuthForm = ({ type }: { type: string }) => {

    const [ formData, setFormData ] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })

    // const user = {
    //     id: 1,
    //     name: "John Doe",
    //     username: "johndoe",
    //     email: "4xv8a@example.com",
    //     password: "password"
    // }

    // if (user && user.name && user.id) {
    //     console.log("User logged in");

    //     return redirect("/dashboard");
    // };

    const handleChange = (e: any) => {
        setFormData({ ...formData, [ e.target.name ]: e.target.value });
    }

    const handleSubmit = async () => {

        if (type === "signin") {
            const res = await signIn(formData);
            if (res?.success) {
                toast.success(res.message);
                return redirect("/dashboard");
            }
            else {
                toast.error(res.error);
            }
        }
        else {
            const res = await signUp(formData);
            if (res?.success) {
                toast.success(res.message);
                setTimeout(() => {
                    return redirect("/sign-in");
                }, 1000);
            }
            else {
                toast.error(res.error);
            }
        }
    }

    return <>
        <Form action={handleSubmit} className="flex flex-col justify-center w-1/4 p-4 gap-6 rounded-2xl border" >
            <h2 className="text-3xl border-b">{type === "signin" ? "Sign In" : "Sign Up"}</h2>
            {type === "signup" &&
                <input type="text" name="name" onChange={handleChange} placeholder="Name" className="outline-none text-xl" />}
            {type === "signup" &&
                <input type="text" name="username" onChange={handleChange} placeholder="Username" className="outline-none text-xl" />}
            <input type="text" name="email" onChange={handleChange} placeholder="Email" className="outline-none text-xl" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" className="outline-none text-xl" />
            <button type="submit" className="py-4 rounded-xl border lg:cursor-pointer">
                {type === "signin" ? "Sign In" : "Sign Up"}
            </button>
            <p className="text-sm">
                {type === "signin" ? "Don't have an account?" : "Already have an account?"} <Link href={type === "signin" ? "/sign-up" : "/sign-in"} className="underline">
                    {type === "signin" ? "Sign Up" : "Sign In"}
                </Link>
            </p>
        </Form>
    </>
}

export default AuthForm
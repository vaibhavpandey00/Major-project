import AuthForm from '@/components/AuthForm'
import React from 'react'

const page = () => {
    return <>
        <div className="flex items-center justify-center h-screen w-full">
            <AuthForm type={"signin"} />
        </div>
    </>
}

export default page
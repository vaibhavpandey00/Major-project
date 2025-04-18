import HomeNav from '@/components/HomeNav'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return <>
        <HomeNav />
        {children}
    </>
}

export default layout
import Link from "next/link";
import React from "react";
import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";

type Props ={}

const Navbar =(props: Props)=> {
    return (
        <div className='px-8 py-2 border-b-[1px]'>
            <div className='flex items-center space-x-3'>
                <Link href='/'>
                    <Image src='/1.svg' width={40}
                    height={40} alt='TechTalks Logo'/>
                </Link>
                <UserButton signInUrl='/' />
            </div>
        </div>     
    )
}

export default Navbar
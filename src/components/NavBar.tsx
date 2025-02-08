'use client'
import React from 'react';
import { signOut, useSession, } from "next-auth/react";
import Link from 'next/link';
const NavBar = () => {
    const { data: session } = useSession()
    const nav = <>
        <li><Link href='/'>Home</Link></li>
        <li><Link href={'/reels'}>Reels</Link></li>
        {!session?.user.email && <>
            <li><Link href='/login'>Login</Link></li>
            <li><Link href='/register'>Register</Link></li></>}
    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {nav}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Reelser</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {nav}
                    </ul>
                </div>
                <div className="navbar-end">
                  {session?.user.email&& <a onClick={()=>signOut()} className="btn btn-error text-white">Logout</a>}
                </div>
            </div>
        </div>
    );
};

export default NavBar;

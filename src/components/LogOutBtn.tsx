'use client'
import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
const LogOutBtn = () => {
    return (
        <div>
         <button onClick={()=>signOut()}>logout</button>
        </div>
    );
};

export default LogOutBtn;
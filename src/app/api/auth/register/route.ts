import {NextRequest,NextResponse} from 'next/server';

import {DBConnection} from '@/lib/db';
import User from '@/model/user';

export async function POST (request:NextRequest){
    try {
       const {email,password}=await request.json();
       if (!email || !password) {
        return NextResponse.json(
           { error:"required email and password"},
           {status:400}
           
        )
       }

       await DBConnection()
       const  existUser= await User.findOne({email})
       if (existUser) {
        return NextResponse.json(
            { error:"User Already Exist"},
            {status:400}
            
         )
       }

       await User.create({
        email,
        password
       })

       return NextResponse.json(
       
        { message:"user registered successfully"},
        {status:201}
     )
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json(
            { error: errorMessage },
            {status:500}
            
         )  
    }
}
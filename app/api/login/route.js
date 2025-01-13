import connectToMongo from "@db/connectToMongo";
import User from "@models/user.model";
import { NextResponse } from "@node_modules/next/server";
import bcrypt from 'bcrypt';
import { serialize } from "cookie";
import jwt from 'jsonwebtoken';
import process from 'process'

export async function POST(request) {
    try {
        const {email, password} = await request.json();
        await connectToMongo();
        const userExists = await User.findOne({email});
        
        if(!userExists){
            return NextResponse.json({error: "Seems like you have not Signed up!"}, {status: 400});
        }
        
        const isPasswordVerified = await bcrypt.compare(password, userExists.password);
        
        if(!isPasswordVerified){
            return NextResponse.json({error: "Invalid credentials"}, {status: 400});
        }

        const token = jwt.sign({id: userExists._id, email: userExists.email, username: userExists.username}, process.env.JWT_SECRET_KEY ,{
            expiresIn: "1d",
        })
        
    
        const response = NextResponse.json({message: "Login successfull", success: true}, {status: 200});

        // response.cookies.set("jwt", token, {
        //     httpOnly: true,
        // })

        response.headers.set('Set-Cookie', serialize('jwt', token, {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, 
            path: '/',       
            sameSite: 'Lax', //for csrf attacks 
        }));

        return response;
    } catch (error) {
        return NextResponse.json({message: "An error occured while registering the user"}, {status: 500})
    }
}
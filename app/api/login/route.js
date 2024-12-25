import connectToMongo from "@db/connectToMongo";
import User from "@models/user.model";
import { NextResponse } from "@node_modules/next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request, _) {
    try {
        const {email, password} = await request.json();
        await connectToMongo();
        const userExists = await User.findOne({email});
        
        if(!userExists){
            return NextResponse.json({error: "Invalid credentials"}, {status: 400});
        }
        
        const isPasswordVerified = await bcrypt.compare(password, userExists.password);
        
        if(!isPasswordVerified){
            return NextResponse.json({error: "Invalid password"}, {status: 400});
        }

        const token = jwt.sign({id: userExists._id, email: userExists.email, username: userExists.username}, process.env.JWT_SECRET_KEY ,{
            expiresIn: "1d",
        })

        const response = NextResponse.json({message: "Login successfull", success: true}, {status: 200});

        response.cookies.set("jwt", token, {
            httpOnly: true,
        })

        return response;
    } catch (error) {
        return NextResponse.json({message: "An error occured while registering the user"}, {status: 500})
    }
}
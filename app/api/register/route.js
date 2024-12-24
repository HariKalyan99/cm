import connectToMongo from "@db/connectToMongo";
import User from "@models/user.model";
import { NextResponse } from "@node_modules/next/server";
import bcrypt from 'bcrypt';

export async function POST(request, _) {
    try {
        const {username, email, password} = await request.json();
        const hashedPassword = await bcrypt.hashSync(password, 10)
        await connectToMongo();
        await User.create({username, email, password: hashedPassword});
        return NextResponse.json({message: "User registered"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "An error occured while registering the user"}, {status: 500})
    }
}
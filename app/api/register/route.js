import connectToMongo from "@db/connectToMongo";
import User from "@models/user.model";
import { NextResponse } from "@node_modules/next/server";
import bcrypt from 'bcrypt';

export async function POST(request, _) {
    try {
        const {username, email, password} = await request.json();
        const hashedPassword = await bcrypt.hashSync(password, 10);
        await connectToMongo();
        const userExists = await User.findOne({email});
        if(userExists){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }
        const newUser = new User({username, email, password: hashedPassword});
        const user = await newUser.save();
        return NextResponse.json({message: "User registered",success:true, user}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "An error occured while registering the user"}, {status: 500})
    }
}
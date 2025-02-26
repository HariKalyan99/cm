import User from '@models/user.model';
import { NextResponse } from '@node_modules/next/server';
import jwt from 'jsonwebtoken';
import process from 'process'

export async function GET(request) {
    try {
        const token = request.cookies.get("jwt")?.value || "";
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({_id: decodedToken.id}).select("-password");
        return NextResponse.json({message: "User details found", success: true, data: userData}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
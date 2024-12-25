import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import Blog from "@models/blog.model";
import connectToMongo from "@db/connectToMongo";

export async function GET(request) {
    try {
        const authorize = request.headers.get('Authorization');
    if (!authorize || !authorize.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization token missing or invalid' },
        { status: 401 }
      );
    }
    await connectToMongo();
    if(authorize){
        const token = authorize.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const blogs = await Blog.find({userId: decodedToken.id});
        return NextResponse.json({message: 'blog fetched', blogs}, {status: 200});
    }
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'error fetching user blogs'}, {status: 500});
    }
}



export async function POST(request) {
    try {
        const {title, content} = await request.json();
        const authorize = request.headers.get('Authorization');
    if (!authorize || !authorize.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization token missing or invalid' },
        { status: 401 }
      );
    }
    await connectToMongo();
    if(authorize){
        const token = authorize.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const newBlog = await Blog({
            title, content, userId: decodedToken.id, author: decodedToken.username
        })

        if(!newBlog){
            return NextResponse.json({message: "Error adding the blog"}, {status: 400});
        }

        const blog = await newBlog.save();
        return NextResponse.json({message: 'blog added successfully', blog}, {status: 201});
    }
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'error creating blog'}, {status: 500});
    }
}
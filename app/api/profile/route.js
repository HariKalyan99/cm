import connectToMongo from "@db/connectToMongo";
import Blog from "@models/blog.model";
import { NextResponse } from "@node_modules/next/server";
import jwt from 'jsonwebtoken';


export async function GET(request) {
  try {
    const authorize = request.headers.get("Authorization");
    if (!authorize || !authorize.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authorization token is invalid" },
        { status: 401 }
      );
    }
    await connectToMongo();
    if (authorize) {
      const token = authorize.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const blogs = await Blog.find({ author: decodedToken.username });
      return NextResponse.json(
        { message: "blog fetched", blogs, success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error fetching user blogs" },
      { status: 500 }
    );
  }
}

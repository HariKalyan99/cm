import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToMongo from "@db/connectToMongo";
import Blog from "@models/blog.model";



export async function GET(request, { params }) {
  const { id } = await params;
  if (id) {
    console.log(id);
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
        if (decodedToken) {
          const blogs = await Blog.find({ _id: id });
          return NextResponse.json(
            { message: "blog details fetched", blogs, success: true },
            { status: 200 }
          );
        }
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "error fetching user blogs" },
        { status: 500 }
      );
    }
  } else {
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
        const blogs = await Blog.find({ userId: decodedToken.id });
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
}

export async function DELETE(request, { params }) {
  const { id } = await params;
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

      const blog = await Blog.findById(id);

      if (!blog) {
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );
      }

      if (blog.userId.toString() !== decodedToken.id) {
        return NextResponse.json(
          { message: "Unauthorized to delete this blog" },
          { status: 403 }
        );
      }

      await blog.deleteOne();
      return NextResponse.json(
        { message: "Blog deleted successfully", status: true },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting blog", status: false },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { title, content } = await request.json();
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

      const existingBlog = await Blog.findById(id);
      if (!existingBlog) {
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 }
        );
      }
      console.log(existingBlog.userId.toString() , decodedToken.id, existingBlog)

      if (existingBlog.userId.toString() !== decodedToken.id) {
        return NextResponse.json(
          { message: "You are not authorized to update this blog" },
          { status: 403 }
        );
      }

      existingBlog.title = title || existingBlog.title;
      existingBlog.content = content || existingBlog.content;

      await existingBlog.save();

      return NextResponse.json(
        {
          message: "Blog updated successfully",
          blog: existingBlog,
          status: true,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating blog" },
      { status: 500 }
    );
  }
}

"use client";

import Link from "@node_modules/next/link";
import React from "react";
import { FaUserAlt } from "react-icons/fa";

const BlogCard = ({ blogs }) => {
  return (
    <div className="min-h-[400px] h-[auto] w-[500px] border border-t-[#838383] border-t-8 border-t-[#FF66C4] border-b-8 shadow hover:shadow-lg flex flex-col justify-evenly p-5 rounded bg-black rounded-xl">
        <h1 className="text-white text-xl">
          <span className="font-bold text-[2rem]">Title:</span>{"  "} {blogs.title}
        </h1>
        <p className="text-white text-xl">
          <span className="font-bold text-[2rem]">Description:</span>{"  "} {blogs.content.slice(0,100)}
        <Link href={`/blogdetails/${blogs._id}`}>{"  "}
          <span className="underline hover:text-[#FF66C4] ">Read more...</span>
        </Link>
        </p>
        <div className="flex items-center gap-5 justify-start">
          <div className="rounded-full border shadow h-10 w-10 flex justify-center items-center">
            <FaUserAlt className="text-white"/>
          </div>
          <span className="text-white text-xl">
            <span className="font-bold text-[2rem]">Author:</span>{"  "} {blogs.author}
          </span>
        </div>
      </div>
  );
};

export default BlogCard;

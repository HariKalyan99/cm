import React from 'react'
import { FaUserAlt } from "react-icons/fa";


const BlogCard = ({blogs}) => {
  return (
    <div className="h-[400px] w-[300px] border shadow-lg flex flex-col justify-evenly p-5 rounded">
          <h1>
            <span className="font-bold">Title:</span> {blogs.title}
          </h1>
          <p>
            <span className="font-bold">Description:</span> {blogs.content}
          </p>
          <div className="flex items-center gap-5">
            <div className="rounded-full border shadow h-10 w-10 flex justify-center items-center">
              <FaUserAlt />
            </div>
            <span>
              <span className="font-bold">Author:</span> {blogs.author}
            </span>
          </div>
          
        </div>
  )
}

export default BlogCard

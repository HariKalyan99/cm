import React from 'react'
import { FaUserAlt } from "react-icons/fa";


const BlogCard = () => {
  return (
    <div className="h-[400px] w-[300px] border shadow-lg flex flex-col justify-evenly p-5 rounded">
          <h1>
            <span className="font-bold">Title:</span> Lorem ipsum dolor sit amet
            consectetur adipisicing
          </h1>
          <p>
            <span className="font-bold">Description:</span> Lorem, ipsum dolor
            sit amet consectetur adipisicing elit. Nostrum laborum architecto
            necessitatibus nihil magnam dolor, repudiandae nam ut blanditiis
            fugiat at saepe magni, beatae rem numquam accusamus possimus ratione
            quasi?
          </p>
          <div className="flex items-center gap-5">
            <div className="rounded-full border shadow h-10 w-10 flex justify-center items-center">
              <FaUserAlt />
            </div>
            <span>
              <span className="font-bold">Author:</span> Hello
            </span>
          </div>
          <span>
            <span className="font-bold">Created On: </span>10/12/23
          </span>
        </div>
  )
}

export default BlogCard

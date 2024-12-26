"use client"
import axios from '@node_modules/axios';
import { useParams } from '@node_modules/next/navigation';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import BlogDetailsCard from './BlogDetailsCard';

const BlogDetails = () => {
    const { id } = useParams();
    const [blogDetails, setBlogDetails] = useState([]);

    useEffect(() => {
        const fetchBlogDetails = async(blogId) => {
            const token = Cookies.get('jwt');
          try {
            const {data} = await axios.get(`/api/blogs/${blogId}`,  {
                headers: {
                    'Authorization': `Bearer ${token}`,  
                    'Content-Type': 'application/json'
                },
            })
            setBlogDetails(data.blogs);
          } catch (error) {
            console.log(error);
          }
        }

        fetchBlogDetails(id)
    }, [id])
  return (
    <div>
      {blogDetails?.length > 0 && blogDetails?.map(((blog, ind) => <BlogDetailsCard blog={blog} key={ind}/>))}
    </div>
  )
}

export default BlogDetails
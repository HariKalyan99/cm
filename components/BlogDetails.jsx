"use client"
import axios from '@node_modules/axios';
import { useParams } from '@node_modules/next/navigation';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import BlogDetailsCard from './BlogDetailsCard';
import Navigation from './Navigation';

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
            if(data.success){
              setBlogDetails(data.blogs);
            }
          } catch (error) {
            console.log(error);
          }
        }

        fetchBlogDetails(id)
    }, [id])
  return (
    <div>
      <Navigation write={"back"}/>
      {blogDetails?.length > 0 && blogDetails?.map(((blog, ind) => <BlogDetailsCard blog={blog} key={ind}/>))}
    </div>
  )
}

export default BlogDetails
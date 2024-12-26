"use client"
import axios from '@node_modules/axios';
import { useParams } from '@node_modules/next/navigation';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'

const BlogDetails = () => {
    const { id } = useParams();

    useEffect(() => {
        const fetchBlogDetails = async(blogId) => {
            const token = Cookies.get('jwt');
          try {
            const data = await axios.get(`/api/blogs/${blogId}`,  {
                headers: {
                    'Authorization': `Bearer ${token}`,  
                    'Content-Type': 'application/json'
                },
            })
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        }

        fetchBlogDetails(id)
    }, [id])
  return (
    <div>BlogDetails</div>
  )
}

export default BlogDetails
'use client'
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie';

const BlogCreate = () => {
    const [error, setError] = useState("");
    const [newBlog, setNewBlog] = useState("");
    const titleRef = useRef("");
    const contentRef = useRef("");

    useEffect(() => {

        const addNewBlog = async(blog) => {
            const token = Cookies.get('jwt');
            try {
                const {data} = await axios.post("api/blogs", blog, {
                    headers: {
                        'Authorization': `Bearer ${token}`,  
                        'Content-Type': 'application/json'
                    },
                });
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        if(newBlog.title && newBlog.content){
            addNewBlog(newBlog)
        }
    }, [newBlog])



    const handleBlogSubmit = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const content = contentRef.current.value;


        setNewBlog({title, content});
    }
  return (
    <section className='grid place-items-center h-screen'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-blue-400'>
            <h1 className='text-xl font-bold my-4'>What's new today?</h1>

            <form className='flex flex-col gap-3' onSubmit={(e) => handleBlogSubmit(e)}>
                <input type="text" placeholder='Title of your blog' required ref={titleRef}/>
                <textarea type="text" placeholder='Description of your blog' required ref={contentRef}/>
                <button className='bg-blue-600 text-white font-bold cursor-pointer px-6 py-2' type='submit'>
                    Add Blog
                </button>

                {error && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>}
               
            </form>
        </div>
    </section>
  )
}

export default BlogCreate


'use client'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Navigation from './Navigation';
import toast from '@node_modules/react-hot-toast/dist';

const BlogCreate = () => {
    const router = useRouter();
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
                if(data.status){
                    router.push("/home");
                    toast.success(data.message);
                }
            } catch (error) {
                toast.error(error);
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
   <>
   <Navigation write={"back"}/>
   <section className='grid place-items-center h-screen bg-[#A6A6A6]'>
        <div className='shadow-lg p-5 rounded-lg bg-[white] border-t-4 border-[#FF66C4]'>
            <h1 className='text-xl font-bold my-4'>What`s new today?</h1>

            <form className='flex flex-col gap-3' onSubmit={(e) => handleBlogSubmit(e)}>
                <input type="text" placeholder='Title of your blog' required ref={titleRef}/>
                <textarea type="text" placeholder='Description of your blog' required ref={contentRef} rows={10}/>
                <button className='bg-[black] text-white font-bold cursor-pointer px-6 py-2 hover:bg-[grey]' type='submit'>
                    Add Blog
                </button>
            </form>
        </div>
    </section>
   </>
  )
}

export default BlogCreate


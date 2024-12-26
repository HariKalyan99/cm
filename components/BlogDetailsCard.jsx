'use client'
import Link from 'next/link';
import React from 'react'

const BlogDetailsCard = ({blog}) => {
    const convertDate = (date) => {
        return `${new Date(date).toDateString()} @ ${new Date(date).toLocaleTimeString()}`;
    }
  return (
    <section className='w-[100%] h-[100vh] flex justify-center items-center'>
        <div className='w-[500px] h-[auto] shadow hover:shadow-xl min-h-[500px] border flex justify-evenly items-start flex-col p-5'>
            <h1 className='font-bold text-xl'>Title: <span className='text-sm'>{blog.title}</span></h1>
            <h3 className='font-bold text-xl'>Content: <span className='text-sm'>{blog.content}</span></h3>
            <p className='font-bold text-xl'>Author: <span className='text-sm'>{blog.author}</span></p>
            <p className='font-bold text-xl'>Published at: <span className='text-sm'>{convertDate(blog.createdAt)}</span></p>
            <Link className='underline' href={"/home"}>
                Go to Home
            </Link>
        </div>
    </section>
  )
}

export default BlogDetailsCard


'use client'
import BlogCreate from '@components/BlogCreate'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const NewBlog = () => {
  return (
    <>
      <BlogCreate />
      <Toaster />
    </>
  )
}

export default NewBlog

"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const router = useRouter();
  const handleLogout = async() => {
    try {
      const {data} = await axios.get('api/logout');
      toast.success(data.message);
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }
  return (
     <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden'/>
        <span className='orange_gradient text-center'>
          AI - Powered Promts
        </span>
      </h1>
      <p className='desc text-center'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam quos beatae itaque aliquid, vel illo atque voluptatibus voluptas odio reprehenderit eaque laboriosam ipsam vero! Libero nemo reprehenderit in doloremque nostrum!
      </p>
      <button className='bg-red-500 text-white font-bold px-6  py-2 mt-3' onClick={() => handleLogout()}>Logout</button>
    </section>
  )
}

export default Dashboard
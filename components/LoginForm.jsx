'use client'
import Link from '@node_modules/next/link'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [getUser, setUser] = useState("");


  useEffect(() => {
    const loginUser = async(user) => {
      try {
        const {data} = await axios.post('api/login', user);
         if(data.success){
          toast.success(data.message);
          router.push("/home");
         }
      } catch (error) {
        setError("Please input right email and password");
        toast.error(error.response.data.error)
      }
    }

    if(getUser.email && getUser.password){
      loginUser(getUser);
    }

  }, [getUser])
  const handleLogin = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if(!email || !password){
      setError("All fields mandatory*");
    }
    setError('') 
    setUser({email, password});
  }

  return (
    <div className='grid place-items-center h-screen'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-[#A6A6A6]'>
            <h1 className='text-xl font-bold my-4'>Enter the details</h1>

            <form className='flex flex-col gap-3' onSubmit={(e) => handleLogin(e)}>
                <input type="email" placeholder='Enter your email' required ref={emailRef}/>
                <input type="password" placeholder='Enter your password' required ref={passwordRef}/>
                <button className='bg-[#FF66C4] text-white font-bold cursor-pointer px-6 py-2'>
                    Login
                </button>

                {error && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>}

                <Link className='text-sm mt-3 text-right' href={"/register"}>
                Don't have an account? <span className='underline'>Register</span>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default LoginForm
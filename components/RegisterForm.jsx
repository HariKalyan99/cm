'use client'
import Link from '@node_modules/next/link'
import React, { useRef, useState } from 'react'

const RegisterForm = () => {
    const usernameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [error, setError] = useState();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(!username || !email || !password){
            setError("All fields mandatory*");
            return
        }
        setError('');

        try {
            const response = await fetch('api/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username, email, password
                })
            })

            if(response.ok){
                const form = e.target;
                form.reset()
            }else{
                console.log("User registration failed");
            }
        } catch (error) {
            console.log('Error occured during registration.', error);
        }
    }
  return (
    <div className='grid place-items-center h-screen'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
            <h1 className='text-xl font-bold my-4'>Register</h1>

            <form className='flex flex-col gap-3' onSubmit={(e) => handleSubmit(e)}>
            <input type="text" placeholder='Enter your username' ref={usernameRef} />
                <input type="email" placeholder='Enter your email' ref={emailRef} />
                <input type="password" placeholder='Enter your password' ref={passwordRef} />
                <button className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2' type='submit'>
                    Login
                </button>

                {error && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>}

                <Link className='text-sm mt-3 text-right' href={"/"}>
                Already have an account? <span className='underline'>Login</span>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm
"use client";
import Link from "@node_modules/next/link";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    const signupUser = async(user) => {
      try {
        const { data } = await axios.post("api/register", user);
        if(data.success){
          toast.success(data.message);
          router.push("/");
        }
      } catch (error) {
        console.log("Error occured during registration.", error.response.data.error);
        toast.error(error.response.data.error)
      }
    }
    if(newUser.username && newUser.password && newUser.email){
      signupUser(newUser);
    }
  }, [newUser])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !email || !password) {
      setError("All fields mandatory*");
      return;
    }
    setError("");

    setNewUser({username, password, email});
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-[#A6A6A6]">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Enter your username"
            ref={usernameRef}
          />
          <input type="email" placeholder="Enter your email" ref={emailRef} />
          <input
            type="password"
            placeholder="Enter your password"
            ref={passwordRef}
          />
          <button
            className="bg-[#FF66C4] text-white font-bold cursor-pointer px-6 py-2"
            type="submit"
          >
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

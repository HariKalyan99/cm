"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import BlogCard from "./BlogCard";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("api/userdata");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);
  const handleLogout = async () => {
    try {
      const { data } = await axios.get("api/logout");
      toast.success(data.message);
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI - Powered Promts</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam quos
        beatae itaque aliquid, vel illo atque voluptatibus voluptas odio
        reprehenderit eaque laboriosam ipsam vero! Libero nemo reprehenderit in
        doloremque nostrum!
      </p>
      <button
        className="bg-red-500 text-white font-bold px-6  py-2 mt-3"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
      <button
        className="bg-green-500 text-white font-bold px-6  py-2 mt-3"
        onClick={() => router.push("/newblog")}
      >
        Create Blog
      </button>
      
      <div className="h-[auto] w-[100vw] flex flex-wrap justify-center items-center gap-5">
        {[1,2,3,4,5,6].map((_, ind) => <BlogCard key={ind}/>)}
      </div>
    </section>
  );
};

export default Dashboard;

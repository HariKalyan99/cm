"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BlogCard from "./BlogCard";
import Cookies from 'js-cookie';

const Dashboard = () => {
  const router = useRouter();
  const [postList, setPostList] = useState([]);

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


  useEffect(() => {
    const fetchBlogs = async () => {
      const token = Cookies.get('jwt');
      try {
        const {data} = await axios.get("api/blogs", {
          headers: {
              'Authorization': `Bearer ${token}`,  
              'Content-Type': 'application/json'
          },
      });

      setPostList(data.blogs)
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogs();
  }, [])
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
        {postList?.length > 0 ? postList?.map((_, ind) => <BlogCard blogs={_} key={ind}/>) : (<h1>No blogs!!</h1>)}
      </div>
    </section>
  );
};

export default Dashboard;

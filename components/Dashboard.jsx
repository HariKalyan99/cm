"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Cookies from 'js-cookie';
import Navigation from "./Navigation";
import { RiReactjsFill } from "react-icons/ri";

const Dashboard = () => {
  const [postList, setPostList] = useState([]);
  

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

  return (
    <>
    <Navigation write={true}/>
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Tron's Blog post
        <br className="max-md:hidden" />
        <span className="text-center">Revolutionizing the Blog's Space</span>
      </h1>
      <p className="sub_text text-center">
      Exploring the Future of Decentralized Technology with TRON: Innovation, Growth, and Impact
      </p>
      <div className="h-[auto] w-[100vw] flex justify-start items-center gap-5 my-5 p-5">
        {postList?.length > 0 ? postList?.map((_) => <BlogCard blogs={_} key={_._id}/>) : postList?.length === 0 ? <h1 className="head_text text-center w-full">No blogs here</h1> : (<div className="animate-spin h-5 w-5"><RiReactjsFill /></div>)}
      </div>
    </section>
    </>
  );
};

export default Dashboard;

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
      if(data.success){
        setPostList(data.blogs)
      }

      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogs();
  }, [])


  return (
    <>
    <Navigation write={"create"}/>
    <section className="w-full flex-center flex-col bg-[#A6A6A6] min-h-[100vh]">
      <h1 className="head_text text-center">
        Tron`s Blog post
        <br className="max-md:hidden" />
        <span className="text-center">Revolutionizing the Blog`s Space</span>
      </h1>
      <p className="sub_text text-center">
      Exploring the Future of Decentralized Technology with TRON: Innovation, Growth, and Impact
      </p>
      <div className="h-[auto] w-[100%] flex justify-center items-center gap-5 my-5 p-5 flex-wrap">
        {postList?.length > 0 ? postList?.map((_) => <BlogCard postList={postList} setPostList={setPostList} blogs={_} key={_._id}/>) : postList?.length === 0 ? <h1 className="head_text text-center w-full">No blogs here</h1> : (<div className="animate-spin h-5 w-5"><RiReactjsFill /></div>)}
      </div>
    </section>
    </>
  );
};

export default Dashboard;

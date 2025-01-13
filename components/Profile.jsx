'use client'

import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import axios from "@node_modules/axios";
import Cookies from "js-cookie";
import BlogProfileCard from "./BlogProfileCard";


const Profile = () => {
    const [userPostList, setUserPostList] = useState([]);
    

    useEffect(() =>{
        const getUserBlogs = async() => {
            try {
                const token = Cookies.get("jwt")
                const {data} = await axios.get("/api/profile", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                if(data.success){
                    setUserPostList(data.blogs);
                }
            } catch (error) {
                console.log(error)
            }
        }

        if(JSON.parse(localStorage.getItem("username"))){
            getUserBlogs()
        }
    }, [])
  return (
    <div>
      <Navigation write={"profile"} />
      <section className="w-full flex-center flex-col bg-[#A6A6A6] min-h-[100vh]">
        <h1 className="head_text text-center">
          {JSON.parse(localStorage.getItem("username"))}`s Blog post
          <br className="max-md:hidden" />
        </h1>

        <div className="h-[auto] w-[100%] flex justify-center items-center gap-5 my-5 p-5 flex-wrap">
          {userPostList?.length > 0 ? (
            userPostList?.map((_) => (
              <BlogProfileCard
                postList={userPostList}
                setPostList={setUserPostList}
                blogs={_}
                key={_._id}
                profile
              />
            ))
          ) : userPostList?.length === 0 && (
            <h1 className="head_text text-center w-full">No blogs here</h1>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;

"use client";

import axios from "@node_modules/axios";
import Link from "@node_modules/next/link";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import toast from "@node_modules/react-hot-toast/dist";
import BlogEdit from "./BlogEdit";

const BlogCard = ({ blogs, setPostList, postList }) => {
  const [deleteBlogId, setDeleteBlogId] = useState("");
  const [openEditTab, setOpenEditTab] = useState(false);

  useEffect(() => {
    const deleteBlog = async (id) => {
      try {
        const token = Cookies.get("jwt");
        const { data } = await axios.delete(`/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.status) {
          setPostList(postList.filter((x) => x._id !== id));
          toast.success(data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    if (deleteBlogId?.length > 0) {
      deleteBlog(deleteBlogId);
    }
  }, [deleteBlogId]);

  const handleBlogDelete = (id) => {
    setDeleteBlogId(id);
  };

  return (
    <>
      {!openEditTab ? (
        <div className="min-h-[400px] h-[auto] w-[500px] border border-t-[#838383] border-t-8 border-t-[#FF66C4] border-b-8 shadow hover:shadow-lg flex flex-col justify-evenly p-5 rounded bg-black rounded-xl">
          <h1 className="text-white text-xl">
            <span className="font-bold text-[2rem]">Title:</span>
            {"  "} {blogs.title.slice(0, 100)}
          </h1>
          <p className="text-white text-xl">
            <span className="font-bold text-[2rem]">Description:</span>
            {"  "} {blogs.content.slice(0, 100)}
            <Link href={`/blogdetails/${blogs._id}`}>
              {"  "}
              <span className="underline hover:text-[#FF66C4] ">
                Read more...
              </span>
            </Link>
          </p>
          <div className="flex items-center gap-5 justify-start">
            <div className="rounded-full border shadow h-10 w-10 flex justify-center items-center">
              <FaUserAlt className="text-white" />
            </div>
            <span className="text-white text-xl">
              <span className="font-bold text-[2rem]">Author:</span>
              {"  "} {blogs.author}
            </span>
          </div>
          {JSON.parse(localStorage.getItem("username")) === blogs.author && (
            <div className="flex gap-5">
              <span onClick={() => handleBlogDelete(blogs._id)}>
                <RiDeleteBin5Fill className="text-[white] text-3xl hover:text-[pink] hover:cursor-pointer" />
              </span>
              <span onClick={() => setOpenEditTab((prev) => !prev)}>
                <BiSolidEdit className="text-[white] text-3xl hover:text-[pink] hover:cursor-pointer" />
              </span>
            </div>
          )}
        </div>
      ) : (
        <BlogEdit
          setOpenEditTab={setOpenEditTab}
          setPostList={setPostList}
          postList={postList}
          blogs={blogs}
        />
      )}
    </>
  );
};

export default BlogCard;
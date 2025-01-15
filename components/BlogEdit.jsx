"use client";

import axios from "@node_modules/axios";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { MdOutlineEditOff } from "react-icons/md";

const BlogEdit = ({ setOpenEditTab, blogs, postList, setPostList }) => {
  const [blogTitle, setBlogTitle] = useState(blogs.title);
  const [blogContent, setBlogContent] = useState(blogs.content);
  const [editBlog, setEditBlog] = useState("");

  useEffect(() => {
    const updateBlog = async (blog, id) => {
      try {
        const token = Cookies.get("jwt");
        const { data } = await axios.put(`/api/blogs/${id}`, blog, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const index = postList.findIndex((x) => x._id === data.blog._id);
        postList.splice(index, 1, data.blog);
        setPostList([...postList]);
        setOpenEditTab((prev) => !prev);
      } catch (error) {
        console.error(error); 
      }
    };

    if (editBlog?.title) {
      updateBlog(editBlog, blogs._id);
    }
  }, [editBlog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = blogTitle;
    const content = blogContent;
    setEditBlog({ title, content });
  };

  return (
    <div>
      <h1 className="text-xl font-bold my-4">You can edit your blog here!</h1>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title of your blog"
          required
          className="w-[400px]"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
        <textarea
          placeholder="Description of your blog"
          required
          rows={10}
          className="w-[400px]"
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
        />
        <button
          className="bg-[black] text-white font-bold cursor-pointer px-6 py-2 hover:bg-[grey]"
          type="submit"
        >
          Edit Blog
        </button>
        <span onClick={() => setOpenEditTab((prev) => !prev)}>
          <MdOutlineEditOff className="text-[black] text-3xl hover:text-[grey] hover:cursor-pointer" />
        </span>
      </form>
    </div>
  );
};

BlogEdit.propTypes = {
  blogs: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  setPostList: PropTypes.func.isRequired,
  postList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ).isRequired,
  setOpenEditTab: PropTypes.bool.isRequired,
};

export default BlogEdit;

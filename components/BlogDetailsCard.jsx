"use client";
import Link from "next/link";
import React from "react";
import { CiHome } from "react-icons/ci";
import PropTypes from "prop-types";

const BlogDetailsCard = (props) => {
  const { blog } = props;
  const convertDate = (date) => {
    return `${new Date(date).toDateString()} @ ${new Date(date).toLocaleTimeString()}`;
  };
  return (
    <section className="w-[100%] min-h-[100vh] flex justify-center items-center bg-[#A6A6A6] flex-col">
      <h1 className="text-[3rem] font-bolder">Blog Details</h1>
      <div className="w-[700px] h-[auto] shadow-xl min-h-[500px] border border-[white] border-4 flex justify-evenly items-start flex-col rounded-lg overflow-hidden">
        <img
          src="https://t3.ftcdn.net/jpg/07/79/50/06/360_F_779500657_m3p0kSWwxx8cCF1s2giytjcsPMksxkse.jpg"
          alt="blog_img"
          className="w-full h-[300px] object-cover"
        />
        <div className="h-100 w-100 flex justify-evenly items-start flex-col p-5 gap-5">
          <h1 className="font-bold text-xl">
            Title: <span className="text-sm">{blog.title}</span>
          </h1>
          <h3 className="font-bold text-xl">
            Content: <span className="text-sm">{blog.content}</span>
          </h3>
          <p className="font-bold text-xl">
            Author: <span className="text-sm">{blog.author}</span>
          </p>
          <p className="font-bold text-xl">
            Published at:{" "}
            <span className="text-sm">{convertDate(blog.createdAt)}</span>
          </p>
          <Link
            className="underline flex justify-center items-center gap-2"
            href={"/home"}
          >
            Go to Home
            <CiHome />
          </Link>
        </div>
      </div>
    </section>
  );
};
BlogDetailsCard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogDetailsCard;

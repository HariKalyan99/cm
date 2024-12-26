"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";

import { PiNotePencilThin } from "react-icons/pi";
import { CiHome } from "react-icons/ci";



const Navigation = ({write}) => {
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("api/userdata");
        localStorage.setItem("username", JSON.stringify(data.data.username));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [write]);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("api/logout");
      toast.success(data.message);
      localStorage.clear();
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="w-[100%] h-[5rem] border flex justify-between px-4 items-center bg-black border-b-8 border-b-[#FF66C4] shadow-lg">
      <Image src="/tron.svg" alt="logo" width={100} height={100} onClick={() => router.push("/home")} className="cursor-pointer"/>
      {write ? <button
        type="button"
        className="px-4 py-2 hover:bg-[#FF66C4] bg-white border border-[grey] border-4 rounded-full flex justify-center items-center gap-2"
        onClick={() => router.push("/newblog")}
      >
        Write blog <span><PiNotePencilThin /></span>
      </button> : <button
        type="button"
        className="px-4 py-2 hover:bg-[#FF66C4] bg-white border border-[grey] border-4 rounded-full flex justify-center items-center gap-2"
        onClick={() => router.push("/home")}
      >
        Go back <CiHome />
      </button>}
      <ul className="list-none flex gap-3 justify-center items-center">
        {write && <li>
          <button
            type="button"
            className="px-4 py-2 hover:bg-[#FF66C4] bg-white border border-[grey] border-4  rounded-full"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </li>}

        <li className="rounded-full border shadow h-10 w-10 flex justify-center items-center">
          <FaUserAlt className="text-white" />
        </li>

        <li>
          <span className="font-bold fs-1 text-white">{JSON.parse(localStorage.getItem("username"))}</span>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;

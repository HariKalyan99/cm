import React from "react";

const loading = () => {
  return (
    <div className="animate-pulse flex space-x-4 h-[100vh] w-full">
     <div className="flex w-full justify-center items-center">
            <div className="rounded-full bg-[grey] h-[3rem] w-[3rem] w-10 border-4 border-[pink]"></div>
            <div className="rounded-full bg-[grey] h-[3rem] w-[3rem] w-10 border-4 border-[pink]"></div>
            <div className="rounded-full bg-[grey] h-[3rem] w-[3rem] w-10 border-4 border-[pink]"></div>
          </div>
    </div>
  );
};

export default loading;

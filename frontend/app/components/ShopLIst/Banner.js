import React from "react";

const Banner = () => {
  return (
    <div
      className="flex justify-center w-full relative bg-cover bg-center h-[80vh] text-white py-28 px-10 object-fill"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(124,90,7,0.5914740896358543) 19%, rgba(26,27,20,0.5550595238095238) 52%),url(https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="xl:w-1/2 lg:w-[70%] sm:w-full">
        <div className=" text-slate-300">
          <p className="text-7xl font-extrabold  mb-10 ">SHOP HUB</p>
          <p class=" md:text-8xl font-thin leading-none sm:text-7xl">
            List of shops at your{" "}
            <span className="text-slate-900 font-normal ">finger tips</span>
          </p>
        </div>
      </div>
      <div
        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
        style={{ transform: "translateZ(0)" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className=" fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
  );
};

export default Banner;

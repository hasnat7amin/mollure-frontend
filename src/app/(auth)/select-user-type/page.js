
import { useState } from "react";
import Navbar from "../../../components/navbar";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import leftLines from "../../../images/auth/lines_left.svg";
import rightLines from "../../../images/auth/lines_right.svg";
import greenCircle from "../../../images/auth/blur_circle.svg";

import greenCircleLeft from "../../../images/auth/blur_circle_left.svg";
import { Link } from 'react-router-dom';

export default function SelectUserType() {
  return (
    <section className="relative px-3 md:p-0 ">
      <div className="md:w-[85%] mx-auto w-full">
        <Navbar />

        <main className="w-full pb-20 ">
          <div className="flex flex-col items-center justify-center w-full mt-5 mb-10 space-y-5 md:flex-row md:space-y-0 md:space-x-5">
            <div className="w-[5rem] border-[2px] m-0 border-customGreen"></div>
            <h2 className="mb-2 text-2xl font-semibold md:text-3xl ">
              Registration
            </h2>
            <div className="w-[5rem] border-[2px] m-0 border-customGreen"></div>
          </div>
          <div className="flex items-start justify-center w-full h-full ">
            {/* login form */}
            <div className="w-full md:w-[32rem] flex flex-col space-y-4   my-10 md:mt-10  z-30">
              <Link to="/signup-individual">
                <div className="px-3 py-12 bg-white border  shadow-sm cursor-pointer md:px-6 rounded-3xl hover:bg-customGreen hover:text-white">
                  <h2 className="mb-2 text-2xl font-semibold md:text-3xl ">
                    For Individual client
                  </h2>
                  {/* <p className="text-gray-500">
                    By hitting Login, Lorem Ipsum Sit Omet Domet
                  </p> */}
                </div>
              </Link>
              <Link to="/signup-company">
                <div className="px-3 py-12 bg-white border shadow-sm cursor-pointer md:px-6  rounded-3xl hover:bg-customGreen hover:text-white hover:border">
                  <h2 className="mb-2 text-2xl font-semibold md:text-3xl ">
                    For Company client
                  </h2>
                  {/* <p className="">
                    By hitting Login, Lorem Ipsum Sit Omet Domet
                  </p> */}
                </div>
              </Link>
              <Link to="/signup-professional">
                {" "}
                <div className="px-3 py-12 bg-white border shadow-sm cursor-pointer md:px-6 rounded-3xl hover:bg-customGreen hover:text-white">
                  <h2 className="mb-2 text-2xl font-semibold md:text-3xl ">
                    For Professional
                  </h2>
                  {/* <p className="text-gray-500">
                    By hitting Login, Lorem Ipsum Sit Omet Domet
                  </p> */}
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
      {/* left images */}
      <div className="absolute bottom-0 left-0 ">
        <img src={greenCircleLeft} alt="Line" className="w-2/3 mb-5 ms-8" />

        <img src={leftLines} alt="Line" className="w-2/3" />
      </div>

      {/* right images */}
      <div className="absolute bottom-0 right-0 flex flex-col items-end ">
        <img src={greenCircle} alt="Line" className="w-2/3 mb-20" />

        <img src={rightLines} alt="Line" className="w-2/3" />
      </div>
    </section>
  );
}

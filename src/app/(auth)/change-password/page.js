
import { useState } from "react";
import Navbar from "../../../components/navbar";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import leftLines from "../../../images/auth/lines_left.svg";
import rightLines from "../../../images/auth/lines_right.svg";
import greenCircle from "../../../images/auth/blur_circle.svg";
import greenCircleLeft from "../../../images/auth/blur_circle_left.svg";
import hideEye from "../../../images/auth/hide_eye.svg";
import eye from "../../../images/auth/eye.svg";

import { Link } from 'react-router-dom';


export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setNewShowPassword(!showNewPassword);
  };
  return (
    <section className="relative px-3 md:p-0">
      <div className="md:w-[85%] mx-auto w-full">
        <Navbar />

        <main className="w-full h-[87vh] ">
          <div className="flex items-start justify-center w-full h-full ">
            {/* login form */}
            <div className="w-full md:w-[30rem] border rounded-3xl  my-10 md:mt-10 shadow-md md:px-2 py-2 bg-white z-30">
              <div className="flex items-start justify-start w-full ">
                <div className="w-full p-3 space-y-5 ">
                  <div>
                    <h2 className="text-[28px] mb-2 font-semibold">Change Password</h2>
                    <p className="text-sm font-normal text-gray-500">
                      By hitting Login, Lorem Ipsum Sit Omet Domet
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                   
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-normal text-gray-500"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          placeholder="Enter Password"
                          className="w-full px-3 py-3 mt-1 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 "
                        />
                        <button
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 px-3 py-2 mt-1 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <img src={eye} alt="Eye" />
                          ) : (
                            <img src={hideEye} alt="Eye" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-normal text-gray-500"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          id="password"
                          placeholder="Enter Confirm Password"
                          className="w-full px-3 py-3 mt-1 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 "
                        />
                        <button
                          onClick={toggleNewPasswordVisibility}
                          className="absolute inset-y-0 right-0 px-3 py-2 mt-1 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? (
                            <img src={eye} alt="Eye" />
                          ) : (
                            <img src={hideEye} alt="Eye" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                
                  <div className="py-5">
                    <button className="w-full py-3 mb-4 text-base font-medium text-white rounded-md bg-customGreen ">
                      Save
                    </button>

                    <p className="text-sm font-normal text-center text-gray-500">
                      Not a member?{" "}
                      <Link
                        href="/select-user-type"
                        className="font-medium text-customGreen"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
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

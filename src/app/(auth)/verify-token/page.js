
import { useState, useEffect } from "react";
import Navbar from "../../../components/navbar";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import leftLines from "../../../images/auth/lines_left.svg";
import rightLines from "../../../images/auth/lines_right.svg";
import greenCircle from "../../../images/auth/blur_circle.svg";
import greenCircleLeft from "../../../images/auth/blur_circle_left.svg";
import hideEye from "../../../images/auth/hide_eye.svg";
import eye from "../../../images/auth/eye.svg";
import { useOtpInput } from "react-otp-input-hook";

import { Link } from 'react-router-dom';

import OtpInput from "react-otp-input";

export default function VerifyToken() {
  const [otp, setOtp] = useState("");

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
                    <h2 className="text-[28px] mb-2 font-semibold">
                      Verify Token
                    </h2>
                    <p className="text-sm font-normal text-gray-500">
                      By hitting Login, Lorem Ipsum Sit Omet Domet
                    </p>
                  </div>
                  <div className="flex flex-col w-full space-y-2">
                    <div className="flex items-center justify-center w-full pt-5 mx-auto">
                      <BasicOTPComponent
                        onChange={(value) => {
                          console.log(value);
                          setOtp(value);
                        }}
                      />
                      {/* <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={<span>-</span>}
                        inputType="text"
                        shouldAutoFocus={true}	
                        // onPaste={true}
                        renderInput={(props) => <input {...props} style={{width:"3rem !important",height:"3rem !important"}} />}
                        inputStyle="mt-1  mx-3   text-center  rounded-md  font-normal border border-gray-300 focus:outline-none focus:ring focus:border-green-400 focus:bg-white" 
                      /> */}
                      {/* <input
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        className="w-full px-3 py-3 mt-1 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                      /> */}
                    </div>
                  </div>

                  <div className="py-5">
                    <Link to="/change-password">
                      <button className="w-full py-3 mb-4 text-base font-medium text-white rounded-md bg-customGreen ">
                        Submit
                      </button>
                    </Link>

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


const BasicOTPComponent = ({ onChange }) => {
  const { register } = useOtpInput({
    numberOfInputs:4,  
    onInputValueChange: onChange,
    defaultInlineStyles: {
      autoFocus: true,
      height: '40px',
      width: '40px',
      margin: "0 5px",
      textAlign: "center",
      fontSize: "20px",
      border: "1px solid #D1D5DB", // Add border style
      borderRadius: "0.25rem", // Add rounded corners
      outline: "none" // Remove outline on focus
    },
    placeholder: '_',
    onFocus: {
      border: '1px solid #34D399', // Add a different border color on focus
    },
  });

  const defaultOptions = { required: true };

  return (
    <div style={{ padding: "10px" }}>
      <input {...register("digit-1", defaultOptions)} />
      <input {...register("digit-2", defaultOptions)} />
      <input {...register("digit-3", defaultOptions)} />
      <input {...register("digit-4", defaultOptions)} />
      <input {...register("digit-5", defaultOptions)} />
    </div>
  );
};

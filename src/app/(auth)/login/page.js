
import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import leftLines from "../../../images/auth/lines_left.svg";
import rightLines from "../../../images/auth/lines_right.svg";
import greenCircle from "../../../images/auth/blur_circle.svg";
import greenCircleLeft from "../../../images/auth/blur_circle_left.svg";
import hideEye from "../../../images/auth/hide_eye.svg";
import eye from "../../../images/auth/eye.svg";
import spinner from "../../../images/spinner.svg";

import { Link } from 'react-router-dom';
import { useAuthContext } from "../../../contexts/AuthContextProvider";
import ErrorPopUp from "../../../components/error_popup";



export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, error, setError } = useAuthContext();
  const [showErrorModel, setShowErrorModel] = useState(false)

  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
      if(error && error!== ""){
        setShowErrorModel(true)
      }
  }, [error])

  const handleLogin = async () => {
    setError('');
    
    setLoading(true);
    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      setShowErrorModel(true);
      return;
    }

    const data = {
      email: email,
      password: password,
      rememberMe: rememberMe
    }

    await login(data);
    setLoading(false);

    // Set user as logged in (you can replace this with actual login logic)
    // setIsUserLoggedIn(true);
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
                    <h2 className="text-[28px] mb-2 font-semibold">Login</h2>
                    <p className="text-sm font-normal text-gray-500">
                      By hitting Login, Lorem Ipsum Sit Omet Domet
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-normal text-gray-500"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        className="w-full px-3 py-3 mt-1 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                      />
                    </div>

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
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                  </div>
                  <div className="flex items-center justify-between text-sm font-normal">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e)=>setRememberMe(e.target.checked)}
                        className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="text-gray-500 cursor-pointer ms-2"
                      >
                        Remember Me
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-gray-500 underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="py-5">
                    <button disabled={loading} onClick={handleLogin} className={`${loading?"bg-gray-100 flex items-center justify-center":"bg-customGreen"} text-white w-full py-3  mb-4  rounded-md text-base font-medium`} >
                      {
                        loading ?
                          <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Login"
                      }
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

        {/* error popup */}
        <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />
        
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

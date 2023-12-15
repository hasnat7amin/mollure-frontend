
import { useState } from "react";
import Navbar from "../../../components/navbar";
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
import SuccessPopUp from "../../../components/success_popup";
import { useParams } from 'react-router-dom';

export default function ChangePassword() {
  const {token} = useParams()
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { resetPassword } = useAuthContext();
  const [showErrorModel, setShowErrorModel] = useState(false)
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setNewShowPassword(!showNewPassword);
  };

  const handleSave = async () => {
    setError('');

    setLoading(true);
    if (!confirmPassword || !password) {
      setError('Password and Confirm Password are required');
      setLoading(false);
      setShowErrorModel(true);
      return;
    }

    if (confirmPassword.trim() === password.trim()) {
      setError('Password and Confirm Password should be same');
      setLoading(false);
      setShowErrorModel(true);
      return;
    }

    const data = {
      token: token,
      password_confirmation: confirmPassword,
      password: password,
    }

    const response = await resetPassword(JSON.stringify(data));
    if (!response) {
      setError("Something went wrong please try again.");
      setLoading(false);
      setShowErrorModel(true);
      return 
    }
    else {
      setLoading(false);
      setPassword("");
      setConfirmPassword("");
      setShowSuccessPopUp(true);
      return;
    }

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
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}

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
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}

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
                    <button disabled={loading} onClick={handleSave} className={`${loading ? "bg-gray-100 flex items-center justify-center" : "bg-customGreen"} text-white w-full py-3  mb-4  rounded-md text-base font-medium`} >
                      {
                        loading ?
                          <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Save"
                      }
                    </button>

                    <p className="text-sm font-normal text-center text-gray-500">
                      Not a member?{" "}
                      <Link
                        to="/select-user-type"
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
        <SuccessPopUp to={"/"} title={"Congratulations! Password Changed Successfully."} showModel={showSuccessPopUp} setShowModel={setShowSuccessPopUp} />
      
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

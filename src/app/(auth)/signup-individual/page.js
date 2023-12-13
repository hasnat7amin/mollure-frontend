
import { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/navbar";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePlus
} from "react-icons/ai";
import { BsCamera } from "react-icons/bs";
import spinner from "../../../images/spinner.svg";
import leftLines from "../../../images/auth/lines_left.svg";
import rightLines from "../../../images/auth/lines_right.svg";
import greenCircle from "../../../images/auth/blur_circle.svg";
import greenCircleLeft from "../../../images/auth/blur_circle_left.svg";
import moment from 'moment';
import hideEye from "../../../images/auth/hide_eye.svg";
import eye from "../../../images/auth/eye.svg";

import TitleBar from "../../../components/titleBar";
import Select from "../../../components/select";
import CustomDatePicker from "../../../components/custom_date_picker";
import ErrorPopUp from "../../../components/error_popup";
import { useAuthContext } from "../../../contexts/AuthContextProvider";
import { useNavigate,Link } from 'react-router-dom';
import SuccessPopUp from "../../../components/success_popup";

export default function SignupIC() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRestPassword, setRestShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const genderOptions = [
    { id: "male", label: "Male", value: "male" },
    { id: "female", label: "Female", value: "female" },
    { id: "other", label: "Other", value: "other" },

  ];

  const [nameOptions, setNameOptions] = useState([
    { id: "firstName", label: "First Name", value: "firstName" },
    { id: "lastName", label: "Last Name", value: "lastName" },
    { id: "fullName", label: "Full Name", value: "fullName" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorModel, setShowErrorModel] = useState(false)
  const [showSuccessModel, setShowSuccessModel] = useState(false)
  const { signUpIndividual, } = useAuthContext();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    contactNumber: '',
    dob: null,
    email: '',
    password: '',
    repeatPassword: '',
    acceptTerms: false,
    subscribeToBlog: false,
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentGenderSelected, setCurrentGenderSelected] = useState(null);
  const [currentNameForRating, setCurrentNameForRating] = useState(
    null
  );

  const updateUserOptions = () => {
    if (formData.firstName != "" && formData.lastName != "") {
      setNameOptions([
        { id: "suggestion1", label: `${formData.firstName}${formData.lastName}`, value: `${formData.firstName} ${formData.lastName}` },
        { id: "suggestion2", label: `${formData.firstName}`, value: `${formData.firstName}` },
        { id: "suggestion3", label: `${formData.firstName[0]}${formData.lastName[0]}`, value: `${formData.firstName[0]} ${formData.lastName[0]}` },
        ])
    }
  }

  useEffect(() => {
    updateUserOptions()
  }, [formData.firstName, formData.lastName])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage({ file: file, base64: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRestPasswordVisibility = () => {
    setRestShowPassword(!showRestPassword);
  };

  const handleSignUp = async () => {
    setError('');

    setLoading(true);
    const {
      firstName,
      lastName,
      contactNumber,
      email,
      password,
      repeatPassword,
      acceptTerms,
      dob,
    } = formData;

    if (
      
      !firstName ||
      !lastName ||
      !currentGenderSelected ||
      !contactNumber ||
      !email ||
      !password ||
      !repeatPassword ||
      !acceptTerms ||
      !currentNameForRating ||
      !dob
    ) {
      setError('All fields are required');
      setLoading(false);
      setShowErrorModel(true);
      return;
    }

    if (password !== repeatPassword) {
      setError('Password and reperat password should be same.');
      setLoading(false);
      setShowErrorModel(true);
      return;
    }

    console.log(dob, selectedImage, currentGenderSelected)

    const data = new FormData();
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('user_type', 'individual');
    data.append('subscribe_to_newsletter', formData.subscribeToBlog);
    data.append('gender', currentGenderSelected.label);
    data.append('contact_number', formData.contactNumber);
    data.append('first_name', formData.firstName);
    data.append('last_name', formData.lastName);
    data.append('name_for_rating', currentNameForRating.value);
    data.append('dob', dob);
    if(selectedImage){
      data.append('profile_pic', selectedImage.file);
    }


    const response = await signUpIndividual(data);
    if (!response) {
      setError("Please check your credentials again.");
      setLoading(false);
      setShowErrorModel(true);
    }
    else {
      // navigate('/');
      setShowSuccessModel(true);
    }

    setLoading(false);

    // Set user as logged in (you can replace this with actual login logic)
    // setIsUserLoggedIn(true);
  };

  return (
    <section className="relative px-3 md:p-0 ">
      <div className="md:w-[85%] mx-auto w-full">
        <Navbar />
        <div className="pt-px">
          <TitleBar title="User Information" />
        </div>
        <main className="w-full pb-10">
          <div className="flex items-start justify-center w-full h-full">
            {/* Signup form */}
            <div className="w-full md:w-[32rem] border rounded-3xl my-10 md:mt-20 shadow-md md:p-3  bg-white z-30">
              <div className=" w-full p-3 space-y-2.5">
                <div>
                  <h2 className="text-[28px] mb-2 font-semibold">Sign Up</h2>
                  <p className="text-sm font-normal text-gray-500">
                    By hitting Register, You are Accepting our{" "}
                    <Link to="/terms-and-conditions">
                      <span className="text-sm font-semibold text-black underline">
                        Terms & conditions.
                      </span>
                    </Link>
                  </p>
                </div>
                {/* image */}
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-normal text-gray-500"
                  >
                    Upload img
                  </label>
                  <div
                    className={
                      selectedImage
                        ? "relative h-40 w-40 mx-auto "
                        : "relative h-40 w-40 mx-auto text-gray-500  rounded-full"
                    }
                  >
                    {selectedImage ? (
                      <>
                        {" "}
                        <img
                          src={selectedImage.base64}
                          alt="Selected"
                          width={160}
                          height={160}
                          className="object-cover w-40 h-40 rounded-full shadow-md"
                        />
                        <div className="absolute right-0 z-50 flex items-center justify-center p-2 bg-white rounded-full shadow-md bottom-3 w-min h-min">
                          <BsCamera
                            size={28}
                            className="text-gray-500 cursor-pointer"
                            onClick={handleImageUploadClick}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-full shadow-md">
                        <BsCamera
                          size={24}
                          className="text-gray-500 cursor-pointer"
                          onClick={handleImageUploadClick}
                        />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="image"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="flex flex-col space-y-5 md:space-x-2 md:space-y-0 md:flex-row">
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-normal text-gray-500"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      name="firstName"
                      onChange={handleChange}
                      placeholder="Enter First Name"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-normal text-gray-500"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      name="lastName"
                      onChange={handleChange}
                      placeholder="Enter First Name"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="ratingName"
                    className="block text-sm font-normal text-gray-500"
                  >
                    Select Name for Rating and Review
                  </label>
                  <div className="w-full">
                    <Select
                      placeholder={"Select Name for Rating and Review"}
                      options={nameOptions}
                      selectedOption={currentNameForRating}
                      handelChange={(event) => {
                        if (event.value !== "selectName") {
                          setCurrentNameForRating(event);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-normal text-gray-500"
                  >
                    Date of Birth
                  </label>
                  <input
                      type="date"
                      id="firstName"
                      value={formData.dob}
                      name="dob"
                      onChange={handleChange}
                      placeholder="Enter Date of Birth"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-normal text-gray-500"
                  >
                    Gender
                  </label>

                  <div className="w-full">
                    <Select
                      //className="flex-1"
                      placeholder={"Select Gender"}
                      options={genderOptions}
                      selectedOption={currentGenderSelected}
                      handelChange={(event) => {
                        if (event.value !== "selectGender") {
                          console.log("parent", event);
                          setCurrentGenderSelected(event);
                        }
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-normal text-gray-500"
                  >
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    value={formData.contactNumber}
                    name="contactNumber"
                    onChange={handleChange}
                    placeholder="Enter Contact Number"
                    className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-normal text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
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
                      value={formData.password}
                      name="password"
                      onChange={handleChange}
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
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
                    htmlFor="repeatPassword"
                    className="block text-sm font-normal text-gray-500"
                  >
                    Repeat Password
                  </label>
                  <div className="relative">
                    <input
                      type={showRestPassword ? "text" : "password"}
                      id="password"
                      value={formData.repeatPassword}
                      name="repeatPassword"
                      onChange={handleChange}
                      placeholder="Enter Password"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                    <button
                      onClick={toggleRestPasswordVisibility}
                      className="absolute inset-y-0 right-0 px-3 py-2 mt-1 text-gray-400 hover:text-gray-600"
                    >
                      {showRestPassword ? (
                        <img src={eye} alt="Eye" />
                      ) : (
                        <img src={hideEye} alt="Eye" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    value={formData.acceptTerms}
                    name="acceptTerms"
                    onChange={handleChange}
                    className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                  />

                  <label
                    // htmlFor="acceptTerms"
                    className="text-sm font-normal text-gray-500 cursor-pointer ms-2"
                  >
                    Accept our{" "}
                    <Link to="/terms-and-conditions">
                      <span className="text-sm font-semibold text-black underline">
                        Terms & conditions.
                      </span>
                    </Link>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="subscribeToBlog"
                    value={formData.subscribeToBlog}
                    name="subscribeToBlog"
                    onChange={handleChange}
                    className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                  />
                  <label
                    // htmlFor="subscribeToBlog"
                    className="text-sm font-normal text-gray-500 cursor-pointer ms-2"
                  >
                    Subscribe to Blog
                  </label>
                </div>
                <button disabled={loading} onClick={handleSignUp} className={`${loading ? "bg-gray-100 flex items-center justify-center" : "bg-customGreen"} text-white w-full py-3  mb-4  rounded-md text-base font-medium`} >
                  {
                    loading ?
                      <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Sign Up"
                  }
                </button>
              </div>
            </div>
          </div>
        </main>
        {/* error popup */}
        <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />
        {/* success popup */}
        <SuccessPopUp to={"/"} title={"Thank you for registration. Please verify your email first."} showModel={showSuccessModel} setShowModel={setShowSuccessModel}  />
        
      </div>
      {/* left images */}
      <div className="absolute top-[31%] left-[0%]">
        <img src={greenCircleLeft} alt="Line" className="w-full mb-5 ms-8" />
      </div>
      <div className="absolute bottom-0 left-0">
        <img src={leftLines} alt="Line" className="w-2/3" />
      </div>
      {/* right images */}
      <div className="absolute top-[15%] right-[0%] flex items-end flex-col">
        <img src={greenCircle} alt="Line" className="w-full mb-20" />
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col items-end">
        {/* <img src={greenCircle} alt="Line" className="w-2/3 mb-20" /> */}
        <img src={rightLines} alt="Line" className="w-2/3" />
      </div>
    </section>
  );
}

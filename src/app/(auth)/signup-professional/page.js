
import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../../components/navbar";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePlus
} from "react-icons/ai";
import { IoFolder, IoClose } from "react-icons/io5";
import leftLines from "../../../images/auth/lines_left.svg";
import rightLines from "../../../images/auth/lines_right.svg";
import greenCircle from "../../../images/auth/blur_circle.svg";
import greenCircleLeft from "../../../images/auth/blur_circle_left.svg";

import TitleBar from "../../../components/titleBar";
import { BsCamera } from "react-icons/bs";
import { FaUpload, FaFolderClosed } from "react-icons/fa";
import { FcDocument } from "react-icons/fc";
import { MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import spinner from "../../../images/spinner.svg";

import hideEye from "../../../images/auth/hide_eye.svg";
import eye from "../../../images/auth/eye.svg";
import Select from "../../../components/select";
import Info from "../../../components/info";
import ErrorPopUp from "../../../components/error_popup";
import { useAuthContext } from "../../../contexts/AuthContextProvider";
import { useNavigate, Link } from 'react-router-dom';

import { useProvinceContext } from "../../../contexts/ProvincesContextProvider";
import { useMunicipalityContext } from "../../../contexts/MunicipalityContextProvider";
import SuccessPopUp from "../../../components/success_popup";

export default function SignupProfessional() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRestPassword, setRestShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);
  const [documentInput, setDocumentInput] = useState("");
  const [workLinks, setWorkLinks] = useState([]);
  const [workLinkInput, setWorkLinkInput] = useState("");
  const [documentation, setDocumentation] = useState([]);
  const [selectedDocumentFile, setSelectedDocumentFile] = useState(null);
  const { provinces,
    getAllProvinces, } = useProvinceContext();
  const { municipalities,
    getAllMunicipalities, } = useMunicipalityContext();

  const genderOptions = [
    { id: "male", label: "Male", value: "male" },
    { id: "female", label: "Female", value: "female" },
    { id: "other", label: "Other", value: "other" }
  ];

  const [provinceOptions, setProvinceOptions] = useState([
    { id: "loading", label: "Loading ...", value: "Loading ..." },
  ]);

  const [municipalityOptions, setMunicipalityOptions] = useState([
    { id: "loading", label: "Loading ...", value: "Loading ..." },
  ]);

  const [currentGenderSelected, setCurrentGenderSelected] = useState(null);

  const [currentProvinceSelected, setCurrentProvinceSelected] = useState(
    null
  );

  const [currentMunicipalitySelected, setCurrentMunicipalitySelected] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorModel, setShowErrorModel] = useState(false)
  const { signUpProfessionalAndCompany, } = useAuthContext();
  const [showSuccessModel, setShowSuccessModel] = useState(false)



  const [formData, setFormData] = useState({
    legalName: '',
    cocNumber: '',
    vatNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    contactNumber: '',
    email: '',
    street: '',
    number: '',
    postalCode: '',
    worklink1: '',
    worklink2: '',
    worklink3: '',
    password: '',
    repeatPassword: '',
    acceptTerms: false,
    subscribeToBlog: false,
  });



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const addDocument = (file) => {
    setDocumentation((prevDocumentation) => [...prevDocumentation, file]);
  };

  const removeDocument = (index) => {
    const updatedDocumentation = [...documentation];
    updatedDocumentation.splice(index, 1);
    setDocumentation(updatedDocumentation);
  };

  const handleDocumentFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      addDocument(file);
      setSelectedDocumentFile(null);
    }
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
  const handleDocUploadClick = () => {
    docInputRef.current.click();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRestPasswordVisibility = () => {
    setRestShowPassword(!showRestPassword);
  };

  const addWorkLink = () => {
    if (workLinkInput) {
      setWorkLinks([...workLinks, workLinkInput]);
      setWorkLinkInput("");
    }
  };

  const removeWorkLink = (index) => {
    const updatedWorkLinks = [...workLinks];
    updatedWorkLinks.splice(index, 1);
    setWorkLinks(updatedWorkLinks);
  };

  const getProvinces = async () => {
    await getAllProvinces();
  }

  const setProvinces = async () => {
    if (provinces && provinces.length>0 && (provinces !== null || provinces != [])) {
      setProvinceOptions(
        provinces.map((item) => (
          { id: item.id, value: item.name, label: item.name }
        ))
      )
    }
    if (provinces == []) {
      setProvinceOptions(
        { id: "loading", value: "No Provinces Found", label: "No Provinces Found" }

      )
    }
  }

  const setMunicipalities = async () => {
    if (municipalities &&  municipalities.length>0 && (municipalities !== null || municipalities != [])) {
      setMunicipalityOptions(
        municipalities.map((item) => (
          { id: item.id, value: item.name, label: item.name }
        ))
      )
    }
    if (municipalities == []) {
      setMunicipalityOptions(
        { id: "loading", value: "No Municipalities Found", label: "No Municipalities Found" }

      )
    }
  }

  const getMunicipalities = async () => {
    if (currentProvinceSelected) {
      const data = "province_id=" + currentProvinceSelected.id.toString()
      await getAllMunicipalities(data);
    }

  }


  useEffect(() => {
    getProvinces();
  }, [])

  useEffect(() => {
    setProvinces();
  }, [provinces])


  useEffect(() => {
    console.log(currentProvinceSelected)
    getMunicipalities();
  }, [currentProvinceSelected])

  useEffect(() => {
    setMunicipalities();
  }, [municipalities])


  const handleSignUp = async () => {
    setError('');

    setLoading(true);
    const {
      legalName,
      cocNumber,
      vatNumber,
      firstName,
      lastName,
      address,
      contactNumber,
      email,
      street,
      number,
      postalCode,
      worklink1,
      worklink2,
      worklink3,
      password,
      repeatPassword,
      acceptTerms,
    } = formData;

    if (

      !currentGenderSelected ||
      !legalName ||
      !cocNumber ||
      !vatNumber ||
      !firstName ||
      !lastName ||
      !contactNumber ||
      !email ||
      !street ||
      !number ||
      !postalCode ||
      !worklink1 ||
      !password ||
      !repeatPassword ||
      !acceptTerms ||
      !currentMunicipalitySelected ||
      !currentProvinceSelected ||
      !documentation > 0
    ) {
      setError('Fill in all the required fields.');
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

    console.log(formData, selectedImage, currentGenderSelected)

    const data = new FormData();
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('subscribe_to_newsletter', formData.subscribeToBlog ? 1 : 0);
    data.append('gender', currentGenderSelected.value);
    data.append('contact_number', formData.contactNumber);
    data.append('coc', formData.cocNumber);
    data.append('vat', formData.vatNumber);
    data.append('legal_name', formData.legalName);
    data.append('first_name', formData.firstName);
    data.append('last_name', formData.lastName);
    data.append('work_link1', formData.worklink1);
    data.append('street', formData.street);
    data.append('street_number', formData.number);
    data.append('postal_code', formData.postalCode);
    data.append('province_id', currentProvinceSelected.id);
    data.append('municipality_id', currentMunicipalitySelected.id);
    data.append("user_type", "professional")
    if (selectedImage) {
      data.append('profile_pic', selectedImage.file);
    }
    documentation.map((file) => {
      data.append("registration_docs[]", file)
    })

    formData.worklink2 && data.append('work_link2', formData.worklink2);
    formData.worklink3 && data.append('work_link3', formData.worklink3);



    const response = await signUpProfessionalAndCompany(data);
    if (!response) {
      setError("Please check your credentials again.");
      setLoading(false);
      setShowErrorModel(true);
    } else {
      setShowSuccessModel(true);

    }
    setLoading(false);

    // Set user as logged in (you can replace this with actual login logic)
    // setIsUserLoggedIn(true);
  };



  return (
    <section className="relative px-3 md:p-0">
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
                    <Link target="_blank"
                      rel="noopener noreferrer" to="/terms-and-conditions">
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
                    Upload Image
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
                <div>
                  <label
                    htmlFor="legalName"
                    className="flex items-end gap-1 text-sm font-normal text-gray-500"
                  >

                    <span> Legal Name <span className="text-red-500">*</span> </span> <Info title={"Enter your full name."} />
                  </label>

                  <input
                    type="text"
                    id="legalName"
                    value={formData.legalName}
                    name="legalName"
                    onChange={handleChange}
                    placeholder="Enter Legal Name"
                    className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cocNumber"
                    className="block text-sm font-normal text-gray-500"
                  >
                    COC Number <span className="text-red-500">*</span> 
                  </label>
                  <input
                    type="text"
                    id="cocNumber"
                    value={formData.cocNumber}
                    name="cocNumber"
                    onChange={handleChange}
                    placeholder="Enter COC Number"
                    className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="vatNumber"
                    className="block text-sm font-normal text-gray-500"
                  >
                    VAT Number <span className="text-red-500">*</span> 
                  </label>
                  <input
                    type="text"
                    id="vatNumber"
                    value={formData.vatNumber}
                    name="vatNumber"
                    onChange={handleChange}
                    placeholder="Enter VAT Number"
                    className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="flex items-end gap-1 text-sm font-normal text-gray-500"
                  >

                    <span> Address  <span className="text-red-500">*</span> </span> <Info title={"Enter your full address."} />
                  </label>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                    <div className="w-full ">
                      <input
                        type="text"
                        value={formData.street}
                        name="street"
                        onChange={handleChange}
                        placeholder="Enter Street"
                        className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                      />
                    </div>
                    <div className="w-full ">
                      <input
                        type="text"
                        value={formData.number}
                        name="number"
                        onChange={handleChange}
                        placeholder="Enter Number"
                        className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                      />
                    </div>
                    <div className="w-full ">
                      <input
                        type="text"
                        value={formData.postalCode}
                        name="postalCode"
                        onChange={handleChange}
                        placeholder="Enter Postal Code"
                        className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                      />
                    </div>
                    <div className="w-full ">
                      <div className="w-full">
                        <Select
                          options={provinceOptions}
                          placeholder={"Select Province"}

                          selectedOption={currentProvinceSelected}
                          handelChange={(event) => {
                            if (event.value !== "selectProvince" && event.id != "loading") {
                              console.log("Province", event);
                              setCurrentProvinceSelected(event);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full ">
                      <div className="w-full">
                        <Select
                          options={municipalityOptions}
                          placeholder={"Select Municipality"}
                          selectedOption={currentMunicipalitySelected}
                          handelChange={(event) => {
                            if (event.value !== "selectMunicipality" && event.id != "loading") {
                              console.log("Municipality", event);
                              setCurrentMunicipalitySelected(event);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    // htmlFor="documentation"
                    className="items-center inline-block gap-1 text-sm font-normal text-gray-500"
                    style={{ whiteSpace: 'wrap', }}
                  >
                    <span>
                      Provide documentation for the registration in the chamber of e-commerce <span className="text-red-500">*</span> 
                    </span>
                    <span className="ps-1" style={{ display: "inline-block", marginTop: "4px", position: "absolute", }} >
                      <Info pb={"pb-0"} title={"Please enter your doc in pdf format."} />
                    </span>
                  </label>
                  <div>
                    <div
                      onClick={handleDocUploadClick}
                      className="right-0 z-50 flex items-center justify-center px-6 py-4 mt-2 bg-gray-200 rounded-md shadow-md cursor-pointer bottom-3 w-min h-min"
                    >
                      <FaUpload
                        size={18}
                        className="text-gray-400 cursor-pointer"
                      />
                    </div>
                    <input
                      type="file"
                      id="documentation"
                      ref={docInputRef}
                      accept=".pdf"
                      onChange={handleDocumentFileChange}
                      className="hidden"
                    />
                  </div>
                  <div className="flex flex-col mt-3 space-y-2">
                    {documentation.map((doc, index) => {
                      console.log(doc)
                      return (
                        <div
                          className="relative flex flex-row items-center justify-center w-full px-3 py-2 rounded-md bg-gray-50"
                          key={index}
                        >
                          <a
                            href={doc.path} // Replace 'doc.url' with the actual URL of the document
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[97%] line-clamp-1 m-0 cursor-pointer "
                          >
                            {doc.name}
                          </a>
                          <button
                            className=" top-1 right-1 px-0.5  py-[1px] ms-3 rounded-full  "
                            onClick={() => removeDocument(index)}
                          >
                            <IoClose className="text-gray-500" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="pastWork1"
                    className="flex items-end gap-1 text-sm font-normal text-gray-500"
                  >
                    <span>Provide examples of past work</span> <span className="text-red-500">*</span>  <Info title={"Please enter your previous work."} />
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="pastWork1"
                      value={formData.worklink1}
                      name="worklink1"
                      onChange={handleChange}
                      placeholder="Work Link"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                </div>
                <div>

                  <div className="relative">
                    <input
                      type="text"
                      id="worklink2"
                      value={formData.worklink2}
                      name="worklink2"
                      onChange={handleChange}
                      placeholder="Work Link"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                </div>
                <div>

                  <div className="relative">
                    <input
                      type="text"
                      id="pastWork3"
                      value={formData.worklink3}
                      name="worklink3"
                      onChange={handleChange}
                      placeholder="Work Link"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contactPerson"
                    className="block text-sm font-normal text-gray-500"
                  >
                    Contact Person <span className="text-red-500">*</span> 
                  </label>
                  <div className="flex flex-col space-y-5 md:space-x-2 md:space-y-0 md:flex-row">
                    <div className="w-full md:w-1/2">
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
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        name="lastName"
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                        className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-normal text-gray-500"
                  >
                    Gender <span className="text-red-500">*</span> 
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
                    Contact Number <span className="text-red-500">*</span> 
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
                    Email <span className="text-red-500">*</span> 
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
                    Password <span className="text-red-500">*</span> 
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      name="password"
                      onChange={handleChange}
                      placeholder="Enter Password"
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
                    Repeat Password <span className="text-red-500">*</span> 
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
                    <Link target="_blank"
                      rel="noopener noreferrer" to="/terms-and-conditions">
                      <span className="text-black underline">
                        "Terms & conditions"
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
        <SuccessPopUp to={"/"} title={"Thank you for registration. Please verify your email first."} showModel={showSuccessModel} setShowModel={setShowSuccessModel} />

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

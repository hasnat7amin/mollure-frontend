
import React, { useState, useRef, useEffect } from "react";

import { IoFolder, IoClose } from "react-icons/io5";


import TitleBar from "../../../components/titleBar";
import { BsCamera } from "react-icons/bs";
import { FaUpload, FaFolderClosed } from "react-icons/fa";
import { FcDocument } from "react-icons/fc";
import { MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import hideEye from "../../../images/auth/hide_eye.svg";
import eye from "../../../images/auth/eye.svg";
import edit from "../../../images/professional/edit.svg";
import Select from "../../../components/select";
import CustomDatePicker from "../../../components/custom_date_picker";
import { baseUrl, imageUrl } from "../../../apis/base_url";
import ErrorPopUp from "../../../components/error_popup";
import spinner from "../../../images/spinner.svg";
import { useIndividualClientContext } from "../../../contexts/IndividualClientContext";
import { useAuthContext } from "../../../contexts/AuthContextProvider";

export default function IndividualClientProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRestPassword, setRestShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUpdateButtonVisible, setUpdateButtonVisibility] = useState(false);
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
  const temp = genderOptions.find((ext) => ext.value);

  const [currentGenderSelected, setCurrentGenderSelected] = useState(null);
  const [currentNameForRating, setCurrentNameForRating] = useState(
    null
  );
  const [selectedDate, setSelectedDate] = useState("");

  const [formData, setFormData] = useState({
    legalName: '',
    cocNumber: '',
    vatNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    contactNumber: '',
    contactPerson: "",
    email: '',
    street: '',
    number: '',
    dob: '',
    worklink1: '',
    worklink2: '',
    worklink3: '',
    password: '',
    repeatPassword: '',
    acceptTerms: false,
    subscribeToBlog: false,
  });
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorModel, setShowErrorModel] = useState(false)
  const {
    clientInfo,
    getClientInfo,
    editClientInfo,
  } = useIndividualClientContext();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDateChange = date => {
    console.log(date)
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

  const toggleUpdateButtonVisibility = () => {
    setUpdateButtonVisibility(!isUpdateButtonVisible);
  };


  const fetchClientInfo = async () => {
    await getClientInfo(token)
  }

  const setClientInfoValues = async () => {
    console.log(" user Info: ", clientInfo)
    clientInfo && clientInfo.client && setFormData({

      profileImage: clientInfo.client.profile_pic ? imageUrl + clientInfo.client.profile_pic : null,
      firstName: clientInfo.client.first_name ? clientInfo.client.first_name : "",
      lastName: clientInfo.client.last_name ? clientInfo.client.last_name : "",
      contactNumber: clientInfo.client.contact_number ? clientInfo.client.contact_number : "",
      contactPerson: clientInfo.client.contact_person ? clientInfo.client.contact_person : "",
      dob: clientInfo.client.dob ? clientInfo.client.dob : "",
      email: clientInfo.email ? clientInfo.email : "",
      // email: clientInfo.email ? clientInfo.email : "",
      subscribeToBlog: clientInfo.subscribe_to_newsletter===1?true:false
    })

    // clientInfo  && setFormData({
    //   ...formData,

    // })

    if (clientInfo && clientInfo.client && clientInfo.client.first_name != "" && clientInfo.client.last_name != "") {
      setNameOptions([
        { id: "suggestion1", label: `${clientInfo.client.first_name}${clientInfo.client.last_name}`, value: `${clientInfo.client.first_name} ${clientInfo.client.last_name}` },
        { id: "suggestion2", label: `${clientInfo.client.first_name}`, value: `${clientInfo.client.first_name}` },
        { id: "suggestion3", label: `${clientInfo.client.first_name[0]}${clientInfo.client.last_name[0]}`, value: `${clientInfo.client.first_name[0]} ${clientInfo.client.last_name[0]}` },
      ])
    }

    clientInfo && clientInfo.client &&
      setSelectedDate(clientInfo.client.dob ? new Date(clientInfo.client.dob) : "")

    clientInfo && clientInfo.client && setCurrentGenderSelected(
      clientInfo.client.gender ? genderOptions ? genderOptions.find(item => item.label == clientInfo.client.gender) : null : null
    )

    clientInfo && clientInfo.client && setCurrentNameForRating(
      clientInfo.client.name_for_rating ? { id: "name", label: clientInfo.client.name_for_rating, value: clientInfo.client.name_for_rating } : null
    )
  }

  const handleUpdate = async () => {
    setError('');

    setLoading(true);
    const {

      firstName,
      lastName,
      contactNumber,
      email,
      dob,
      password,
      repeatPassword,
    } = formData;

    if (password !== repeatPassword) {
      setError('Password and reperat password should be same.');
      setLoading(false);
      setShowErrorModel(true);
      return;
    }

    const data = new FormData();
    if (
      formData.firstName
    ) {
      data.append('first_name', formData.firstName);
    }
    if (
      selectedImage
    ) {
      data.append('profile_pic', selectedImage.file);
    }
    if (
      currentGenderSelected
    ) {
      data.append('gender', currentGenderSelected.label);
    }
    if (
      firstName
    ) {
      data.append('first_name', formData.firstName);

    }
    if (
      lastName
    ) {
      data.append('last_name', formData.lastName);
    }
    if (
      contactNumber
    ) {
      data.append('contact_number', formData.contactNumber);

    }
    if (
      email
    ) {
      data.append('email', formData.email);
    }

    if (
      password && repeatPassword && password == repeatPassword
    ) {
      data.append('password', formData.password);
    }

    if (
      currentNameForRating
    ) {
      data.append('name_for_rating', currentNameForRating.value);
    }

    if (
      dob
    ) {
      data.append('dob', dob);
    }
    data.append('subscribe_to_newsletter', formData.subscribeToBlog?1:0);





    const response = await editClientInfo(token, clientInfo.id, data);
    if (!response) {
      setError("Please check your credentials again.");
    } else {
      setUpdateButtonVisibility(false)
    }
    setLoading(false);

    // Set user as logged in (you can replace this with actual login logic)
    // setIsUserLoggedIn(true);
  };

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


  useEffect(() => {
    fetchClientInfo();
  }, [])

  useEffect(() => {
    setClientInfoValues();
  }, [clientInfo])

  return (
    <section className="relative px-3 md:p-0">
      <div className="w-full ">
        <div className="pt-px">
          <TitleBar title="User Information" />
        </div>
        <main className="w-full pb-10">
          <div className="relative flex items-start justify-center w-full h-full">
            {/* Signup form */}
            <div className="w-full md:w-[32rem] border rounded-3xl my-10 md:mt-20 shadow-md md:p-3  bg-white z-30">
              <div className=" w-full p-3 space-y-2.5">
                <div>
                  <h2 className="text-[28px] mb-2 font-semibold">User Info</h2>

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
                      <>
                        {
                          formData.profileImage && formData.profileImage ?
                            <>
                              {" "}
                              <img
                                src={formData.profileImage}
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
                            </> : <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-full shadow-md">
                              <BsCamera
                                size={24}
                                className="text-gray-500 cursor-pointer"
                                onClick={handleImageUploadClick}
                              />
                            </div>
                        }
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    id="image"
                    ref={fileInputRef}
                    accept="image/*"
                    disabled={!isUpdateButtonVisible}

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
                      name="firstName"
                      disabled={!isUpdateButtonVisible}
                      value={formData.firstName}
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
                      name="lastName"
                      disabled={!isUpdateButtonVisible}
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter Last Name"
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
                      disabled={!isUpdateButtonVisible}
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
                    disabled={!isUpdateButtonVisible}

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
                      placeholder={"Select Gender"}
                      //className="flex-1"
                      disabled={!isUpdateButtonVisible}

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
                    disabled={!isUpdateButtonVisible}
                    value={formData.contactNumber}
                    onChange={handleChange}
                    name="contactNumber"
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
                    disabled
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="Enter Email"
                    className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    disabled={!isUpdateButtonVisible}
                    type="checkbox"
                    id="subscribeToBlog"
                    checked={formData.subscribeToBlog}
                    name="subscribeToBlog"
                    onChange={handleChange}
                    className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="subscribeToBlog"
                    className="text-sm font-normal text-gray-500 cursor-pointer ms-2"
                  >
                    Subscribe to Blog
                  </label>
                </div>


                <button
                  // style={{ display: isUpdateButtonVisible ? "block" : "none" }}
                  disabled={loading} onClick={handleUpdate} className={`${loading ? "bg-gray-100 " : "bg-customGreen"} ${isUpdateButtonVisible ? "flex items-center justify-center" : "hidden"} text-white mt-4 w-full py-3  my-2   rounded-md text-base  font-medium`} >
                  {
                    loading ?
                      <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Update"
                  }
                </button>
              </div>
            </div>
            {/* edit image */}
            <img
              src={edit}
              alt="Edit"
              className="absolute top-0 right-0 my-10 cursor-pointer md:mt-20"
              onClick={toggleUpdateButtonVisibility}
            />
          </div>
        </main>
        {/* error popup */}
        <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />

      </div>
    </section>
  );
}

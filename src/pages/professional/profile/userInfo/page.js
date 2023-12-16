
import React, { useState, useRef, useEffect } from "react";

import { IoFolder, IoClose } from "react-icons/io5";
import spinner from "../../../../images/spinner.svg";


import TitleBar from "../../../../components/titleBar";
import { BsCamera } from "react-icons/bs";
import { FaUpload, FaFolderClosed } from "react-icons/fa";
import { FcDocument } from "react-icons/fc";
import { MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import hideEye from "../../../../images/auth/hide_eye.svg";
import eye from "../../../../images/auth/eye.svg";
import edit from "../../../../images/professional/edit.svg";
import Select from "../../../../components/select";
import Info from "../../../../components/info";
import { useAuthContext } from "../../../../contexts/AuthContextProvider";
import { useProvinceContext } from "../../../../contexts/ProvincesContextProvider";
import { useMunicipalityContext } from "../../../../contexts/MunicipalityContextProvider";
import { useProfessionalContext } from "../../../../contexts/ProfessionalContextProvider";
import { baseUrl, imageUrl } from "../../../../apis/base_url";
import ErrorPopUp from "../../../../components/error_popup";
import SuccessPopUp from "../../../../components/success_popup";

export default function UserInfo() {
  const {
    userInfo,
    getUserInfo, editUserInfo } = useProfessionalContext();
  const { token } = useAuthContext();
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
  const [isUpdateButtonVisible, setUpdateButtonVisibility] = useState(false);
  const [showSuccessModel, setShowSuccessModel] = useState(false)

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

  const [formData, setFormData] = useState({
    profileImage: null,
    documents: null,
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


  const toggleUpdateButtonVisibility = () => {
    setUpdateButtonVisibility(!isUpdateButtonVisible);
  };

  const fetchUserInfo = async () => {
    await getUserInfo(token)
  }

  const setUserInfoValues = async () => {
    console.log(" user Info: ", userInfo)
    userInfo && userInfo.professional && setFormData({
      profileImage: userInfo.professional.profile_pic ? imageUrl + userInfo.professional.profile_pic : null,
      documents: userInfo.professional_docs ? userInfo.professional_docs : null,
      legalName: userInfo.professional.legal_name ? userInfo.professional.legal_name : "",
      cocNumber: userInfo.professional.coc ? userInfo.professional.coc : "",
      vatNumber: userInfo.professional.vat ? userInfo.professional.vat : "",
      firstName: userInfo.professional.first_name ? userInfo.professional.first_name : "",
      lastName: userInfo.professional.last_name ? userInfo.professional.last_name : "",
      address: userInfo.professional.address ? userInfo.professional.address : "",
      contactNumber: userInfo.professional.contact_number ? userInfo.professional.contact_number : "",
      email: userInfo.email ? userInfo.email : "",
      subscribeToBlog: userInfo.subscribe_to_newsletter === 1 ? true : false,
      street: userInfo.professional.street ? userInfo.professional.street : "",
      number: userInfo.professional.street_number ? userInfo.professional.street_number : "",
      postalCode: userInfo.professional.postal_code ? userInfo.professional.postal_code : "",
      worklink1: userInfo.professional.work_link1 ? userInfo.professional.work_link1 : "",
      worklink2: userInfo.professional.work_link2 ? userInfo.professional.work_link2 : "",
      worklink3: userInfo.professional.work_link3 ? userInfo.professional.work_link3 : "",
    })



    userInfo && userInfo.professional && setCurrentProvinceSelected(
      userInfo.professional.province_id ? provinceOptions ? provinceOptions.find(item => item.id == userInfo.professional.province_id) : null : null
    )

    userInfo && userInfo.professional && userInfo.professional.province_id && setCurrentMunicipalitySelected(
      userInfo.professional.municipality_id ? municipalityOptions ? municipalityOptions.find(item => item.id == userInfo.professional.municipality_id
      ) : null : null
    )


    userInfo && userInfo.professional && setCurrentGenderSelected(
      userInfo.professional.gender ? genderOptions ? genderOptions.find(item => item.value == userInfo.professional.gender) : null : null
    )


  }

  const getProvinces = async () => {
    await getAllProvinces();
  }

  const setProvinces = async () => {
    if (provinces && (provinces !== null || provinces != [])) {
      setProvinceOptions(
        provinces?.map((item) => (
          { id: item.id, value: item.name, label: item.name }
        ))
      )
    }
    // if (provinces == []) {
    //   setProvinceOptions(
    //     { id: "loading", value: "No Provinces Found", label: "No Provinces Found" }

    //   )
    // }
  }

  const setMunicipalities = async () => {
    if (municipalities && (municipalities !== null || municipalities != [])) {
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

  const handleUpdate = async () => {
    setError('');

    setLoading(true);
    const {

      firstName,
      lastName,
      contactNumber,
      email,
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
      formData.legalName
    ) {
      data.append('legal_name', formData.legalName);
    }
    if (
      selectedImage
    ) {
      data.append('profile_pic', selectedImage.file);
    }
    if (
      currentGenderSelected
    ) {
      data.append('gender', currentGenderSelected.value);
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
      currentMunicipalitySelected
    ) {
      data.append('municipality_id', currentMunicipalitySelected.id);
    }
    if (
      currentProvinceSelected
    ) {
      data.append('province_id', currentProvinceSelected.id);
    }
    data.append('subscribe_to_newsletter', formData.subscribeToBlog ? 1 : 0);




    const response = await editUserInfo(token, userInfo.id, data);
    if (!response) {
      setError("Please check your credentials again.");
      setUpdateButtonVisibility(false)
      setShowErrorModel(true);
      setLoading(false);

      return
    } else {
      setUpdateButtonVisibility(false)
      setShowSuccessModel(true);
    }
    setLoading(false);

    // Set user as logged in (you can replace this with actual login logic)
    // setIsUserLoggedIn(true);
  };



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

  useEffect(() => {
    fetchUserInfo();
  }, [])

  useEffect(() => {
    console.log("updating user datat")
    setUserInfoValues();
    console.log("updating", formData)
  }, [userInfo, municipalityOptions, provinceOptions])



  return (
    <section className="relative px-3 md:p-0">
      <div className="w-full ">
        <main className="w-full pb-10">
          <div className="relative flex flex-col-reverse items-start justify-center w-full h-full md:flex-row ">
            {/* Signup form */}
            <div className="w-full md:w-[32rem] border rounded-3xl my-10 md:mt-20 shadow-md md:p-3  bg-white z-30">
              <div className=" w-full p-3 space-y-2.5">
                <div>
                  <h2 className="text-[28px] mb-2 font-semibold">
                    User Profile
                  </h2>
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
                    disabled={!isUpdateButtonVisible}
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

                    <span> Legal Name </span> <Info title={"Enter your full name."} />
                  </label>

                  <input
                    type="text"
                    id="legalName"
                    disabled
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
                    COC Number
                  </label>
                  <input
                    type="text"
                    id="cocNumber"
                    disabled
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
                    VAT Number
                  </label>
                  <input
                    type="text"
                    id="vatNumber"
                    disabled
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

                    <span> Address </span> <Info title={"Enter your full address."} />
                  </label>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                    <div className="w-full ">
                      <input
                        type="text"
                        value={formData.street}
                        name="street"
                        disabled
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
                        disabled
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
                        disabled
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
                          disabled={true}
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
                          disabled={true}
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
                    className="inline-block   items-center gap-1 text-sm font-normal text-gray-500"
                    style={{ whiteSpace: 'wrap', }}
                  >
                    <span>
                      Provide documentation for the registration in the chamber of e-commerce
                    </span>
                    <span className="ps-1" style={{ display: "inline-block", marginTop: "4px", position: "absolute", }} >
                      <Info pb={"pb-0"} title={"Please enter your doc in pdf format."} />
                    </span>
                  </label>

                  <div className="flex flex-col mt-3 space-y-2">
                    {formData && formData.documents && formData.documents.map((doc, index) => {
                      console.log(doc)
                      return (
                        <div
                          className="relative flex flex-row items-center justify-center w-full px-3 py-2 rounded-md bg-gray-50"
                          key={index}
                        >
                          <a
                            href={imageUrl + doc.doc} // Replace 'doc.url' with the actual URL of the document
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[97%] line-clamp-1 m-0 cursor-pointer underline"
                          >
                            {doc.doc}
                          </a>
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
                    <span>Provide examples of past work</span> <Info title={"Please enter your previous work."} />
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="pastWork1"
                      disabled={true}
                      value={formData.worklink1}
                      name="worklink1"
                      onChange={handleChange}
                      placeholder="Work Link"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="pastWork2"
                    className="block text-sm font-normal text-gray-500"
                  >
                    Work Link 2
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="worklink2"
                      disabled={true}
                      value={formData.worklink2}
                      name="worklink2"
                      onChange={handleChange}
                      placeholder="Work Link"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="pastWork3"
                    className="block text-sm font-normal text-gray-500"
                  >
                    Work Link 3
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="pastWork3"
                      disabled={true}
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
                    Contact Person
                  </label>
                  <div className="flex flex-col space-y-5 md:space-x-2 md:space-y-0 md:flex-row">
                    <div className="w-full md:w-1/2">
                      <input
                        type="text"
                        id="firstName"
                        disabled={!isUpdateButtonVisible}
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
                        disabled={!isUpdateButtonVisible}
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
                    Gender
                  </label>
                  <div className="w-full">
                    <Select
                      //className="flex-1"

                      placeholder={"Select Gender"}
                      options={genderOptions}
                      disabled={!isUpdateButtonVisible}
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
                    disabled
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
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
          </div>
          {/* edit image */}
          <img
            src={edit}
            alt="Edit"
            className="my-2 cursor-pointer md:top-0 md:right-0 md:absolute md:mt-20"
            onClick={toggleUpdateButtonVisibility}
          />
        </main>
        {/* error popup */}
        <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />
        {/* success popup */}
        <SuccessPopUp  title={"Congratulation! Your data uploaded successfully."} showModel={showSuccessModel} setShowModel={setShowSuccessModel} />

      </div >
    </section >
  );
}

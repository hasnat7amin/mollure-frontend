
import { BsCamera } from "react-icons/bs";
import uploadIcon from "../../../../../images/professional/upload_icon.svg";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SuccessPopUp from "../../../../../components/success_popup";
import { useProfessionalContext } from "../../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../../contexts/AuthContextProvider";
import { imageUrl } from "../../../../../apis/base_url";
import spinner from "../../../../../images/spinner.svg";
import ErrorPopUp from "../../../../../components/error_popup";

export default function EditProfile({
  showEditProfieModel,
  setShowEditProfieModel,
  id = 1,
  type = "fixed"
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)
  const [showErrorPopUp, setShowErrorPopUp] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorModel, setShowErrorModel] = useState(false)

  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    profileImage: null,
    name: '',
    description: '',
    key1: '',
    key2: '',
    key3: '',
  });

  const {
    templateBio,
    getTemplateBio,
    updateTemplateBio
  } = useProfessionalContext();
  const { token } = useAuthContext();


  useEffect(() => {
    setProfileTemplateValues();
  }, [])

  useEffect(() => {
    setProfileTemplateValues();
  }, [showEditProfieModel,id,type])

  const setProfileTemplateValues = async () => {

    templateBio && setFormData({

      profileImage: templateBio.profile_picture ? imageUrl + templateBio.profile_picture : null,
      name: templateBio.bio_name ? templateBio.bio_name : "",
      description: templateBio.Bio_description ? templateBio.Bio_description : "",
      key1: templateBio.key1 ? templateBio.key1 : "",
      key2: templateBio.key2 ? templateBio.key2 : "",
      key3: templateBio.key3 ? templateBio.key3 : "",
    })



  }


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setSelectedImage({ file: file, base64: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    setError('');

    setLoading(true);
    const {
      name,
      description,
      key1,
      key2,
      key3,

    } = formData;



    const data = new FormData();
    if (
      formData.name
    ) {
      data.append('bio_name', formData.name);
    }
    if (
      selectedImage && selectedImage.file
    ) {
      data.append('profile_picture', selectedImage.file);
    }
    if (
      description
    ) {
      data.append('Bio_description', description);
    }
    if (
      key1
    ) {
      data.append('key1', key1);

    }
    if (
      key2
    ) {
      data.append('key2', key2);

    }
    if (
      key3
    ) {
      data.append('key3', key3);

    }

    data.append('type', type);
    data.append('template_id', id);



    const response = await updateTemplateBio(token, data, id);
    if (!response) {
      setError("Please check your credentials again.");
      setLoading(false);
      setShowErrorModel(true);
    }
    else {
      setShowEditProfieModel(false)
      setShowSuccessPopUp(true)
    }

    setLoading(false);


  };


  return (
    <div>
      {showEditProfieModel &&
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setShowEditProfieModel(false)}
            className="fixed inset-0 bg-black opacity-[66%]"
          />
          <div className="relative z-50 md:w-auto w-[95%] md:min-w-[28rem] mx-auto my-6">
            <div className="relative px-2 py-4 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col items-start gap-2 px-5 rounded-t">
                <h3 className="w-full text-lg font-bold text-center text-softblue">
                  Edit Profile
                </h3>
              </div>
              <div className="px-5 pt-9">
                <form>
                  {/* image */}
                  <div>
                    <div
                      className={
                        selectedImage
                          ? "relative w-max mx-auto "
                          : "relative w-max mx-auto text-gray-500  rounded-full"
                      }
                    >
                      {selectedImage
                        ? <div>
                          <img
                            src={selectedImage.base64}
                            alt="Selected"
                            width={100}
                            height={100}
                            className="object-cover rounded-full shadow-md w-28 h-28"
                          />
                          <div className="absolute bottom-0 right-0 z-50 flex items-center justify-center p-2 bg-white rounded-full shadow-md w-min h-min">
                            <BsCamera
                              size={28}
                              className="text-gray-500 cursor-pointer"
                              onClick={handleImageUploadClick}
                            />
                          </div>
                        </div>
                        : <>
                          {
                            formData.profileImage && formData.profileImage ?
                              <>
                                {" "}
                                <img
                                  src={formData.profileImage}
                                  alt="Selected"
                                  width={100}
                                  height={100}
                                  className="object-cover w-40 h-40 rounded-full shadow-md"
                                />
                                <div className="absolute right-0 z-50 flex items-center justify-center p-2 bg-white rounded-full shadow-md bottom-3 w-min h-min">
                                  <BsCamera
                                    size={28}
                                    className="text-gray-500 cursor-pointer"
                                    onClick={handleImageUploadClick}
                                  />
                                </div>
                              </> : <div className="flex items-center justify-center py-8 bg-gray-300 rounded-full shadow-md px-7">
                                <img
                                  src={uploadIcon}
                                  className="text-gray-500 cursor-pointer"
                                  onClick={handleImageUploadClick}
                                />
                              </div>
                          }
                        </>}
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

                  {/* name */}
                  <div className="mt-2">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>

                  {/* bio */}
                  <div>
                    <textarea
                      type="text"
                      id="bio"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Bio"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                  {/* Keyword 1 */}
                  <div>
                    <input
                      type="text"
                      id="legalName"
                      name="key1"
                      value={formData.key1}
                      onChange={handleChange}
                      placeholder="Keyword 1"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                  {/* Keyword 2 */}
                  <div>
                    <input
                      type="text"
                      id="legalName"
                      name="key2"
                      value={formData.key2}
                      onChange={handleChange}
                      placeholder="Keyword 2"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                  {/* Keyword 3 */}
                  <div>
                    <input
                      type="text"
                      id="legalName"
                      name="key3"
                      value={formData.key3}
                      onChange={handleChange}
                      placeholder="Keyword 3"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>

                  <button disabled={loading} onClick={handleUpdate} className={`${loading ? "bg-gray-100  flex items-center justify-center" : "bg-customGreen"} text-white mt-4 w-full py-3  mb-4  rounded-md text-base font-medium`} >
                  {
                    loading ?
                      <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Save"
                  }
                </button>
                  <SuccessPopUp title={"Your Data is Updated Successfully."} showModel={showSuccessPopUp} setShowModel={setShowSuccessPopUp} />
                  {/* error popup */}
                  <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />

                </form>
              </div>
              <AiOutlineClose onClick={() => setShowEditProfieModel(false)} className="absolute cursor-pointer top-5 right-5" />
            </div>
          </div>
        </div>}
    </div>
  );
}

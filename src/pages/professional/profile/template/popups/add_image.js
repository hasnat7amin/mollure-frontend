
import { BsCamera } from "react-icons/bs";
import uploadIcon from "../../../../../images/professional/upload_icon.svg";
import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SuccessPopUp from "../../../../../components/success_popup";
import ErrorPopUp from "../../../../../components/error_popup";
import spinner from "../../../../../images/spinner.svg";
import { useProfessionalContext } from "../../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../../contexts/AuthContextProvider";


export default function AddImage({ showModel, setShowModel, id, type }) {
  const [selectedImage, setSelectedImage] = useState([]);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)
  const [showErrorModel, setShowErrorModel] = useState(false)

  const { addVisuals } = useProfessionalContext();
  const { token } = useAuthContext();

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = e => {
    const files = e.target.files;
    setSelectedImage([...files]);
  };

  const handleSubmit = async () => {

    setError('');

    setLoading(true);

    if (selectedImage.length === 0) {
      setError("Please upload the image.");
      setLoading(false);
      setShowErrorModel(true);
      return;
    }

    const data = new FormData();

    // data.append('template_id', id);
    console.log(selectedImage)

    let imagesList = [];
   
    selectedImage&&selectedImage.length > 0 && selectedImage.map(file => {
      data.append('images[]', file);
    })


    const response = await addVisuals(token, id, data);
    if (!response) {
      setError("Please check your credentials again.");
      setLoading(false);
      setShowErrorModel(true);
      return
    }
    else {
      
      setSelectedImage([])
      setLoading(false);
      setShowSuccessPopUp(true)
      return
    }

    setLoading(false);


  };


  return (
    <div>
      {showModel &&
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setShowModel(false)}
            className="fixed inset-0 bg-black opacity-[66%]"
          />
          <div className="relative z-50 md:w-auto w-[95%] md:min-w-[28rem] mx-auto my-6">
            <div className="relative px-2 py-4 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col items-start gap-2 px-5 rounded-t">
                <h3 className="w-full text-lg font-bold text-center text-softblue">
                  Add Image
                </h3>
              </div>
              <div className="px-5 pt-9">
                <div>
                  {/* image */}
                  <div>
                    <div
                      className={
                        selectedImage
                          ? "relative w-max mx-auto "
                          : "relative w-max mx-auto text-gray-500  rounded-full"
                      }
                    >
                      <div className="flex items-center justify-center py-8 bg-gray-300 rounded-full shadow-md px-7">
                        <img
                          src={uploadIcon}
                          className="text-gray-500 cursor-pointer"
                          onClick={handleImageUploadClick}
                        />
                      </div>
                    </div>
                    {selectedImage.length > 0 ?
                      <div className="flex items-center justify-center pt-4 text-base font-normal text-gray-500" >{`${selectedImage.length} Images Selected`}</div> :
                      <div className="flex items-center justify-center pt-4 text-base font-normal " ><p className="text-center"> <span onClick={handleImageUploadClick} className="font-semibold underline cursor-pointer ">Browse Your Visual Here</span>.</p> </div>
                    }
                    <input
                      type="file"
                      id="image"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      multiple={true}
                      onChange={handleImageChange}
                    />
                  </div>

                  <button disabled={loading} onClick={handleSubmit} className={`${loading ? "bg-gray-100 flex items-center justify-center" : "bg-customGreen"} text-white w-full py-3 mt-4  mb-4  rounded-md text-base font-medium`} >
                    {
                      loading ?
                        <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Save"
                    }
                  </button>
                </div>
              </div>
              <AiOutlineClose
                onClick={() => setShowModel(false)}
                className="absolute cursor-pointer top-5 right-5"
              />
            </div>
          </div>
        </div>}

      <SuccessPopUp closeAction={()=>setShowModel(false)} title={"Image added Successfully."} showModel={showSuccessPopUp} setShowModel={setShowSuccessPopUp} />
      {/* error popup */}
      <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />

    </div>
  );
}

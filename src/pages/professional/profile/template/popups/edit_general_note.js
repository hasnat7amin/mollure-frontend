
import { BsCamera } from "react-icons/bs";
import uploadIcon from "../../../../../images/professional/upload_icon.svg";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Select from "../../../../../components/select";
import SuccessPopUp from "../../../../../components/success_popup";
import ErrorPopUp from "../../../../../components/error_popup";
import { useProfessionalContext } from "../../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../../contexts/AuthContextProvider";
import spinner from "../../../../../images/spinner.svg";

export default function EditGeneralNote({
  id,
  type,
  showModel,
  setShowModel
}) {
  const [Note, setNote] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)
  const [showErrorModel, setShowErrorModel] = useState(false)

  const {
    generalNote,
    getGeneralNote,
    updateGeneralNote
  } = useProfessionalContext();
  const { token } = useAuthContext();

  const fetchGeneralNoteDetails = async () => {
    await getGeneralNote(token, id)
  }

  useEffect(() => {
    fetchGeneralNoteDetails();
  }, [id])

  useEffect(() => {
    setNote(generalNote);
  }, [generalNote])


  const handleSubmit = async () => {
    setError('');

    setLoading(true);



    const data = new FormData();

    data.append('note', Note);
    data.append('template_id', id);




    const response = await updateGeneralNote(token,id, data);
    if (!response) {
      setError("Please check your credentials again.");
      setLoading(false);
      setShowErrorModel(true);
    }
    else {

      setLoading(false);
      setShowSuccessPopUp(true)

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
                  Edit General Note
                </h3>
              </div>
              <div className="px-5 pt-5">
                <form>

                  {/* Keyword 1 */}
                  <div>
                    <textarea
                      placeholder="Note"
                      value={Note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>


                  <button disabled={loading} onClick={handleSubmit} className={`${loading ? "bg-gray-100 flex items-center justify-center" : "bg-customGreen"} text-white w-full py-3 mt-4  mb-4  rounded-md text-base font-medium`} >
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
              <AiOutlineClose
                onClick={() => setShowModel(false)}
                className="absolute cursor-pointer top-5 right-5"
              />
            </div>
          </div>
        </div>}
    </div>
  );
}

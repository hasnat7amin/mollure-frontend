
import { BsCamera } from "react-icons/bs";
import uploadIcon from "../../../../../images/professional/upload_icon.svg";
import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Select from "../../../../../components/select";
import { useProfessionalContext } from "../../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../../contexts/AuthContextProvider";
import SuccessPopUp from "../../../../../components/success_popup";
import ErrorPopUp from "../../../../../components/error_popup";
import spinner from "../../../../../images/spinner.svg";

export default function FeatureTeamMember({ id,type, showModel, setShowModel }) {
  const [allChecked, setAllChecked] = useState(false);
  
  const {
    postTeamMemberOnPublicPage,
    updateServiceFor
  } = useProfessionalContext();

  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)
  const [showErrorModel, setShowErrorModel] = useState(false)
  
  const handleAllChange = (e) => {
    setAllChecked(e.target.checked);

  };

  const handleSubmit = async () => {
    setError('');

    setLoading(true);

    const data = {
      "team_member_on_public_page":allChecked
    };

   




    const response = await postTeamMemberOnPublicPage(token, id, JSON.stringify(data));
    if (!response) {
      setError("Please check your credentials again.");
      setLoading(false);
      setShowErrorModel(true);
    }
    else {
      // setShowModel(false);
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
                  Feature Team Member
                </h3>
              </div>
              <div className="px-5 pt-5">
                <div className="flex flex-col gap-2">
                  {/* only womens checkbox */}
                  <div className="flex items-center justify-between px-6">
                  <label
                      htmlFor="onlyWomen"
                      className="text-base font-normal cursor-pointer ms-2"
                    >
                      Feature Team member on public page
                    </label>
                    <input
                      type="checkbox"
                      id="onlyWomen"
                      checked={allChecked}
                      onChange={handleAllChange}
                      className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                    />
                  
                  </div>
                  
                  <button disabled={loading} onClick={handleSubmit} className={`${loading ? "bg-gray-100 flex items-center justify-center" : "bg-customGreen"} text-white w-full py-3 mt-4  mb-4  rounded-md text-base font-medium`} >
                    {
                      loading ?
                        <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Update"
                    }
                  </button>
                  <SuccessPopUp closeAction={()=>setShowModel(false)}  title={"Congratulation! Team Members are published successfully."} showModel={showSuccessPopUp} setShowModel={setShowSuccessPopUp} />
                  {/* error popup */}
                  <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />

                </div>
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

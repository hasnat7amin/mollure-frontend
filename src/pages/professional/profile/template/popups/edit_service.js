
import { BsCamera } from "react-icons/bs";
import uploadIcon from "../../../../../images/professional/upload_icon.svg";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Select from "../../../../../components/select";
import { useProfessionalContext } from "../../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../../contexts/AuthContextProvider";
import SuccessPopUp from "../../../../../components/success_popup";
import ErrorPopUp from "../../../../../components/error_popup";
import spinner from "../../../../../images/spinner.svg";

export default function EditService({ id, type, showModel, setShowModel }) {
  const [allChecked, setAllChecked] = useState(false);
  const [onlyWomenChecked, setOnlyWomenChecked] = useState(false);
  const [onlyMenChecked, setOnlyMenChecked] = useState(false);
  const [kidsChecked, setKidsChecked] = useState(false);
  const {
    serviceFor,
    getServiceFor,
    updateServiceFor
  } = useProfessionalContext();
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)
  const [showErrorModel, setShowErrorModel] = useState(false)
  const [successTitle, setSuccessTitle] = useState('')


  const handleAllChange = (e) => {
    setAllChecked(e.target.checked);

  };

  const handleOnlyWomenChange = (e) => {

    setOnlyWomenChecked(e.target.checked);
  };

  const handleOnlyMenChange = (e) => {

    setOnlyMenChecked(e.target.checked);
  };

  const handleKidsChange = (e) => {

    setKidsChecked(e.target.checked);
  };



  const fetchServiceForDetails = async () => {
    await getServiceFor(token, id)
  }

  const updateServiceForDetails = async () => {
    if (serviceFor) {
      setAllChecked(serviceFor.all_gender);
      setOnlyWomenChecked(serviceFor.women)
      setOnlyMenChecked(serviceFor.men)
      setKidsChecked(serviceFor.kids)
    }
  }


  useEffect(() => {
    fetchServiceForDetails();
  }, [id])

  useEffect(() => {
    updateServiceForDetails();
  }, [serviceFor])

  const handleSubmit = async () => {
    setError('');

    setLoading(true);

    if (!(allChecked || onlyMenChecked || onlyWomenChecked || kidsChecked)) {
      // Return an error or handle the lack of selection as needed
      setError('At least one field should be true.');
      // setError("Please check your credentials again.");
      setLoading(false);
      setShowErrorModel(true);
      return;
      // You can throw an error, return from the function, or handle the situation accordingly.
    }

    const data = new FormData();

    data.append('all_gender', allChecked ? 1 : 0);
    data.append('men', onlyMenChecked ? 1 : 0);
    data.append('women', onlyWomenChecked ? 1 : 0);
    data.append('kids', kidsChecked ? 1 : 0);
    data.append('type', type);
    data.append('template_id', id);





    const response = await updateServiceFor(token, id, data);
    if (!(response && response.success)) {
      setError("Please check your credentials again.");
      setLoading(false);
      setShowErrorModel(true);
    }
    else {
      setSuccessTitle(response.message);
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
          <div className="relative z-50 w-auto min-w-[22rem] mx-auto my-6">
            <div className="relative px-2 py-4 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col items-start gap-2 px-5 rounded-t">
                <h3 className="w-full text-lg font-bold text-center text-softblue">
                  Edit Services
                </h3>
              </div>
              <div className="pt-5 px-14">
                <div className="flex flex-col gap-2">
                  {/* only womens checkbox */}
                  <div className="flex items-center justify-between px-6">
                    <label
                      htmlFor="onlyWomen"
                      className="text-base font-normal cursor-pointer ms-2"
                    >
                      Women & Men
                    </label>
                    <input
                      type="checkbox"
                      id="onlyWomen"
                      checked={allChecked}
                      onChange={handleAllChange}
                      className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                    />

                  </div>
                  {/* only men checkbox */}
                  <div className="flex items-center justify-between px-6">
                    <label
                      htmlFor="onlyMen"
                      className="text-base font-normal cursor-pointer ms-2"
                    >
                      Only Womens
                    </label>
                    <input
                      type="checkbox"
                      id="onlyMen"
                      checked={onlyWomenChecked}
                      onChange={handleOnlyWomenChange}
                      className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                    />

                  </div>
                  {/* only kids checkbox */}
                  <div className="flex items-center justify-between px-6">
                    <label
                      htmlFor="onlyKids"
                      className="text-base font-normal cursor-pointer ms-2"
                    >
                      Only Mens
                    </label>
                    <input
                      type="checkbox"
                      checked={onlyMenChecked}
                      onChange={handleOnlyMenChange}
                      id="onlyKids"
                      className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                    />

                  </div>
                  {/* kids checkbox */}
                  <div className="flex items-center justify-between px-6">
                    <label
                      htmlFor="kids"
                      className="text-base font-normal cursor-pointer ms-2"
                    >
                      Kids
                    </label>
                    <input
                      type="checkbox"
                      id="kids"
                      checked={kidsChecked}
                      onChange={handleKidsChange}
                      className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                    />

                  </div>

                  <button disabled={loading} onClick={handleSubmit} className={`${loading ? "bg-gray-100 flex items-center justify-center" : "bg-customGreen"} text-white w-full py-3 mt-4  mb-4  rounded-md text-base font-medium`} >
                    {
                      loading ?
                        <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Update"
                    }
                  </button>
                  <SuccessPopUp closeAction={()=>setShowModel(false)}  title={successTitle} showModel={showSuccessPopUp} setShowModel={setShowSuccessPopUp} />
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

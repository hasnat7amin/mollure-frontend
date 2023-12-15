
import { BsCamera } from "react-icons/bs";
import uploadIcon from "../../../../../images/professional/upload_icon.svg";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Select from "../../../../../components/select";
import ErrorPopUp from "../../../../../components/error_popup";
import { useProvinceContext } from "../../../../../contexts/ProvincesContextProvider";
import { useMunicipalityContext } from "../../../../../contexts/MunicipalityContextProvider";
import spinner from "../../../../../images/spinner.svg";
import SuccessPopUp from "../../../../../components/success_popup";
import { useProfessionalContext } from "../../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../../contexts/AuthContextProvider";

export default function AddLocation({ showModel, setShowModel }) {
  const [provinceOptions, setProvinceOptions] = useState([
    { id: "loading", label: "Loading ...", value: "Loading ..." },
  ]);

  const [municipalityOptions, setMunicipalityOptions] = useState([
    { id: "loading", label: "Loading ...", value: "Loading ..." },
  ]);
  const [currentProvinceSelected, setCurrentProvinceSelected] = useState(
    null
  );

  const [currentMunicipalitySelected, setCurrentMunicipalitySelected] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)
  const [showErrorModel, setShowErrorModel] = useState(false)

  const { provinces,
    getAllProvinces, } = useProvinceContext();
  const { municipalities,
    getAllMunicipalities, } = useMunicipalityContext();
  const { updateFixedLocation } = useProfessionalContext();
  const { token } = useAuthContext();




  const [formData, setFormData] = useState({
    salonName: '',
    address: '',
    postalCode: '',

  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const getProvinces = async () => {
    await getAllProvinces();
  }

  const setProvinces = async () => {
    if (provinces && (provinces !== null || provinces != [])) {
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


  useEffect(() => {
    getProvinces();
  }, [])

  useEffect(() => {
    setProvinces();
  }, [provinces])


  useEffect(() => {
    getMunicipalities();
  }, [currentProvinceSelected])

  useEffect(() => {
    setMunicipalities();
  }, [municipalities])


  const handleSubmit = async () => {
    setError('');

    setLoading(true);
    const {
      salonName,
      address,
      postalCode,

    } = formData;



    const data = new FormData();
    if (
      formData.salonName
    ) {
      data.append('salon_name', formData.salonName);
    }
    if (
      address
    ) {
      data.append('address', address);
    }
    if (
      postalCode
    ) {
      data.append('postal_code', postalCode);
    }

    if (
      currentProvinceSelected
    ) {
      data.append('province_id', currentProvinceSelected.id);


    }
    if (
      currentMunicipalitySelected
    ) {
      data.append('municipality_id', currentMunicipalitySelected.id);


    }



    const response = await updateFixedLocation(token, data);
    if (!response) {
      setError("Please check your credentials again.");
      setLoading(false);
      setShowErrorModel(true);
      return 
    }
    else {
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
          <div className="relative z-50 w-auto md:w-auto w-[95%] md:min-w-[28rem] mx-auto my-6">
            <div className="relative px-2 py-4 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col items-start gap-2 px-5 rounded-t">
                <h3 className="w-full text-lg font-bold text-center text-softblue">
                  Add Location
                </h3>
              </div>
              <div className="px-5 pt-5">
                <form>
                  {/* name */}
                  <div className="mt-2">
                    <input
                      type="text"
                      value={formData.salonName}
                      name="salonName"
                      onChange={handleChange}
                      placeholder="Salon Name"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>

                  {/* bio */}
                  <div>
                    <input
                      type="text"
                      value={formData.address}
                      name="address"
                      onChange={handleChange}
                      placeholder="Street"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                  {/* Keyword 1 */}
                  <div>
                    <input
                      type="text"
                      value={formData.postalCode}
                      name="postalCode"
                      onChange={handleChange}
                      placeholder="Postal Code"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                  {/* Keyword 2 */}
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 ">
                    <div className="w-full ">
                      <div className="w-full">
                        <Select
                          options={provinceOptions}
                          placeholder={"Select a Province"}
                          selectedOption={currentProvinceSelected}
                          handelChange={event => {
                            if (event.value !== "selectProvince") {
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
                          placeholder={"Select a Municipality"}
                          selectedOption={currentMunicipalitySelected}
                          handelChange={event => {
                            if (event.value !== "selectMunicipality") {
                              console.log("Municipality", event);
                              setCurrentMunicipalitySelected(event);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <button disabled={loading} onClick={handleSubmit} className={`${loading ? "bg-gray-100 flex items-center justify-center" : "bg-customGreen"} text-white w-full py-3 mt-4  mb-4  rounded-md text-base font-medium`} >
                    {
                      loading ?
                        <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Save"
                    }
                  </button>
                  <SuccessPopUp closeAction={()=>setShowModel(false)} title={"Your Data is Updated Successfully."} showModel={showSuccessPopUp} setShowModel={setShowSuccessPopUp} />
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


import { BsCamera } from "react-icons/bs";

import deleteIcon from "../../../../../images/professional/delete_icon.svg";
import uploadIcon from "../../../../../images/professional/upload_icon.svg";
import { useRef, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import Select from "../../../../../components/select";
import Info from "../../../../../components/info";
import SelectWithInputs from "../../../../../components/select_with_input";
import CustomDatePicker from "../../../../../components/custom_date_picker";
import SuccessPopUp from "../../../../../components/success_popup";
import ErrorPopUp from "../../../../../components/error_popup";
import spinner from "../../../../../images/spinner.svg";
import { useProfessionalContext } from "../../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../../contexts/AuthContextProvider";

export default function AddService({ categoryId, type, templateId, parentId, showModel, setShowModel }) {
  const priceOptions = [
    { id: "fixedPrice", label: "Fixed price", value: "f" },
    { id: "startingPrice", label: "Starting price", value: "s" }
  ];

  const discountOptions = [
    { id: 0, label: "Select Discount", value: "Select Discount" },
    { id: "fixedDiscount", label: "Fixed Discount", value: "f" },
    {
      id: "percentageDiscount",
      label: "Percentage Discount",
      value: "p"
    }
  ];

  const [serviceName, setServiceName] = useState('');
  const [bio, setBio] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [info, setInfo] = useState('');


  const [currentPriceSelected, setCurrentPriceSelected] = useState(
    null
  );

  const [currentDiscountSelected, setCurrentDiscountSelected] = useState(
    null
  );

  const [fromDuration, setFromDuration] = useState(null)
  const [toDuration, setToDuration] = useState(null)
  const [fromselectedDate, setFromSelectedDate] = useState(null);
  const [toselectedDate, setToSelectedDate] = useState(null);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [showErrorModel, setShowErrorModel] = useState(false)
  const {
    addServiceAndSubService
  } = useProfessionalContext();
  const { token } = useAuthContext();

  const handleFromDateChange = date => {
    setFromSelectedDate(date);
  };
  const handleToDateChange = date => {
    setToSelectedDate(date);
  };

  const convertDurationToMinutes = (duration) => {
    const parts = duration.split(" ");

    const hours = parts.find(part => part.includes("hr"));
    const minutes = parts.find(part => part.includes("mint"));

    const parsedHours = hours ? parseInt(hours) : null;
    const parsedMinutes = minutes ? parseInt(minutes) : null;

    let totalMinutes = 0;

    if (parsedHours) {
      totalMinutes = totalMinutes + (parsedHours * 60)
    }

    if (parsedMinutes) {
      totalMinutes = totalMinutes + (parsedMinutes)
    }

    return totalMinutes;
  };


  const handleSave = async () => {
    setError('');
    setLoading(true);



    if (serviceName && fromDuration && currentPriceSelected && price) {
      // Check if optional fields are filled
      if ((discount || currentDiscountSelected || fromselectedDate) &&
        (!discount || !currentDiscountSelected || !fromselectedDate)) {
        setError("Please fill discount fields.");
        setLoading(false);
        setShowErrorModel(true);
        return;
      }
      if (fromDuration && toDuration) {
        const fromDurationInMinutes = convertDurationToMinutes(fromDuration);
        const toDurationInMinutes = convertDurationToMinutes(toDuration);

        if (toDurationInMinutes < fromDurationInMinutes) {
          // Show error message or handle the case where toDuration is less than fromDuration
          setError("To duration cannot be less than from duration.");
          setLoading(false);
          setShowErrorModel(true);
          return;
        }
      }

      if (!(parseFloat(price) >= 0)) {
        setError("Price should be greater or equal zero.");
        setLoading(false);
        setShowErrorModel(true);
        return;
      }

      const data = {};
      // Log all the values
      data['service_name'] = serviceName;
      data['bio'] = bio;
      if (toDuration) {
        data['duration'] = fromDuration + " - " + toDuration;
      }
      else {
        data['duration'] = fromDuration;
      }
      data['price_type'] = currentPriceSelected?.value;
      data['price'] = parseFloat(price);

      data['category_id'] = parseInt(categoryId);
      data['additional_info'] = info;
      data['type'] = type;
      if (type == "sub") {
        data['parent_id'] = parseInt(parentId);
      }
      data['template_id'] = parseInt(templateId);
      if ((discount || currentDiscountSelected || fromselectedDate)) {
        data['discount_type'] = currentDiscountSelected?.value;
        data['discount_amount'] = parseFloat(discount);
        data['discount_valid_from'] =  new Date(fromselectedDate.toString().slice(1, -1));
      }
      if (toselectedDate) {
        data['discount_valid_to'] = new Date(toselectedDate.toString().slice(1, -1));
      }
      else{
        data['discount_valid_to'] = null;
      }

      const response = await addServiceAndSubService(token, categoryId, templateId, JSON.stringify(data));
      if (!response) {
        setError("Please check your credentials again.");
        setLoading(false);
        setShowErrorModel(true);
      }
      else {
        setServiceName("");
        setBio("");
        setPrice("");
        setDiscount("");
        setInfo("");
        setCurrentPriceSelected(null);
        setCurrentDiscountSelected(null);
        setFromDuration(null);
        setToDuration(null);
        setFromSelectedDate(null);
        setToSelectedDate(null);
        setShowSuccessPopUp(true)
      }

      setLoading(false);



    } else {
      // Alert the user to fill mandatory fields
      if (!serviceName) {
        setError("Please fill service name fields.");
        setLoading(false);
        setShowErrorModel(true);
        return;
      }
      if (!fromDuration) {
        setError("Please fill from duration fields.");
        setLoading(false);
        setShowErrorModel(true);
        return;
      }

      if (!currentPriceSelected) {
        setError("Please fill price type fields.");
        setLoading(false);
        setShowErrorModel(true);
        return;
      }
      if (!price) {
        setError("Please fill price fields.");
        setLoading(false);
        setShowErrorModel(true);
        return;
      }

    }
  };

  return (
    <div>
      {showModel &&
        <div className="fixed inset-0 z-50 flex items-center ">
          <div
            onClick={() => setShowModel(false)}
            className="fixed inset-0 bg-black opacity-[66%]"
          />
          <div className="relative z-50  w-[95%] md:w-[28rem] mx-auto my-6 max-h-screen overflow-y-scroll no-scrollbar ">
            <div className="relative px-2 py-4 bg-white rounded-lg shadow-lg ">
              <div className="flex flex-col items-start gap-2 px-5 rounded-t">
                <h3 className="w-full text-lg font-bold text-center text-softblue">
                  Add Service
                </h3>
              </div>
              <div className="px-5 pt-9">

                {/* (sub)Service Name */}
                <div>
                  <label className="block text-sm font-normal text-gray-500 pb-2">
                    (sub)Service Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="(sub)Service Name"
                    className="w-full px-3 py-3  text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                  />
                </div>
                {/* info */}
                <div className="relative">
                  <textarea
                    placeholder="Info"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                  />
                  <div className=" absolute w-max top-3.5 right-2.5 ">
                    {" "}<Info title={"this is bio"} />{" "}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-normal text-gray-500">
                    Duration  <span className="text-red-500">*</span>
                  </label>

                  {/* from and to */}
                  <div className="flex items-center gap-2 ">
                    <div className="w-full ">
                      <div className="w-full">
                        <SelectWithInputs
                          options={fromDuration}
                          selectedOption={fromDuration}
                          handleSelect={event => {
                            console.log("Province", event);
                            setFromDuration(event);
                          }}
                          placeholder={"from"}
                        />
                      </div>
                    </div>
                    <label className="block text-sm font-normal text-gray-500">
                      -
                    </label>
                    <div className="w-full ">
                      <div className="w-full">
                        <SelectWithInputs
                          options={toDuration}
                          selectedOption={toDuration}
                          handleSelect={event => {
                            console.log("Province", event);
                            setToDuration(event);
                          }}
                          placeholder={"to"}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* starting price or fixed price */}
                <div className="w-full ">
                  <div className="w-full">
                    <Select
                      placeholder={"Select Price Type"}

                      options={priceOptions}
                      selectedOption={currentPriceSelected}
                      handelChange={event => {
                        if (event.value !== "priceOption") {
                          console.log("Municipality", event);
                          setCurrentPriceSelected(event);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* price */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Price"
                    min={0}

                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                  />
                </div>

                <label className="block mt-2 text-sm font-normal text-gray-500">
                  Discount
                </label>

                {/* select fixed or percentage discount */}
                <div className="w-full ">
                  <div className="w-full">
                    <Select
                      placeholder={"Select Discount Type"}

                      options={discountOptions}
                      selectedOption={currentDiscountSelected}
                      handelChange={event => {
                        if (event.id === 0) {
                          setCurrentDiscountSelected(null);
                        }
                        if (event.value !== "discountOption" && event.id !== 0) {

                          setCurrentDiscountSelected(event);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* price */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                  />
                </div>

                {/* date to date */}
                <div className="flex items-center gap-2 ">
                  <div className="w-full ">
                    <div className="w-full">
                      <CustomDatePicker placeholder="Date" value={fromselectedDate} onDateChange={handleFromDateChange} />
                    </div>
                  </div>
                  <label className="block text-sm font-normal text-gray-500">
                    -
                  </label>
                  <div className="w-full ">
                    <div className="w-full">
                      <CustomDatePicker placeholder="Date" value={toselectedDate} onDateChange={handleToDateChange} />
                    </div>
                  </div>
                </div>

                {/* info */}
                <div className="relative">
                  <input
                    type="text"
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    placeholder="Info"
                    className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                  />
                  <div className="absolute top-3.5 right-2.5 ">
                    {" "}<Info title={"this is info"} />{" "}
                  </div>
                </div>

                <button disabled={loading} onClick={handleSave} className={`${loading ? "bg-gray-100  flex items-center justify-center" : "bg-customGreen"} text-white mt-4 w-full py-3  mb-4  rounded-md text-base font-medium`} >
                  {
                    loading ?
                      <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Save"
                  }
                </button>
                <SuccessPopUp closeAction={() => setShowModel(false)} title={"Your Service is Updated Successfully."} showModel={showSuccessPopUp} setShowModel={setShowSuccessPopUp} />
                {/* error popup */}
                <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />


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

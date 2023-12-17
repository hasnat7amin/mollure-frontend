

import { BsCamera } from "react-icons/bs";

import deleteIcon from "../../../../../images/professional/delete_icon.svg";
import uploadIcon from "../../../../../images/professional/upload_icon.svg";
import { useEffect, useRef, useState } from "react";
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

export default function UpdateService({ categoryId, type, templateId, parentId, showModel, setShowModel, data }) {
    const priceOptions = [
        { id: "fixedPrice", label: "Fixed price", value: "f" },
        { id: "startingPrice", label: "Starting price", value: "s" }
    ];

    const discountOptions = [
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

    const [serviceId, setServiceId] = useState(null)
    const [fromDuration, setFromDuration] = useState(null)
    const [toDuration, setToDuration] = useState(null)
    const [fromselectedDate, setFromSelectedDate] = useState(null);
    const [toselectedDate, setToSelectedDate] = useState(null);
    const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showErrorModel, setShowErrorModel] = useState(false)
    const {
        updateServiceAndSubService
    } = useProfessionalContext();
    const { token } = useAuthContext();

    function formatDate(dateString) {
        const date = new Date(dateString);

        // Get day, month, and year from the date object
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Adding 1 because months are zero-indexed
        const year = date.getUTCFullYear();

        // Pad day and month with leading zeros if needed
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        // Format the date as DD-MM-YYYY
        const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

        return formattedDate;
    }



    const displayDataToForm = () => {
        if (data) {
            setServiceId(data?.id)
            setServiceName(data?.service_name);
            setBio(data?.bio);
            setPrice(data?.price)
            setDiscount(data?.discount_amount);
            setInfo(data?.additional_info);
            setCurrentPriceSelected(priceOptions.find(item => item.value == data?.price_type))
            setCurrentDiscountSelected(discountOptions.find(item => item.value == data?.discount_type))
            setFromDuration(data?.duration?.split('-')[0])
            if (data.duration?.split('-')[1]) {
                setToDuration(data?.duration?.split('-')[1])
            }
            console.log(data?.discount_valid_from)
            console.log(data?.discount_valid_to)
            data?.discount_valid_from && setFromSelectedDate(new Date(`${data?.discount_valid_from}`))
            data?.discount_valid_to && setToSelectedDate(new Date(`${data?.discount_valid_to}`))
        }
    }


    const handleFromDateChange = date => {
        setFromSelectedDate(date);
    };
    const handleToDateChange = date => {
        setToSelectedDate(date);
    };


    const handleSave = async () => {
        setError('');
        setLoading(true);

        if (!serviceId) {
            setError("Service Id is invalid.");
            setLoading(false);
            setShowErrorModel(true);
            return;
        }

        if (serviceName && fromDuration && currentPriceSelected && price) {
            // Check if optional fields are filled
            if ((discount || currentDiscountSelected || fromselectedDate || toselectedDate) &&
                (!discount || !currentDiscountSelected || !fromselectedDate || !toselectedDate)) {
                setError("Please fill discount fields.");
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
            data['price'] = price;

            data['category_id'] = parseInt(categoryId);
            data['additional_info'] = info;
            data['type'] = type;

            data['parent_id'] = 0;

            data['template_id'] = parseInt(templateId);
            if ((discount || currentDiscountSelected || fromselectedDate || toselectedDate)) {
                data['discount_type'] = currentDiscountSelected?.value;
                data['discount_amount'] = discount;
                data['discount_valid_from'] = new Date(fromselectedDate.toString().slice(1, -1));
                data['discount_valid_to'] = new Date(toselectedDate.toString().slice(1, -1));
            }

            const response = await updateServiceAndSubService(token, serviceId, categoryId, templateId, JSON.stringify(data));
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

                setShowSuccessPopUp(true);
            }

            setLoading(false);



        } else {
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


    useEffect(() => {
        displayDataToForm();
    }, [data])

    return (
        <div>
            {showModel &&
                <div className="fixed inset-0 z-50 flex items-center pt-40 overflow-y-scroll">
                    <div
                        onClick={() => setShowModel(false)}
                        className="fixed inset-0 bg-black opacity-[66%]"
                    />
                    <div className="relative z-50  w-[95%] md:w-[28rem] mx-auto my-6">
                        <div className="relative px-2 py-4 bg-white rounded-lg shadow-lg">
                            <div className="flex flex-col items-start gap-2 px-5 rounded-t">
                                <h3 className="w-full text-lg font-bold text-center text-softblue">
                                    Update Service
                                </h3>
                            </div>
                            <div className="px-5 pt-9">

                                {/* (sub)Service Name */}
                                <div>
                                    <input
                                        type="text"
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        placeholder="(sub)Service Name"
                                        className="w-full px-3 py-3 mt-6 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
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
                                        Duration
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
                                        type="number"
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
                                                if (event.value !== "discountOption") {

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

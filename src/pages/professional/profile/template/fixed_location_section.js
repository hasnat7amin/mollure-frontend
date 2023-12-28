import TitleBar from "../../../../components/titleBar";
import { useEffect, useState } from "react";
import EditProfile from "./popups/edit_profile";
import edit from "../../../../images/professional/edit.svg";
import { IoIosArrowDown } from "react-icons/io";
import profile from "../../../../images/professional/profile.jpg";

import { useProfessionalContext } from "../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../contexts/AuthContextProvider";
import { imageUrl } from "../../../../apis/base_url";
import cardFrameTopLeft from "../../../../images/professional/Frame20.svg";
import cardFrameBottomRight from "../../../../images/professional/Frame19.svg";
import AddLocation from "./popups/add_location";
import EditLocation from "./popups/edit_location";
import CustomAddButton from "../../../../components/custom_add_button";


export default function FixedLocationSection() {
    const [showFixedLocationSection, setShowFixedLocationSection] = useState(
        true
    );
    const [showEditLocationModel, setShowEditLocationModel] = useState(false);
    const [showAddLocationModel, setShowAddLocationModel] = useState(false);
    const {
        fixedLocation,
        getFixedLocation
    } = useProfessionalContext();
    const { token } = useAuthContext();

    const fetchFixedLocationDetails = async () => {
        await getFixedLocation(token)
    }

    useEffect(() => {
        console.log(fixedLocation)
        console.log(fixedLocation &&
            fixedLocation.salon_name &&
            fixedLocation.address &&
            fixedLocation.postal_code &&
            fixedLocation.municipalities &&
            fixedLocation.provinces)
    }, [fixedLocation])
    useEffect(() => {
        fetchFixedLocationDetails();
    }, [])

    return <section>
        {/* fixed location */}
        <div className="relative mb-10">
            <div
                onClick={() => setShowFixedLocationSection(!showFixedLocationSection)}
                className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
            >
                <IoIosArrowDown
                    size={18}
                    color="white"
                    className={`${showFixedLocationSection ? "" : ""}`}
                />
            </div>
            <TitleBar title={"Fixed Location"} />
            <div
                className={`${showFixedLocationSection ? "flex flex-col" : "hidden"}`}
            >
                {/* location card */}
                {
                    (fixedLocation &&
                        fixedLocation.salon_name &&
                        fixedLocation.address &&
                        fixedLocation.postal_code &&
                        fixedLocation.municipalities &&
                        fixedLocation.provinces) ?
                        <div className="md:mx-5  relative my-10 rounded-md shadow-md border md:w-[19rem] w-full p-5">
                            {/* edit image */}
                            <img
                                src={edit}
                                alt="Edit"
                                onClick={() => setShowEditLocationModel(true)}
                                className="z-10 bottom-3.5 right-3.5 cursor-pointer absolute"
                            // onClick={toggleUpdateButtonVisibility}
                            />
                            {/* frame top left */}
                            <img
                                src={cardFrameTopLeft}
                                alt="Edit"
                                className="absolute top-0 left-0 cursor-pointer"
                            // onClick={toggleUpdateButtonVisibility}
                            />
                            {/* frame top left */}
                            <img
                                src={cardFrameBottomRight}
                                alt="Edit"
                                className="absolute bottom-0 right-0 cursor-pointer"
                            // onClick={toggleUpdateButtonVisibility}
                            />

                            <div className="flex flex-col space-y-2.5 ">
                                <div className="flex w-full space-x-2">
                                    <p className="text-base font-normal text-black ">Salon Name:</p>
                                    <p className="text-base font-normal text-black ">{fixedLocation?.salon_name}</p>
                                </div>
                                <div className="flex w-full space-x-2">
                                    <p className="text-base font-normal text-black ">Street:</p>
                                    <p className="text-base font-normal text-black ">
                                        {fixedLocation?.address}
                                    </p>
                                </div>
                                <div className="flex w-full space-x-2">
                                    <p className="text-base font-normal text-black ">Number:</p>
                                    <p className="text-base font-normal text-black ">
                                        {fixedLocation.number?fixedLocation.number: null}
                                    </p>
                                </div>
                                <div className="flex w-full space-x-2">
                                    <p className="text-base font-normal text-black ">
                                        Postal Code:
                                    </p>
                                    <p className="text-base font-normal text-black ">{fixedLocation?.postal_code}</p>
                                </div>
                                <div className="flex w-full space-x-2">
                                    <p className="text-base font-normal text-black ">
                                        Municipality:
                                    </p>
                                    <p className="text-base font-normal text-black ">{fixedLocation?.municipalities[0]?.name}</p>
                                </div>
                                <div className="flex w-full space-x-2">
                                    <p className="text-base font-normal text-black ">Province:</p>
                                    <p className="text-base font-normal text-black ">{fixedLocation?.provinces[0]?.name}</p>
                                </div>
                            </div>
                        </div> : <div className="flex items-center justify-end w-full mt-2">
                            <CustomAddButton title={"Add Location"} handleClick={() => setShowAddLocationModel(true)} />
                        </div>
                }

                {/* add location button  */}

            </div>
        </div>

        {/* add location */}
        <AddLocation
            showModel={showAddLocationModel}
            setShowModel={setShowAddLocationModel}
        />
        {/* edit location */}
        <EditLocation
            showModel={showEditLocationModel}
            setShowModel={setShowEditLocationModel}
        />
    </section>
}
import TitleBar from "../../../../components/titleBar";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import edit from "../../../../images/professional/edit.svg";
import EditService from "./popups/edit_service";
import { useProfessionalContext } from "../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../contexts/AuthContextProvider";



export default function ServiceForSection({ id,type }) {
    const [showServiceForSection, setShowServiceForSection] = useState(true);
    const [showEditServiceModel, setShowEditServiceModel] = useState(false);
    const {
        serviceFor,
        getServiceFor,
        updateServiceFor
    } = useProfessionalContext();
    const { token } = useAuthContext();

    const fetchServiceForDetails = async () => {
        await getServiceFor(token, id)
    }


    useEffect(() => {
        fetchServiceForDetails();
    }, [id])
    return (
        <section>
            {/* service for */}
            <div className="relative">
                <div
                    onClick={() => setShowServiceForSection(!showServiceForSection)}
                    className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
                >
                    <IoIosArrowDown
                        size={18}
                        color="white"
                        className={`${showServiceForSection ? "" : "rotate-180"}`}
                    />
                </div>
                <TitleBar title={"Service For"} />
                <div
                    className={`${showServiceForSection ? "flex flex-col" : "hidden"}`}
                >
                    <div className="flex items-center justify-end w-full space-x-2">
                        {/* edit image */}
                        <img
                            src={edit}
                            alt="Edit"
                            onClick={() => setShowEditServiceModel(true)}
                            className="mt-5 mr-5 cursor-pointer "
                        // onClick={toggleUpdateButtonVisibility}
                        />
                    </div>
                    {/* text */}
                    <div className="flex flex-wrap items-center w-full gap-2 mt-3 ms-2 md:mt-0">
                        {
                            serviceFor && serviceFor.women == 1 && <p className="px-3 py-3 text-base font-normal border border-gray-300 rounded-md flex-nowrap">
                               Only Womens
                            </p>
                        }
                        {
                            serviceFor && serviceFor.men == 1 && <p className="px-3 py-3 text-base font-normal border border-gray-300 rounded-md flex-nowrap">
                                Only Mens
                            </p>
                        }
                        {
                            serviceFor && serviceFor.kids == 1 && <p className="px-3 py-3 text-base font-normal border border-gray-300 rounded-md flex-nowrap">
                                Kids
                            </p>
                        }
                        {
                            serviceFor && serviceFor.all_gender == 1 && <p className="px-3 py-3 text-base font-normal border border-gray-300 rounded-md flex-nowrap">
                                Women & Men
                            </p>
                        }
                        {/* {
                            serviceFor && serviceFor.all_gender == 0 && serviceFor.kids == 0  && serviceFor.men == 0 && serviceFor.women == 0 && <p className="px-3 py-3 text-base font-normal border border-gray-300 rounded-md flex-nowrap">
                                No service is selected
                            </p>
                        }
                       */}
                    </div>
                </div>
            </div>

            {/* edit service */}
            <EditService
                id={id}
                type={type}
                showModel={showEditServiceModel}
                setShowModel={setShowEditServiceModel}
            />
        </section>
    )
}
import TitleBar from "../../../../components/titleBar";
import { useEffect, useState } from "react";
import EditProfile from "./popups/edit_profile";
import edit from "../../../../images/professional/edit.svg";
import { IoIosArrowDown } from "react-icons/io";
import profile from "../../../../images/professional/profile.jpg";

import { useProfessionalContext } from "../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../contexts/AuthContextProvider";
import { imageUrl } from "../../../../apis/base_url";




export default function ProfileSection({ id,type}) {
    const [setshowProfileSection, setSetshowProfileSection] = useState(true);
    const [showEditProfileModel, setShowEditProfileModel] = useState(false);
    const {
        templateBio,
        getTemplateBio,
        updateTemplateBio
    } = useProfessionalContext();
    const { token } = useAuthContext();




    const fetchProfileDetails = async () => {
        await getTemplateBio(token,id)
    }


    useEffect(() => {
        fetchProfileDetails();
    }, [id])


    return <section>
        {/* profile section */}
        <div className="relative">
            <div
                onClick={() => setSetshowProfileSection(!setshowProfileSection)}
                className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
            >
                <IoIosArrowDown
                    size={18}
                    color="white"
                    className={`${setshowProfileSection ? "" : "rotate-180"}`}
                />
            </div>
            <TitleBar title={"Profile"} />
            <div
                className={`${setshowProfileSection ? "flex flex-col" : "hidden"}`}
            >
                <div className="flex items-center justify-end w-full space-x-2">
                    {/* edit image */}
                    <img
                        onClick={() => setShowEditProfileModel(true)}
                        src={edit}
                        alt="Edit"
                        className="mt-5 mr-5 cursor-pointer "
                    // onClick={toggleUpdateButtonVisibility}
                    />
                </div>
                <div className="flex flex-col items-center gap-5 m-5 md:flex-row md:items-start">
                    {/* image */}
                    {
                        (templateBio && templateBio.profile_picture) ? <img
                            width={300}
                            height={300}
                            src={imageUrl + templateBio.profile_picture}
                            alt="Profile"
                            className="  rounded-full object-cover object-center  cursor-pointer w-[7.9rem]  h-[7.9rem] "
                        />:
                        <div className="bg-gray-200  rounded-full object-contain object-center  cursor-pointer w-[8.9rem]  h-[7.9rem] "
                              ></div>
                    }

                    {/* text */}
                    <div className="flex flex-col w-full space-y-2">
                        <p className="w-full px-3 py-3 text-base font-normal border border-gray-300 rounded-md ">
                            {
                                (templateBio && templateBio.bio_name) ? templateBio.bio_name : "Name"
                            }
                        </p>
                        <p className="w-full px-3 py-3 text-base font-normal border border-gray-300 rounded-md ">
                            {
                                (templateBio && templateBio.Bio_description) ? templateBio.Bio_description : "Description"
                            }
                        </p>
                        <div className="flex flex-col w-full gap-2 md:flex-row">
                            <p className="w-full px-3 py-3 text-base font-normal border border-gray-300 rounded-md md:w-1/3 ">
                            {
                                (templateBio && templateBio.key1) ? templateBio.key1 : "Keyword 1"
                            }
                            </p>
                            <p className="w-full px-3 py-3 text-base font-normal border border-gray-300 rounded-md md:w-1/3 ">
                            {
                                (templateBio && templateBio.key2) ? templateBio.key2 : "Keyword 2"
                            }
                            </p>
                            <p className="w-full px-3 py-3 text-base font-normal border border-gray-300 rounded-md md:w-1/3 ">
                            {
                                (templateBio && templateBio.key3) ? templateBio.key3 : "Keyword 3"
                            }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* edit profile */}
        <EditProfile
            id={id}
            type={type}
            showEditProfieModel={showEditProfileModel}
            setShowEditProfieModel={setShowEditProfileModel}
        />
    </section>


}

import TitleBar from '../../../../components/titleBar';
import edit from '../../../../images/professional/edit.svg';
import deleteIcon from '../../../../images/professional/delete_icon.svg';
import category1 from '../../../../images/professional/category1.svg';
import addIcon from '../../../../images/professional/Add_Plus.svg';
import profile from '../../../../images/professional/profile.jpg';
import cardFrameTopLeft from '../../../../images/professional/Frame20.svg';
import cardFrameBottomRight
    from '../../../../images/professional/Frame19.svg';

import Info from '../../../../components/info';
import ReactStars from 'react-rating-stars-component';
import Select from '../../../../components/select';
import { IoIosArrowDown } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import EditProfile from './popups/edit_profile';
import AddLocation from './popups/add_location';
import EditLocation from './popups/edit_location';
import EditService from './popups/edit_service';
import EditGeneralNote from './popups/edit_general_note';
import AddTeamMember from './popups/add_team_member';
import AddImage from './popups/add_image';
import EditTeamMember from './popups/edit_team_member';
import FeatureTeamMember from './popups/feature_team_member';
import AddSubService from './popups/add_sub_service';
import AddService from './popups/add_service';
import ConfirmationDeletePopUp from '../../../../components/confirmation_delete_popup';
import ConfirmationProcessPopUp from '../../../../components/confirmation_process_popup';
import EditOperatingArea from './popups/edit_operating_area';
import CustomAddButton from '../../../../components/custom_add_button';
import ProvinceCard from '../../../../components/province_card';
import CustomAddSubServiceButton from '../../../../components/custom_add_sub_service';
import ProfileSection from './profile_section';
import ServiceForSection from './service_for_section';
import GeneralNoteSection from './general_note_section';
import VisualsSection from './visual_section';
import { useProfessionalContext } from '../../../../contexts/ProfessionalContextProvider';
import { useAuthContext } from '../../../../contexts/AuthContextProvider';



export default function DesiredLocationService() {
    const [showFixedLocationSection, setShowFixedLocationSection] = useState(true);
    const [showEditOperatingAreaModel, setShowEditOperatingAreaModel] = useState(false);
    const {

        updateTeamMembers,
        provincesAndMunicipalities,
        getProvincesAndMunicipalities,
        desiredLocation,
        updateDesiredLocation,
        getDesiredLocation

    } = useProfessionalContext();
    const { token } = useAuthContext();


    
    const fetchDesiredLocation = async () => {
        await getDesiredLocation(token);
    };


    useEffect(() => {
        desiredLocation&&console.log(desiredLocation&&JSON.parse(JSON.parse(desiredLocation?.province)))
    }, [desiredLocation]);


    useEffect(() => {
        fetchDesiredLocation();
    }, []);

    return <section>
        {/* operating ereas */}
        <div className="relative mb-10">
            <div
                onClick={() =>
                    setShowFixedLocationSection(!showFixedLocationSection)}
                className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
            >
                <IoIosArrowDown
                    size={18}
                    color="white"
                    className={`${showFixedLocationSection ? '' : ''}`}
                />
            </div>
            <TitleBar title={'Operating Areas'} />
            <div
                className={`${showFixedLocationSection ? 'flex flex-col' : 'hidden'}`}
            >
                <div className="flex items-center justify-end w-full space-x-2">
                    {/* edit image */}
                    <img

                        src={edit}
                        alt="Edit"
                        className="mt-5 mr-5 cursor-pointer "
                        onClick={() => setShowEditOperatingAreaModel(true)}
                    />
                </div>

                <div className="flex flex-col gap-3 pl-4 my-1">
                    <div className="flex items-center gap-6">
                        <label
                            htmlFor="onlyWomen"
                            className="mr-2 text-base font-normal cursor-pointer"
                        >
                            Everywhere In Netherland
                        </label>
                        <input
                            type="checkbox"
                            disabled={true}
                            checked={desiredLocation && desiredLocation.desire_location_type == "everywhere" ? true : false}
                            className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                        />
                    </div>
                    <div className="flex items-center w-full gap-28">
                        <label
                            htmlFor="onlyWomen"
                            className="mr-2 text-base font-normal cursor-pointer"
                        >
                            Specific Areas
                        </label>
                        <input
                            type="checkbox"
                            disabled={true}
                            checked={desiredLocation && desiredLocation.desire_location_type == "desired" ? true : false}

                            className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                        />
                    </div>
                </div>
                {
                    desiredLocation && desiredLocation.desire_location_type == "desired" && JSON.parse(JSON.parse(desiredLocation?.province)) && <div className="flex items-center justify-between w-full gap-2 pl-4">
                        <div className="flex items-start justify-between w-full gap-2 mt-3">
                            {/* province cards list */}
                            <div className="flex flex-wrap gap-2 ">
                                {Array.isArray(JSON.parse(JSON.parse(desiredLocation?.province))) && JSON.parse(JSON.parse(desiredLocation?.province)).map((item, index) => {
                                    if (item.municipalities.length == item.municipalitiesIds.length) {
                                        return <div className="relative flex border rounded-md ">
                                            <div className="flex items-center gap-2 p-2 cursor-pointer">
                                                <p className="text-center">{item.provinceId.value}</p>
                                            </div>
                                        </div>
                                    } else {
                                        return <ProvinceCard title={item.provinceId.value} options={item.municipalitiesIds} />

                                    }

                                })

                                }
                            </div>


                        </div>
                    </div>
                }

            </div>
        </div>

        <EditOperatingArea showModel={showEditOperatingAreaModel} setShowModel={setShowEditOperatingAreaModel} data={desiredLocation}  />




    </section>;

}
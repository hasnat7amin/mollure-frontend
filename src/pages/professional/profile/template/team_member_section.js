'use client';
import CustomAddButton from "../../../../components/custom_add_button";

import TitleBar from "../../../../components/titleBar";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import edit from "../../../../images/professional/edit.svg";
import EditService from "./popups/edit_service";
import { useProfessionalContext } from "../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../contexts/AuthContextProvider";
import EditGeneralNote from "./popups/edit_general_note";
import category1 from "../../../../images/professional/category1.svg";
import Info from "../../../../components/info";
import deleteIcon from "../../../../images/professional/delete_icon.svg";
import CustomAddSubServiceButton from "../../../../components/custom_add_sub_service";
import { imageUrl } from "../../../../apis/base_url";
import AddService from "./popups/add_sub_service";
import profile from "../../../../images/professional/profile.jpg";
import AddTeamMember from "./popups/add_team_member";
import FeatureTeamMember from "./popups/feature_team_member";
import ReactStars from "react-rating-stars-component";
import EditTeamMember from "./popups/edit_team_member";

import ClickAwayListener from 'react-click-away-listener';
import ConfirmationDeletePopUp from "../../../../components/confirmation_delete_popup";
import ErrorPopUp from "../../../../components/error_popup";



export default function TeamMemberSection({ id, type }) {
    const [showTeamMemberSection, setShowTeamMemberSection] = useState(true);
    const [showEditTeamMemberModel, setShowEditTeamMemberModel] = useState(false);
    const [showAddTeamMemberModel, setShowAddTeamMemberModel] = useState(false);
    const [showFeatureTeamMemberModel, setShowFeatureTeamMemberModel] = useState(false);
    const [showDeleteVisualPopUp, setShowDeleteVisualPopUp] = useState(false);
    const [showErrorModel, setShowErrorModel] = useState(false)
    const [error, setError] = useState(false);
    const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)

    const {
        teamMembers,
        getTeamMembers,
        deleteTeamMembers,
        postTeamMemberOnPublicPage,
        templateBio

    } = useProfessionalContext();
    const { token } = useAuthContext();

    const fetchGetTeamMembers = async () => {
        await getTeamMembers(token, id);
    }

    useEffect(() => {
        fetchGetTeamMembers();
    }, [])


    const handleTeamMemberDeleteConfirm = async (templateId, teamId) => {
        setError('');

        const response = await deleteTeamMembers(token, templateId, teamId);
        if (!response) {
            setError("Please check your credentials again.");
            setShowErrorModel(true);
        }


        setShowDeleteVisualPopUp(false);


    }

    return <section>
        {/* team members */}
        <div className="relative ">
            <div
                onClick={() => setShowTeamMemberSection(!showTeamMemberSection)}
                className="absolute top-1.5 right-3 p-2  rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
            >
                <IoIosArrowDown
                    size={18}
                    color="white"
                    className={`${showTeamMemberSection ? "" : "rotate-180"}`}
                />
            </div>
            <TitleBar title={"Team Members"} />
            <div
                className={`${showTeamMemberSection ? "flex flex-col" : "hidden"}`}
            >
                {/* add service button  */}
                <div className="flex items-center justify-end py-5 border-b">
                    <CustomAddButton title={"Add Team Member"} handleClick={() => setShowAddTeamMemberModel(true)} />

                </div>
                {/* team cards */}
                <div className="flex  flex-wrap items-center gap-2 px-3 py-5">
                    {/* card */}
                    {
                        teamMembers && teamMembers.map((team, index) => {
                            return <TeamCard index={index} team={team} id={id} type={type} />
                        })
                    }

                </div>

                <div className="flex flex-row items-center justify-between w-full px-5">
                    <div className="flex items-center">
                        <label
                            htmlFor="onlyWomen"
                            className="mr-2 text-base font-normal cursor-pointer"
                        >
                            Feature Team member on public page
                        </label>
                        <input
                            type="checkbox"
                            id="onlyWomen"
                            disabled={true}
                            checked={templateBio && templateBio?.team_member_on_public_page === 1 ? true : false}
                            className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                        />
                    </div>
                    <div>
                        <img
                            src={edit}
                            alt="Edit"
                            onClick={() => setShowFeatureTeamMemberModel(true)}
                            className="p-0 m-0 cursor-pointer "
                        // onClick={toggleUpdateButtonVisibility}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* error popup */}
        <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />
        {/* add team members */}
        <AddTeamMember
            id={id}
            type={type}
            showModel={showAddTeamMemberModel}
            setShowModel={setShowAddTeamMemberModel}
        />

        {/* feature team member */}
        <FeatureTeamMember
            id={id}
            type={type}
            showModel={showFeatureTeamMemberModel}
            setShowModel={setShowFeatureTeamMemberModel}
        />

    </section>
}



function CategoryCard({ title, options }) {
    const [showDropdown, setShowDropdown] = useState(false)
    return (
        <div>
            {/* province cards list */}
            <ClickAwayListener onClickAway={() => setShowDropdown(false)}>

                <div className="relative flex border rounded-md ">
                    <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center justify-between w-full gap-2 p-2 py-2 text-xs font-medium text-center text-white rounded-md cursor-pointer bg-gradient-to-b from-customBlue to-customGreen">
                        <p className="text-center">{title}</p>
                        <IoIosArrowDown
                            size={18}
                            color="white"
                            className={`${showDropdown ? '' : 'rotate-180'}`}
                        />
                    </div>

                    {showDropdown && <div className="absolute z-10 w-full px-3 overflow-scroll bg-white rounded-md shadow-lg top-12 mb-11 max-h-48 selectDropdown">

                        {options.map((option, index) => {
                            return (

                                <div
                                    className={` text-blackcursor-default  ${(index == options.length - 1) ?
                                        "mb-2"
                                        : "border-b-2"
                                        }  text-sm font-normal py-2  `}
                                >
                                    <div className="flex items-center">
                                        <span
                                            className={`font-normal flex items-center  truncate`}
                                        >
                                            {option.value}
                                        </span>

                                    </div>
                                </div>
                            );
                        })}
                    </div>



                    }



                </div>
            </ClickAwayListener>
        </div>
    )
}



function TeamCard({ index, team, id, type }) {
    const [showTeamMemberSection, setShowTeamMemberSection] = useState(true);
    const [showEditTeamMemberModel, setShowEditTeamMemberModel] = useState(false);
    const [showAddTeamMemberModel, setShowAddTeamMemberModel] = useState(false);
    const [showFeatureTeamMemberModel, setShowFeatureTeamMemberModel] = useState(false);
    const [showDeleteVisualPopUp, setShowDeleteVisualPopUp] = useState(false);
    const [showErrorModel, setShowErrorModel] = useState(false)
    const [error, setError] = useState(false);
    const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)

    const {
        teamMembers,
        getTeamMembers,
        deleteTeamMembers
    } = useProfessionalContext();
    const { token } = useAuthContext();




    const handleTeamMemberDeleteConfirm = async (templateId, teamId) => {
        setError('');

        const response = await deleteTeamMembers(token, templateId, teamId);
        if (!response) {
            setError("Please check your credentials again.");
            setShowErrorModel(true);
        }


        setShowDeleteVisualPopUp(false);


    }
    return <section className="md:w-[21rem] " key={index}>
        <div className="md:w-[21rem] h-[14rem] flex flex-col justify-between p-5 rounded-md shadow-md ">
            <div className="flex items-center justify-around gap-3">
                {/* image */}
                <div className="flex items-center justify-around gap-3">
                    <img
                        src={imageUrl + team?.image}
                        width={300}
                        height={300}
                        alt="Profile"
                        className="rounded-full object-cover object-center  cursor-pointer w-[3.7rem]  h-[3.7rem] "
                    />
                    <div className="flex flex-col items-start justify-center space-y-2">
                        <p className="text-base font-normal">{team?.member}</p>
                        <p className="text-sm font-normal text-gray-400 line-clamp-1">
                            {team?.bio}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <ReactStars
                        classNames={"flex space-x-2"}
                        size={18}
                        value={2.5}
                        edit={false}
                        isHalf={true}
                        activeColor="#ffd700"
                    // emptyIcon={<i className="far fa-star" />}
                    // halfIcon={<i className="fa fa-star-half-alt" />}
                    // filledIcon={<i className="fa fa-star" />}
                    />
                    <p className="text-xs font-normal text-gray-400">
                        120 reviews
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
                {
                    JSON.parse(team?.service) && JSON.parse(team?.service).map((item, index) => {
                        if (item.serviceIds.length == item.services.length) {
                            return <div key={index} className="w-full py-2 text-xs font-medium text-center text-white rounded-md bg-gradient-to-b from-customBlue to-customGreen">
                                {item.categoryId.value}
                            </div>
                        }
                        else {
                            return <CategoryCard title={item.categoryId.value} options={item.serviceIds} />
                        }
                    })
                }

            </div>

            <div className="flex items-center justify-end w-full gap-2">
                {/* edit image */}
                <img
                    src={edit}
                    alt="Edit"
                    onClick={() => setShowEditTeamMemberModel(true)}
                    className="mt-5 cursor-pointer "
                // onClick={toggleUpdateButtonVisibility}
                />
                <img
                    src={deleteIcon}
                    alt="deleteIcon"
                    className="mt-5 cursor-pointer "
                    onClick={() => setShowDeleteVisualPopUp(true)}
                />
            </div>
        </div>
        {/* confirm delete popup */}
        <ConfirmationDeletePopUp
            showModel={showDeleteVisualPopUp}
            setShowModel={setShowDeleteVisualPopUp}
            title={"Are you sure you want to delete this Team Member?"}
            handleCancel={() => { setShowDeleteVisualPopUp(false); }}
            handleDelete={() => handleTeamMemberDeleteConfirm(id, team.id)}
        />
        {/* edit team members */}
        <EditTeamMember
            id={id}
            type={type}
            showModel={showEditTeamMemberModel}
            setShowModel={setShowEditTeamMemberModel}
            data={team}
        />
    </section>
}
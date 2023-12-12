

// images
import logoImage from "../images/Logo.svg";
import { Link } from 'react-router-dom';

import React, { useState } from "react";

import { Listbox, Transition } from "@headlessui/react";

import arrowDown from "../images/arrow_down_black.svg"
import ClickAwayListener from "react-click-away-listener";

import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import profile from "../images/professional/profile.jpg";
import ConfirmationDeletePopUp from "./confirmation_delete_popup";
import MessagePopUp from "./message_popup";
import { useAuthContext } from "../contexts/AuthContextProvider";


export default function Navbar() {
    const { logout, isUserLoggedIn, getUserProfile } = useAuthContext();
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [showConfirmDeleteAccountModel, setShowConfirmDeleteAccountModel] = useState(false);
    const [showSuccessDeleteAccountModel, setShowSuccessDeleteAccountModel] = useState(false);

    const handleConfirmDelete = () => {
        setShowConfirmDeleteAccountModel(false);
        setShowSuccessDeleteAccountModel(true)
    }
    const handleCancelDelete = () => {
        setShowConfirmDeleteAccountModel(false);

    }

    const toggleProfileOptions = () => {
        setShowProfileOptions(!showProfileOptions);
    };
    const languageOptions = [

        { id: "En", label: "En", value: "En" },
        { id: "NL", label: "NL", value: "NL" },

    ];
    const [currentLanguageSelected, setCurrentLanguageSelected] = useState(
        languageOptions[0]
    );
    return (
        <section className="">
            <div className="flex items-center justify-between my-5">
                {/* logo */}
                <div>
                    <Link to="/">
                        <img src={logoImage} alt="Logo" className="md:w-full w-[60%]" />
                    </Link>
                </div>
                <div className="flex items-center gap-2.5">
                    <Select
                        options={languageOptions.filter(item => item.id != currentLanguageSelected.id)}
                        selectedOption={currentLanguageSelected}
                        handelChange={(event) => {
                            if (event.value !== "selectCategory") {
                                console.log("Province", event);
                                setCurrentLanguageSelected(event);
                            }
                        }}
                    />

                    {!(isUserLoggedIn() && getUserProfile) ? <button className="px-4 py-1 text-base font-medium text-white rounded-full bg-customGreen ">
                        Login
                    </button> :
                        <ClickAwayListener onClickAway={() => setShowProfileOptions(false)}>
                            <div className="flex items-center space-x-8 text-gray-500">
                                <a
                                    href="#"
                                    onClick={toggleProfileOptions}
                                    id="profileButton"
                                    className="relative"
                                >
                                    <img
                                        className="border border-blue-200 rounded-full shadow w-9 h-9 shadow-gray-300"
                                        src={profile}
                                        alt="User Avatar"
                                    />
                                    {showProfileOptions &&
                                        <div className="absolute -right-1/2  bg-white rounded-md shadow-lg z-50  top-9 w-[10rem]">
                                            <ul>

                                                <li>
                                                    <div onClick={() => logout()} className="flex items-center w-full gap-2 py-1 pl-3 rounded-md hover:bg-green-50">
                                                        {/* <FaSignOutAlt color="black" /> */}
                                                        <span className="m-1 text-black">Logout</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div onClick={() => setShowConfirmDeleteAccountModel(true)} className="flex items-center w-full gap-2 py-1 pl-3 rounded-md hover:bg-green-50 text-customRed">
                                                        {/* <FaSignOutAlt color="black" /> */}
                                                        <span className="m-1 text-customRed">Delete Account</span>
                                                    </div>
                                                </li>
                                                {/* Add more options as needed */}
                                            </ul>
                                        </div>}
                                </a>
                            </div>
                        </ClickAwayListener>
                    }

                    <ConfirmationDeletePopUp showModel={showConfirmDeleteAccountModel} setShowModel={setShowConfirmDeleteAccountModel} handleDelete={handleConfirmDelete} title={"Are you sure you want to delete your acount?"} handleCancel={handleCancelDelete} />
                    <MessagePopUp showModel={showSuccessDeleteAccountModel} setShowModel={setShowSuccessDeleteAccountModel} title={"Your account will be deleted by admin with in 3 business days?"} />
                </div>
            </div>
        </section>
    )
}





const Select = ({
    /* label, */
    options,
    selectedOption,
    handelChange,
    placeholder
}) => {
    return (
        <Listbox
            as="div"
            value={selectedOption}
            onChange={(event) => {
                console.log("enfant", event);
                handelChange(event);
            }}
        >
            {({ open }) => (
                <>
                    <div className="relative">
                        <span className="inline-block w-full rounded-full shadow-sm">
                            <Listbox.Button className="relative w-full py-1 pl-3 pr-8 text-base font-normal text-left transition duration-150 ease-in-out border border-gray-300 rounded-full ">
                                <span className={`${selectedOption ? "" : "text-gray-400"} block truncate`}> {selectedOption ? selectedOption.label : placeholder}</span>
                                <span className="absolute inset-y-0 flex items-center pr-2 ml-3 pointer-events-none right-1">
                                    <img
                                        src={arrowDown}
                                        alt="arrow"
                                        className="text-black"
                                    />
                                </span>
                            </Listbox.Button>
                        </span>
                        <div className="absolute z-10 w-full px-3 bg-white rounded-md shadow-lg mb-11">
                            {/* bottom-0 will open the select menu up & mb-11 will put the dropup above the select option */}
                            <Transition
                                show={open}
                                leave="transition duration-100 ease-in"
                                leaveFrom="transform opacity-100"
                                leaveTo="transform opacity-0"
                            >
                                <Listbox.Options
                                    static
                                    className="py-1 overflow-auto text-sm rounded-md selectDropdown max-h-56 focus:outline-none sm:text-sm"
                                >
                                    {options.map((option, index) => {
                                        return (
                                            <Listbox.Option
                                                as={React.Fragment}
                                                key={option.id}
                                                value={option}
                                            >
                                                {({ active, selected }) => {
                                                    return (
                                                        <li
                                                            className={`${active
                                                                ? "text-black bg-green-50"
                                                                : "text-gray-900"
                                                                } cursor-default select-none relative ${(index == options.length - 1) ?
                                                                    ""
                                                                    : "border-b-2"
                                                                }  text-sm font-normal py-1  `}
                                                        >
                                                            <div className="flex items-center">
                                                                <span
                                                                    className={`${selected ? "font-semibold" : "font-normal"
                                                                        } flex items-center block truncate`}
                                                                >
                                                                    {option.label}
                                                                </span>

                                                            </div>
                                                        </li>
                                                    );
                                                }}
                                            </Listbox.Option>
                                        );
                                    })}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </div>
                </>
            )}
        </Listbox>
    );
};



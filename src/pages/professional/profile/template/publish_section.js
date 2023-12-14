import TitleBar from "../../../../components/titleBar";
import { useEffect, useState } from "react";
import EditProfile from "./popups/edit_profile";
import edit from "../../../../images/professional/edit.svg";
import { IoIosArrowDown } from "react-icons/io";
import profile from "../../../../images/professional/profile.jpg";

import { useProfessionalContext } from "../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../contexts/AuthContextProvider";
import { imageUrl } from "../../../../apis/base_url";
import ConfirmationProcessPopUp from "../../../../components/confirmation_process_popup";




export default function PublishSection({ id, type }) {
    const [showPublishPagePopUp, setShowPublishPagePopUp] = useState(false);
    const handlePublishPageProcess = () => {
        setShowPublishPagePopUp(false);
    };

    return <section>

        <div className="flex items-center justify-end w-full space-x-2">
            <button
                onClick={() => setShowPublishPagePopUp(true)}
                className="px-3 py-2 text-base font-normal rounded-md bg-customBlue bg-opacity-10 text-customBlue focus:ring-0 "
            >
                Publish Update
            </button>
            <button className="px-6 py-2 text-base font-normal text-black border rounded-md">
                Copy Template
            </button>
        </div>



        <ConfirmationProcessPopUp
            showModel={showPublishPagePopUp}
            setShowModel={setShowPublishPagePopUp}
            title={"Are you sure you want to publish the page?"}
            handleNo={() => setShowPublishPagePopUp(false)}
            handleYes={() => handlePublishPageProcess()}
        />


    </section>

}
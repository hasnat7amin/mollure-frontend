

import TitleBar from "../../../../components/titleBar";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import edit from "../../../../images/professional/edit.svg";
import EditService from "./popups/edit_service";
import { useProfessionalContext } from "../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../contexts/AuthContextProvider";
import EditGeneralNote from "./popups/edit_general_note";





export default function GeneralNoteSection({ id, type }) {
    const [showGeneralNoteSection, setShowGeneralNoteSection] = useState(true);
    const [showEditGeneralNoteModel, setShowEditGeneralNoteModel] = useState(false);

    const {
        generalNote,
        getGeneralNote,
        updateGeneralNote
    } = useProfessionalContext();
    const { token } = useAuthContext();

    const fetchGeneralNoteDetails = async () => {
        await getGeneralNote(token, id)
    }


    useEffect(() => {
        fetchGeneralNoteDetails();
    }, [id])
    return (
        <section>
            <div className="relative">
                <div
                    onClick={() => setShowGeneralNoteSection(!showGeneralNoteSection)}
                    className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
                >
                    <IoIosArrowDown
                        size={18}
                        color="white"
                        className={`${showGeneralNoteSection ? "" : ""}`}
                    />
                </div>
                <TitleBar title={"General Note"} />
                <div
                    className={`${showGeneralNoteSection ? "flex flex-col" : "hidden"}`}
                >
                    <div className="flex items-center justify-end w-full space-x-2">
                        {/* edit image */}
                        <img
                            src={edit}
                            alt="Edit"
                            onClick={() => setShowEditGeneralNoteModel(true)}
                            className="mt-5 mr-5 cursor-pointer"
                        />
                    </div>
                    {generalNote && <div className="px-3">
                        <div className="p-5 mt-3  w-full min-h-[15rem] text-base font-normal border border-gray-300 rounded-md flex flex-col space-y-5">
                            {generalNote &&
                                <p>
                                    {generalNote}
                                </p>
                            }
                        </div>
                    </div>
                    }
                </div>
            </div>
            {/* general Note */}
            <EditGeneralNote
                id={id}
                type={type}
                showModel={showEditGeneralNoteModel}
                setShowModel={setShowEditGeneralNoteModel}
            />
        </section>
    )
}
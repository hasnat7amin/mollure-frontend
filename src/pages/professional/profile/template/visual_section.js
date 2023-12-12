import TitleBar from "../../../../components/titleBar";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import edit from "../../../../images/professional/edit.svg";
import EditService from "./popups/edit_service";
import { useProfessionalContext } from "../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../contexts/AuthContextProvider";
import CustomAddButton from "../../../../components/custom_add_button";
import ConfirmationDeletePopUp from "../../../../components/confirmation_delete_popup";
import profile from "../../../../images/professional/profile.jpg";
import deleteIcon from "../../../../images/professional/delete_icon.svg";
import { imageUrl } from "../../../../apis/base_url";
import ErrorPopUp from "../../../../components/error_popup";
import AddImage from "./popups/add_image";
import SuccessPopUp from "../../../../components/success_popup";




export default function VisualsSection({ id, type }) {
    const [showVisualsSection, setShowVisualsSection] = useState(true);
    const [showAddImageModel, setShowAddImageModel] = useState(false);
    const [showDeleteVisualPopUp, setShowDeleteVisualPopUp] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const {
        visuals,
        getVisuals,
        deleteVisuals
    } = useProfessionalContext();
    const { token } = useAuthContext();
    const [showErrorModel, setShowErrorModel] = useState(false)
    const [error, setError] = useState(false);
    const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)


    // Function to handle checkbox selection
    const handleCheckboxChange = (imageId) => {
        if (selectedImages.includes(imageId)) {
            // If already selected, remove it from the list
            setSelectedImages(selectedImages.filter(id => id !== imageId));
        } else {
            // If not selected, add it to the list

            setSelectedImages([...selectedImages, imageId]);
        }
    };

    const handleVisualsDelete = () => {
        if (selectedImages.length === 0) {
            // Show error pop-up when no images are selected
            // Implement your logic to display an error message or a pop-up here
            setError("Select images first!"); // For demonstration
            setShowErrorModel(true);
            return;
        }
        else {

            setShowDeleteVisualPopUp(true);
        }
        // Continue with delete operation or perform other actions...
    };


    const handleVisualsDeleteConfirm = async () => {
        setError('');

        const response = await deleteVisuals(token, id, selectedImages);
        if (!response) {
            setError("Please check your credentials again.");

            setShowErrorModel(true);
        }
        else {

            //   setLoading(false);
            setShowSuccessPopUp(true)

        }

        setShowDeleteVisualPopUp(false);


    }


    const fetchVisualDetails = async () => {
        await getVisuals(token, id)
    }


    useEffect(() => {
        fetchVisualDetails();
    }, [id])


    return (
        <section>
            <div className="relative">
                <div
                    onClick={() => setShowVisualsSection(!showVisualsSection)}
                    className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
                >
                    <IoIosArrowDown
                        size={18}
                        color="white"
                        className={`${showVisualsSection ? "" : "rotate-180"}`}
                    />
                </div>
                <TitleBar title={"Visuals"} />
                <div className={`${showVisualsSection ? "flex flex-col" : "hidden"}`}>
                    {/* add service button  */}
                    <div className="flex items-center justify-end w-full py-5 border-b">
                        <CustomAddButton title={"Add Images"} handleClick={() => setShowAddImageModel(true)} />
                    </div>
                    {/* delete */}
                    {
                        visuals && visuals.length > 0 &&
                        <div className="flex items-center justify-end w-full space-x-2">
                            {/* edit image */}
                            <img
                                src={deleteIcon}
                                onClick={() => handleVisualsDelete()}
                                alt="delete"
                                className="mt-5 mr-5 cursor-pointer "
                            // onClick={toggleUpdateButtonVisibility}
                            />
                        </div>
                    }

                    <ConfirmationDeletePopUp
                        showModel={showDeleteVisualPopUp}
                        setShowModel={setShowDeleteVisualPopUp}
                        title={"Are you sure you want to delete these visuals?"}
                        handleCancel={() => { setShowDeleteVisualPopUp(false); setSelectedImages(null); }}
                        handleDelete={() => handleVisualsDeleteConfirm()}
                    />

                    {/* images list */}
                    <div className="flex flex-wrap items-center w-full gap-2 my-4 md:ml-2">
                        {
                            visuals && visuals.map(item => {
                                return <div key={item.id} className="relative md:w-[18.3rem] w-full h-[18.3rem] ">
                                    <img
                                        width={300}
                                        height={300}
                                        src={imageUrl + item.image}
                                        alt="Profile"
                                        className="object-cover object-center md:w-[18.3rem] w-full h-[18.3rem] rounded-md shadow-md  "
                                    />
                                    <div className="top-0 rounded-t-md opacity-[50%] absolute h-[5rem] w-full bg-gradient-to-b from-black to-[#FFFFFF00] " />
                                    <div className="absolute top-3 right-3 ">
                                        <input
                                            checked={selectedImages.includes(item.id)}
                                            onChange={() => handleCheckboxChange(item.id)}
                                            type="checkbox"
                                            className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                            })
                        }

                    </div>
                </div>
            </div>
            {/* error popup */}
            <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />
            {/* add image */}
            <AddImage
                id={id}
                type={type}
                showModel={showAddImageModel}
                setShowModel={setShowAddImageModel}
            />
            <SuccessPopUp title={"Images Deleted Successfully."} showModel={showSuccessPopUp} setShowModel={setShowSuccessPopUp} />

        </section>
    )
}
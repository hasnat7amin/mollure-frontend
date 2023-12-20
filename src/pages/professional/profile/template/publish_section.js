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

import ErrorPopUp from "../../../../components/error_popup";
import SuccessPopUp from "../../../../components/success_popup";



export default function PublishSection({ id, type }) {
    const [showPublishPagePopUp, setShowPublishPagePopUp] = useState(false);
    const [showCopyPagePopUp, setShowCopyPagePopUp] = useState(false);
    const [error, setError] = useState(false);
    const [title, setTitle] = useState("");
    const {
        userInfo,
        getUserInfo, editUserInfo } = useProfessionalContext();
    const [showErrorModel, setShowErrorModel] = useState(false)
    const [showSuccessModel, setShowSuccessModel] = useState(false)
    const { token } = useAuthContext();

    const {
        copyTemplate,
        publishTemplate
    } = useProfessionalContext();

    const fetchUserInfo = async () => {
        await getUserInfo(token)
      }


    useEffect(() => {
        fetchUserInfo();
      }, [])


    const handleCopyPageProcess = async () => {
        setError('');

        // setLoading(true);
        setTitle("");

        if (
            // !selectedImage ||
            !id

        ) {
            setError('Template Id in invalid.');
            // setLoading(false);
            setTitle("");
            setShowErrorModel(true);
            return;
        }

        if (
            // !selectedImage ||
            !token

        ) {
            setError('Token in invalid.');
            // setLoading(false);
            setTitle("");
            setShowErrorModel(true);
            return;
        }


        // const data = new FormData();
        // data.append('email', email);

        const response = await copyTemplate(token, id);
        if (!response) {
            setError("Please check your id or token again.");

            // setLoading(false);
            setShowErrorModel(true);
        }
        else {
            // navigate('/');
            setShowCopyPagePopUp(false)
            await getUserInfo(token)
            setTitle("Congratulation! Your Template is Copied.")
            setShowSuccessModel(true);

        }
        // setLoading(false);

    };

    const handlePublishPageProcess = async () => {
        setError('');

        // setLoading(true);
        setTitle("");

        if (
            // !selectedImage ||
            !id

        ) {
            setError('Template Id in invalid.');
            // setLoading(false);
            setTitle("");
            setShowErrorModel(true);
            return;
        }

        if (
            // !selectedImage ||
            !token

        ) {
            setError('Token in invalid.');
            // setLoading(false);
            setTitle("");
            setShowErrorModel(true);
            return;
        }


        const data = {};
        data['publish_status'] = id;

        const response = await publishTemplate(token, id, JSON.stringify(data));
        if (!response) {
            setError("Please check your id or token again.");
            // setLoading(false);
            setShowErrorModel(true);
        }
        else {
            // navigate('/')
            setShowPublishPagePopUp(false);
            setTitle("Congratulation! Your Template is Published.")
            setShowSuccessModel(true);

        }
        // setLoading(false);

    };


    return <section>
        <div className="flex items-center justify-end w-full space-x-2">
            <button
                onClick={() => setShowPublishPagePopUp(true)}
                className="px-3 py-2 text-base font-normal rounded-md bg-customBlue bg-opacity-10 text-customBlue focus:ring-0 "
            >
                Publish Update
            </button>
            {(userInfo && userInfo.fixed === 1 && userInfo.desired === 1) ? null : <button onClick={() => setShowCopyPagePopUp(true)} className="px-6 py-2 text-base font-normal text-black border rounded-md">
                Copy Template
            </button>}
        </div>



        <ConfirmationProcessPopUp
            showModel={showPublishPagePopUp}
            setShowModel={setShowPublishPagePopUp}
            title={"Are you sure you want to publish the page?"}
            handleNo={() => setShowPublishPagePopUp(false)}
            handleYes={() => handlePublishPageProcess()}
        />

        <ConfirmationProcessPopUp
            showModel={showCopyPagePopUp}
            setShowModel={setShowCopyPagePopUp}
            title={`Are you sure you want to copy the date from ${id == 1 ? "fixed" : "desired"} to ${id == 1 ? "desired" : "fixed"} location?`}
            handleNo={() => setShowCopyPagePopUp(false)}
            handleYes={() => handleCopyPageProcess()}
        />

        {/* error popup */}
        <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />
        {/* success popup */}
        <SuccessPopUp title={title} showModel={showSuccessModel} setShowModel={setShowSuccessModel} />


    </section>

}
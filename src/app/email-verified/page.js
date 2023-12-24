
import { useEffect } from "react";
import correct from "../../images/correct.svg";
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContextProvider";

export default function EmailVerified() {
    const navigate = useNavigate();
    const {logout} = useAuthContext();

    const handleClose = async () => {
        await logout();
        navigate("/");
    }
    useEffect(
        () => {
            let timeoutId;


            timeoutId = setTimeout(async() => {
                await logout();
                navigate("/");

            }, 1700); // Hides the popup after 30 seconds


            return () => {
                clearTimeout(timeoutId);
            };
        },
        []
    );

    return (
        <div>
            <div className=" z-50 w-full h-screen flex items-center justify-center">

                <div className="relative z-50 w-[95%] md:w-[22rem] mx-auto my-6">
                    <div className="relative px-2  py-4 bg-white rounded-lg shadow-lg">
                        <div className="flex h-full flex-col items-center justify-between gap-6 px-5 pt-8 pb-2  rounded-t">
                            <img src={correct} className="w-[6rem] h-[6rem]" alt="Correct" />
                            <h3 className="w-full px-5 mt-2 text-lg font-bold text-center text-softblue">
                                Email Verified Successfully
                            </h3>

                            {/* <button onClick={handleClose} className={`bg-customGreen text-white w-full py-3   rounded-md text-base font-medium`} >

                                Go To Home

                            </button> */}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

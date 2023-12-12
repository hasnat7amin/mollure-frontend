
import { useState } from "react";
import addIcon from "../images/professional/Add_Plus.svg";


export default function CustomAddSubServiceButton({ title, handleClick }) {

    const handleBtnClick = () => {
        handleClick();
    };


    return (
        <div className="">
            <button
                onClick={handleBtnClick}

                className="relative flex items-center px-1 py-1 space-x-1 text-white rounded-full group bg-gradient-to-r from-customGreen to-customBlue"
            >
                {/* add icon */}
                <img src={addIcon} alt="Add" />


                <div className="absolute border top-9 -left-10 p-2 rounded-lg shadow-xl w-[8rem] bg-white hidden group-hover:flex">
                    <p className="w-full text-sm font-normal text-center text-black">{title}</p>
                </div>



            </button>



        </div>
    );
}

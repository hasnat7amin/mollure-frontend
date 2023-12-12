
import { useState } from "react";
import addIcon from "../images/professional/Add_Plus.svg";


export default function CustomAddButton({ title, handleClick }) {

    const handleBtnClick = () => {
        handleClick();
    };


    return (
        <div className="">
            <button
                onClick={handleBtnClick}

                className="  relative cursor-pointer group h-[3.3rem] px-3.5 rounded-full group flex  items-center text-white bg-gradient-to-r from-customGreen to-customBlue"
            >
                {/* add icon */}
                <img src={addIcon} alt="Add" />


                <div className="absolute border top-14 -left-10 p-2 rounded-lg shadow-xl w-[8rem] bg-white hidden group-hover:flex">
                    <p className="w-full text-sm font-normal text-center text-black">{title}</p>
                </div>



            </button>



        </div>
    );
}

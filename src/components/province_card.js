
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';

export default function ProvinceCard({ title, options, }) {
    const [showDropdown, setShowDropdown] = useState(false)
    return (
        <div>
            {/* province cards list */}
            <ClickAwayListener onClickAway={() => setShowDropdown(false)}>

                <div className="relative flex border rounded-md ">
                    <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 p-2 cursor-pointer">
                        <p className="text-center">{title}</p>
                        <IoIosArrowDown
                            size={18}
                            color="black"
                            className={`${showDropdown ? '' : 'rotate-180'}`}
                        />
                    </div>

                    {showDropdown && <div className="absolute z-10 w-full px-3 bg-white rounded-md shadow-lg top-12 mb-11">

                        {options && options.map((option, index) => {
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
import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import arrowDown from "../images/arrow_down.svg";
import ClickAwayListener from "react-click-away-listener";

const MultiSelect = ({
  options,
  selectedOptions,
  handleSelect,
  placeholder
}) => {

  const [showDropDown, setShowDropDown] = useState(false)
 
  const handleAllSelection = () => {
    const allSelected = selectedOptions.length === options.length;
    handleSelect(allSelected ? [] : options);
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  console.log(options)
  return (
    <ClickAwayListener onClickAway={() => setShowDropDown(false)}>
      <div className="relative mt-1">
        <span className="inline-block w-full rounded-md shadow-sm">
          <div
            onClick={toggleDropDown}
            className="relative w-full py-3 pl-3 pr-8 mt-1 text-base font-normal text-left transition duration-150 ease-in-out border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white cursor-pointer"
          >
            <span className={`${selectedOptions?.length === 0 ? "text-gray-400" : ""} block truncate`}>
              {selectedOptions?.length === 0
                ? placeholder
                : selectedOptions?.length === options?.length
                  ? "All"
                  : `Selected (${selectedOptions?.length})`}
            </span>
            <span className="absolute inset-y-0 flex items-center pr-2 ml-3 pointer-events-none right-1">
              <img src={arrowDown} alt="arrow" />
            </span>
          </div>
        </span>

        {showDropDown && (
          <div className="absolute z-10 w-full px-3 bg-white rounded-md shadow-lg">
            <ul className="py-1 overflow-auto text-sm rounded-md selectDropdown max-h-56 focus:outline-none sm:text-sm">
              <li
                key="allOption"
                className="cursor-pointer select-none relative border-b-2 text-sm font-normal py-2"
                onClick={handleAllSelection}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-normal block truncate">
                    All
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedOptions.length === options.length}
                    className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                    readOnly
                  />
                </div>
              </li>
              {options.map(option => (
                <li
                  key={option.id}
                  className="cursor-pointer select-none relative border-b-2 text-sm font-normal py-2"
                  onClick={() => {
                    const isSelected = selectedOptions.some(val => val.id === option.id);
                    if (isSelected) {
                      handleSelect(selectedOptions.filter(val => val.id !== option.id));
                    } else {
                      handleSelect([...selectedOptions, option]);
                    }
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-normal block truncate">
                      {option.label}
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedOptions.some(val => val.id === option.id)}
                      className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                      readOnly
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default MultiSelect;

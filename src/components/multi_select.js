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
  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      // If all options are selected, clear the selection
      handleSelect([]);
    } else {
      // Otherwise, select all options
      const allOptionValues = options.map(option => option.value);
      handleSelect(options);
    }
  };

  return (
    <Listbox
      as="div"
    //   value={selectedOptions}
    //   onChange={selectedValues => handleSelect(selectedValues)}
    >
      {({ open }) =>
        <div className="relative mt-1">
          <span className="inline-block w-full rounded-md shadow-sm">
            <Listbox.Button onClick={() => setShowDropDown(!showDropDown)} className="relative w-full py-3 pl-3 pr-8 mt-1 text-base font-normal text-left transition duration-150 ease-in-out border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white">
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
            </Listbox.Button>
          </span>
          <ClickAwayListener onClickAway={() => setShowDropDown(false)}>
            <div  onClick={(e) => e.stopPropagation()} className="absolute z-10 w-full px-3 bg-white rounded-md shadow-lg mb-11">
              <Transition
                show={showDropDown}
                leave="transition duration-100 ease-in"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
              >
                <Listbox.Options
                  static
                  className="py-1 overflow-auto text-sm rounded-md selectDropdown max-h-56 focus:outline-none sm:text-sm"
                >
                  <Listbox.Option as={React.Fragment} key="select-all">
                    {({ active }) =>
                      <li
                        className={`${active
                          ? "text-black bg-green-50"
                          : "text-gray-900"} cursor-pointer select-none relative border-b-2 text-sm font-normal py-2 `}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div  onClick={(e) => e.stopPropagation()} className="flex flex-row-reverse items-center justify-between w-full">
                          <input
                            type="checkbox"
                            value={selectedOptions?.length === options?.length}
                            checked={selectedOptions?.length === options?.length}
                            className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                            onChange={(e) => {
                              e.stopPropagation();
                              handleSelectAll();
                            }}
                          />
                          <span
                            className={`${selectedOptions?.length === options?.length
                              ? "font-semibold"
                              : "font-normal"} flex items-center block truncate `}
                          >
                            All
                          </span>
                        </div>
                      </li>}
                  </Listbox.Option>
                  {options && options?.map(option =>
                    <Listbox.Option
                      as={React.Fragment}
                      key={option.id}
                      value={option.value}
                    >
                      {({ active, selected }) =>
                        <li
                          onClick={(e) => e.stopPropagation()}
                          className={`${active
                            ? "text-black bg-green-50"
                            : "text-gray-900"} cursor-pointer select-none relative border-b-2 text-sm font-normal py-2`}
                        >
                          <div  onClick={(e) => e.stopPropagation()} className="flex flex-row-reverse items-center justify-between w-full">
                            <div  onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={selectedOptions?.some(val => val.id === option.id)}
                                className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                                onChange={(e) => {
                                  e.stopPropagation();
                                  if (selectedOptions?.some(val => val.id === option.id)) {
                                    handleSelect(selectedOptions?.filter(val => val.id !== option.id));
                                  } else {
                                    handleSelect([...selectedOptions, option]);
                                  }
                                }}
                              />

                            </div>
                            <span
                              className={`font-normal flex items-center block truncate `}
                            >
                              {option.label}
                            </span>
                          </div>
                        </li>}
                    </Listbox.Option>
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </ClickAwayListener>

        </div>}
    </Listbox>
  );
};

export default MultiSelect;

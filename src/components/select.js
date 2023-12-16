// External Dependencies
import React from "react";
import { Listbox, Transition } from "@headlessui/react";

import  arrowDown from "../images/arrow_down.svg"



const Select = ({
  /* label, */
  options,
  selectedOption,
  handelChange,
  placeholder,
  disabled=false,
}) => {
  return (
    <Listbox
      as="div"
      //className={className}
      value={selectedOption}
      onChange={(event) => {
        console.log("enfant", event);
        handelChange(event);
      }}
    >
      {({ open }) => (
        <>
          {/*label && (
            <Listbox.Label className="mb-1 text-sm font-medium text-blue-gray-500">
              {label}
            </Listbox.Label>
          )*/}
          <div className="relative mt-1">
            <span className="inline-block w-full rounded-md shadow-sm">
              <Listbox.Button disabled={disabled} className={`relative w-full py-3 pl-3 pr-8 mt-1 text-base font-normal text-left transition duration-150 ease-in-out border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white ${
                  disabled ? "bg-[#3b3b3b0a] " : ""
                }`}>
                <span className={`${selectedOption ?"":"text-gray-400"} block truncate`}> {selectedOption ? selectedOption.label : placeholder }</span>
                <span className="absolute inset-y-0 flex items-center pr-2 ml-3 pointer-events-none right-1">
                  <img
                    src={arrowDown}
                    alt="arrow"
                  />
                </span>
              </Listbox.Button>
            </span>
            <div className="absolute z-10 overflow-auto max-h-56 w-full px-3 bg-white rounded-md selectDropdown shadow-lg mb-11">
              {/* bottom-0 will open the select menu up & mb-11 will put the dropup above the select option */}
              <Transition
                show={open}
                leave="transition duration-100 ease-in"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
              >
                <Listbox.Options

                  static
                  className="py-1  text-sm rounded-md  max-h-56 focus:outline-none sm:text-sm"
                >
                  {!disabled && options.map((option,index) => {
                    return (
                      <Listbox.Option
                        as={React.Fragment}
                        key={option.id}
                        value={option}
                      >
                        {({ active, selected }) => {
                          return (
                            <li
                              className={`${
                                active
                                  ? "text-black bg-green-50"
                                  : "text-gray-900"
                              } cursor-default select-none relative ${
                                (index == options.length-1)?
                                   "mb-2"
                                  : "border-b-2"
                              }  text-sm font-normal py-2  `}
                            >
                              <div className="flex items-center">
                                <span
                                  className={`${
                                    selected ? "font-semibold" : "font-normal"
                                  } flex items-center block truncate`}
                                >
                                  {option.label}
                                </span>
                              
                              </div>
                            </li>
                          );
                        }}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;

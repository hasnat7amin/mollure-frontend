
import React, { useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import arrowDown from "../images/arrow_down.svg";
import Select from "./select";
import ClickAwayListener from "react-click-away-listener";

const SelectWithInputs = ({
  options,
  selectedOption,
  handleSelect,
  placeholder
}) => {
  const [inputMintValue, setInputMintValue] = useState(null);
  const [inputHrValue, setInputHrValue] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleMintInputChange = e => {
    const value = e.target.value;
    setInputMintValue(value === '' ? null : value);
  };
  const handleHrInputChange = e => {
    const value = e.target.value;
    setInputHrValue(value === '' ? null : value);
  };

  const handleFocus = () => {
    setShowDropDown(true);
  };

  const handleSelectOption = () => {
    if (inputMintValue && inputMintValue.match(/^\d+$/) && !inputHrValue) {
      // Check if inputValue is a positive integer
      console.log("Checking 1st:", `${inputMintValue}mint`)
      const selectedValue = `${inputMintValue}mint`;
      handleSelect(selectedValue);
    } else if (inputHrValue && inputHrValue.match(/^\d+$/) && !inputMintValue) {
      // Check if inputValue is a positive integer
      console.log("Checking 2st:", `${inputHrValue}hr`)

      const selectedValue = `${inputHrValue}hr`;
      handleSelect(selectedValue);
    } else if (
      inputHrValue &&
      inputHrValue.match(/^\d+$/) &&
      inputMintValue &&
      inputMintValue.match(/^\d+$/)
    ) {
      // Check if inputValue is a positive integer
      console.log("Checking 3st:", `${inputHrValue}hr ${inputMintValue}mint`)

      const selectedValue = `${inputHrValue}hr ${inputMintValue}mint`;
      handleSelect(selectedValue);
    } else {
      handleSelect(null);
      // Handle input validation, e.g., show an error message
      console.error("Invalid input value. Please enter a positive integer.");
    }
  };

  const updateInputValues = () => {
    console.log("Updating input values", selectedOption);
    if (selectedOption) {
      const parts = selectedOption.split(" ");

      const hours = parts.find(part => part.includes("hr"));
      const minutes = parts.find(part => part.includes("mint"));

      const parsedHours = hours ? parseInt(hours) : null;
      const parsedMinutes = minutes ? parseInt(minutes) : null;

      setInputHrValue(parsedHours !== null ? String(parsedHours) : null);
      setInputMintValue(parsedMinutes !== null ? String(parsedMinutes) : null);

    }
  };

  useEffect(() => {
    updateInputValues();
  }, [selectedOption])

  useEffect(
    () => {
      handleSelectOption();
    },
    [inputMintValue, inputHrValue]
  );

  return (
    <ClickAwayListener onClickAway={() => setShowDropDown(false)}>
      <div>

        <div className="relative mt-1">
          <Listbox>
            <div className="inline-block w-full rounded-md shadow-sm">
              <Listbox.Button
                onClick={() => setShowDropDown(!showDropDown)}
                className="relative w-full py-3 pl-3 pr-8 mt-1 text-base font-normal text-left transition duration-150 ease-in-out border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
              >
                <span className={`${!selectedOption ? "text-gray-400" : ""} block truncate`}>
                  {selectedOption ? selectedOption : placeholder}
                </span>
                <span className="absolute inset-y-0 flex items-center pr-2 ml-3 pointer-events-none right-1">
                  <img src={arrowDown} alt="arrow" />
                </span>
              </Listbox.Button>
            </div>
          </Listbox>

          {showDropDown && <div className="absolute z-10 w-full px-3 bg-white rounded-md shadow-lg mb-11">

            <div className="py-1 text-sm list-none rounded-md selectDropdown max-h-56 focus:outline-none sm:text-sm">
              <div>
                <li
                  className={`text-gray-900 cursor-pointer select-none relative border-b-2 text-sm font-normal py-2 list-none`}
                >
                  <div className="flex flex-col items-center gap-2 md:flex-row">

                    <input
                      type="tel"
                      value={inputMintValue}
                      onChange={e => {
                        e.stopPropagation();
                        const re = /^\d*$/; // Regex pattern to allow only numbers
                        if (re.test(e.target.value)) {
                          handleMintInputChange(e);
                        }
                      }}
                      max={59}
                      maxLength={2}
                      min={0}
                      placeholder="mint"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                    <input
                      type="tel"
                      value={inputHrValue}
                      onChange={e => {
                        e.stopPropagation();
                        const re = /^\d*$/; // Regex pattern to allow only numbers
                        if (re.test(e.target.value)) {
                          handleHrInputChange(e);
                        }
                      }}
                      max={23}
                      maxLength={2}
                      min={0}
                      placeholder="hr"
                      className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                    />
                  </div>
                </li>
              </div>
            </div>

          </div>
          }

        </div>
      </div>
    </ClickAwayListener>
  );
};

export default SelectWithInputs;

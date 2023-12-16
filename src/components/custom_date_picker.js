import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ placeholder, onDateChange, value, disabled }) => {
  const [startDate, setStartDate] = useState(value);

  const handleChange = date => {
    console.log(JSON.stringify(date).toString())
    setStartDate(date);
    onDateChange(date); // Pass the selected date to the parent component
  };

  const updateStartDate = () => {
    setStartDate(value)
  }

  useEffect(() => {
    updateStartDate();
  }, [value])



  return (
    <DatePicker
      selected={startDate} // Set the selected date
      onChange={handleChange}
      disabled={disabled}
      placeholderText={placeholder}
      customInput={<input
        type="text"
        placeholder="Date"
        className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
      />}
      calendarStartDay={1}
      dateFormat="dd-MM-yyyy"
      calendarIconClassname="text-customGreen mt-2"
      calendarClassName="custom-calendar" // Apply custom calendar styles
    //   className="w-full px-3 py-3 mt-2 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
    />
  );
};

export default CustomDatePicker;

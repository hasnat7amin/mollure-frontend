
import { BsCamera } from "react-icons/bs";
import uploadIcon from "../../../../../images/professional/upload_icon.svg";
import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Select from "../../../../../components/select";

export default function FeatureTeamMember({ showModel, setShowModel }) {
  return (
    <div>
      {showModel &&
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setShowModel(false)}
            className="fixed inset-0 bg-black opacity-[66%]"
          />
          <div className="relative z-50 md:w-auto w-[95%] md:min-w-[28rem] mx-auto my-6">
            <div className="relative px-2 py-4 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col items-start gap-2 px-5 rounded-t">
                <h3 className="w-full text-lg font-bold text-center text-softblue">
                  Feature Team Member
                </h3>
              </div>
              <div className="px-5 pt-5">
                <form className="flex flex-col gap-2">
                  {/* only womens checkbox */}
                  <div className="flex items-center justify-between px-6">
                  <label
                      htmlFor="onlyWomen"
                      className="text-base font-normal cursor-pointer ms-2"
                    >
                      Feature Team member on public page
                    </label>
                    <input
                      type="checkbox"
                      id="onlyWomen"
                      className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer"
                    />
                  
                  </div>
                  

                  <button className="w-full gap-20 py-3 mt-8 mb-4 text-base font-medium text-white rounded-md bg-customGreen ">
                    Save
                  </button>
                </form>
              </div>
              <AiOutlineClose
                onClick={() => setShowModel(false)}
                className="absolute cursor-pointer top-5 right-5"
              />
            </div>
          </div>
        </div>}
    </div>
  );
}

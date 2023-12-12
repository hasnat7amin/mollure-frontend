
import { AiOutlineClose } from "react-icons/ai";
import correct from "../images/correct.svg";

import { useEffect } from "react";

export default function SuccessPopUp({
  showModel,
  setShowModel,
  title
}) {
  useEffect(
    () => {
      let timeoutId;

      if (showModel) {
        timeoutId = setTimeout(() => {
          setShowModel(false);
        }, 3000); // Hides the popup after 30 seconds
      }

      return () => {
        clearTimeout(timeoutId);
      };
    },
    [showModel]
  );
  return (
    <div>
      {showModel &&
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setShowModel(false)}
            className="fixed inset-0 bg-black opacity-[66%]"
          />
          <div className="relative z-50 w-[95%] md:w-[22rem] mx-auto my-6">
            <div className="relative px-2 py-4 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col items-center justify-center gap-2 px-5 py-8 rounded-t">
                <img src={correct} alt="Correct" />
                <h3 className="w-full px-5 mt-2 text-lg font-bold text-center text-softblue">
                  {title}
                </h3>
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

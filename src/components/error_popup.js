
import { AiOutlineClose } from "react-icons/ai";
import correct from "../images/false.svg";


export default function ErrorPopUp({ showModel, setShowModel, title }) {
 
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
              <div className="flex flex-col items-center justify-center gap-2 px-5 py-6 rounded-t">
                <img src={correct} alt="Correct" />
                <h3 className="w-full px-5 mt-2 text-lg font-bold text-center text-softblue">
                  {title}
                </h3>
              </div>
              <div className="px-5 ">
                <form className="flex flex-row gap-2">
                  <button
                    onClick={() => setShowModel(false)}
                    className="w-full gap-20 py-3 mt-8 mb-4 text-base font-medium text-white rounded-md bg-customGreen "
                  >
                    Ok
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

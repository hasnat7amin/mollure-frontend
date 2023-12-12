
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import spinner from "../images/spinner.svg";


export default function ConfirmationDeletePopUp({ showModel, setShowModel, handleDelete, title, handleCancel }) {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {showModel &&
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setShowModel(false)}
            className="fixed inset-0 bg-black opacity-[66%]"
          />
          <div className="relative z-50  w-[95%] md:w-[22rem] mx-auto my-6">
            <div className="relative px-2 py-4 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col items-start gap-2 px-5 rounded-t">
                <h3 className="w-full px-5 mt-4 text-lg font-bold text-center text-softblue">
                  {title}
                </h3>
              </div>
              <div className="px-5 pb-2 pt-7">
                <form className="flex flex-row gap-2">
                  <button onClick={handleCancel} className="w-full gap-20 py-3 mt-8 mb-4 text-base font-medium text-black bg-gray-300 rounded-md ">
                    Cancel
                  </button>

                  <button disabled={loading} onClick={async () => {
                    setLoading(true);
                    await handleDelete();
                    console.log("delete function excuted ")
                    setLoading(false);
                   

                  }} className="flex items-center justify-center w-full gap-20 py-3 mt-8 mb-4 text-base font-medium text-white rounded-md bg-customRed">
                    {
                      loading ?
                        <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Delete"
                    }
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

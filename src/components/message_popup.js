
import { AiOutlineClose } from "react-icons/ai";

export default function MessagePopUp({
  showModel,
  setShowModel,
  title,
}) {
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
              <div className="flex flex-col items-start gap-2 px-5 rounded-t">
              <h1 className="w-full px-5 my-2 text-2xl font-bold text-center text-softblue">
                  Message
                </h1>
                <h3 className="w-full px-5 my-3 text-lg font-medium text-center text-softblue">
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

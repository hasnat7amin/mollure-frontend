
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../contexts/AuthContextProvider";
import { useEffect } from "react";

export default function MessagePopUp({
  showModel,
  setShowModel,
  title,
  to = null,
  isLogout = false,
  closeAction = () => { },
}) {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  useEffect(
    () => {
      let timeoutId;

      if (showModel) {
        timeoutId = setTimeout(() => {
          setShowModel(false);
          closeAction();
          if (isLogout) {
            logout(); // Perform logout if isLogout is true
          }
          if (to) {
            navigate(to);
          }
        }, 2100); // Hides the popup after 30 seconds
      }

      return () => {
        clearTimeout(timeoutId);
      };
    },
    [showModel]
  );

  const handleClose = async () => {
    setShowModel(false);
    closeAction();
    if (isLogout) {
      logout(); // Perform logout if isLogout is true
    }
    if (to) {
      navigate(to);
    }

  }

  return (
    <div>
      {showModel &&
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={handleClose}
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
                onClick={handleClose}
                className="absolute cursor-pointer top-5 right-5"
              />
            </div>
          </div>
        </div>}
    </div>
  );
}


import info from "../images/Info.svg";
import ClickAwayListener from "react-click-away-listener";
import { useState } from "react";

export default function Info({ title, pb="pb-[2px]" }) {
  const [isTitleVisible, setTitleVisible] = useState(false);

  const handleImageClick = () => {
    setTitleVisible(!isTitleVisible);
  };

  const handleClickAway = () => {
    setTitleVisible(false);
  };
  return (
    <div className="relative cursor-pointer group">
      <img className={`${pb}`} src={info} alt={"Info"} onClick={handleImageClick} />


      {isTitleVisible && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className="z-50 absolute top-5 -left-10 p-2 rounded-lg shadow-xl w-[8rem] bg-white">
            <p className="text-sm font-normal text-black">{title}</p>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

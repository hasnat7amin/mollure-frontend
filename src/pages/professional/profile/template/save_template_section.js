import spinner from "../../../../images/spinner.svg";

import { useState } from "react";


export default function SaveTemplateSection({id,type}) {
  const [loading, setLoading] = useState(false);



  const handleSave = () => {
    console.log("Card Saved");
  };

  return (
    <section className="w-full">
      <div className="w-full flex items-center justify-center">
        <button style={{boxShadow:"inset 6px 6px 6px rgba(255, 255, 255, 0.2)"}} disabled={loading} onClick={handleSave} className={`${loading ? "bg-gray-100  flex items-center justify-center" : "bg-gradient-to-br from-customGreen to-customBlue"} text-white  w-max mx-auto py-3 px-20   mt-20 mb-10  rounded-full text-base font-medium shadow-md   shadow-customGreen `} >
          {
            loading ?
              <img src={spinner} alt="Loading" width={28} height={28} className="animate-spin " /> : "Submit"
          }
        </button>
      </div>
      

    </section>
  );
}



import React, { useState } from "react";
import FixedLocation from "./fixed_location";
import DesiredLocation from "./desired_location";
import { useProfessionalContext } from "../../../../contexts/ProfessionalContextProvider";


export default function Template() {
  

  const tabs = [
    { name: "Fixed Location", component: <FixedLocation /> },
    { name: "Desired Location", component: <DesiredLocation /> }
  ];
  return (
    <section className="relative">
      <main className="w-full">
        <div className="pt-4 ">
          <SubTabs tabs={tabs} gridClasses={"grid md:grid-cols-2 grid-cols-1 divide-x  border rounded-md"} bgColor={"bg-customGreen"} />
        </div>
      </main>
    </section>
  );
}



function SubTabs({ gridClasses,tabs,bgColor}) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const { userInfo } = useProfessionalContext();

  return (
    <div>
      <div className={gridClasses}>
        {tabs.map((tab, index) => (
          <div key={index} className="w-full p-0.5 ">
            <button
              onClick={() => handleTabClick(index)}
              className={`w-full py-3 font-semibold md:text-xl text-lg rounded-md   ${
                activeTab === index
                  ?  `${bgColor} text-white`
                  : ` text-black ${index==0?userInfo?.fixed==0?"bg-gray-300":"bg-white":userInfo?.desired==0?"bg-gray-300":"bg-white"}`
              }`}
            >
              {tab.name}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">{tabs[activeTab].component}</div>
    </div>
  );
}

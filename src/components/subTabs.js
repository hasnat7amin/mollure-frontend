// components/Tabs.js

import React, { useState } from "react";

export default function SubTabs({ gridClasses,tabs,bgColor}) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

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
                  : "bg-white text-black"
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

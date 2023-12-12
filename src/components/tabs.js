// components/Tabs.js

import React, { useState } from 'react';

export default function Tabs ({tabs}) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex items-center w-full overflow-auto md:justify-around md:overflow-hidden">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`md:px-2 md:py-8 py-4 px-6 font-bold text-xl  ${activeTab === index ? ' text-black' : 'text-gray-400'}`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-[#21B8BF] to-[#66C68F]">
      </div>
      <div className="mt-4">{tabs[activeTab].component}</div>
    </div>
  );
};


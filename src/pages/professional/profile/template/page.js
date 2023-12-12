
import SubTabs from "../../../../components/subTabs";
import React from "react";
import FixedLocation from "./fixed_location";
import DesiredLocation from "./desired_location";


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

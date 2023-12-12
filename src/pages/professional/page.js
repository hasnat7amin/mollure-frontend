
import SubTabs from "../../components/subTabs";
import React from "react";
import UserInfo from "./profile/userInfo/page";
import Template from "./profile/template/page";

export default function ProfessionalProfile() {
  const TabBody2 = () => <div>Tab 2 Content</div>;

  const tabs = [
    { name: "User Info", component: <UserInfo /> },
    { name: "Professional Template", component: <Template /> }
  ];
  return (
    <section className="relative">
      <main className="w-full">
        <div className="pt-4 ">
          <SubTabs tabs={tabs} gridClasses={"grid md:grid-cols-2 grid-cols-1 divide-x  border rounded-md"} bgColor={"bg-customBlue"} />
        </div>
      </main>
    </section>
  );
}

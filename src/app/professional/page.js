
import Navbar from "../../components/navbar";
import Tabs from "../../components/tabs";

import ProfessionalProfile from "../../pages/professional/page";

export default function Professional() {
  const TabBody1 = () => <div>Tab 1 Content</div>;
  const TabBody2 = () => <div>Tab 2 Content</div>;
  const TabBody3 = () => <div>Tab 3 Content</div>;
  const TabBody4 = () => <div>Tab 3 Content</div>;
  const TabBody5 = () => <div>Tab 3 Content</div>;

  const tabs = [
    { name: "Profile", component: <ProfessionalProfile /> },
    { name: "Calender", component: <TabBody2 /> },
    // { name: "Inbox", component: <TabBody3 /> },
    { name: "Transactions", component: <TabBody4 /> },
    { name: "Analytics", component: <TabBody5 /> }
  ];

  return (
    <section className="relative md:p-0 px-3 min-h-[97.7vh] md:min-h-[97vh]">
      <div className="md:w-[85%] mx-auto w-full">
        <Navbar />
        <main className="">
          <div className="">
            <Tabs tabs={tabs} />
          </div>
        </main>
      </div>
    </section>
  );
}

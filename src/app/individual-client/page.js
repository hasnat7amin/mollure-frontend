
import Navbar from "../../components/navbar";
import Tabs from "../../components/tabs";
import ClientFavourites from "../../pages/individual-client/favourite/page";


import IndividualClientProfile from "../../pages/individual-client/profile/page";

export default function IndividualClient() {
  const TabBody1 = () => <div>Tab 1 Content</div>;
  const TabBody2 = () => <div>Tab 2 Content</div>;
  const TabBody3 = () => <div>Tab 3 Content</div>;
  const TabBody4 = () => <div>Tab 3 Content</div>;
  const TabBody5 = () => <div>Tab 3 Content</div>;

  const tabs = [
    { name: "Profile", component: <IndividualClientProfile /> },
    { name: "Booking", component: <TabBody2 /> },
    // { name: "Inbox", component: <TabBody3 /> },
    { name: "Favourites", component: <ClientFavourites /> },
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

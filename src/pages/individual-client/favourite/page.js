import profile from "../../../images/professional/profile.jpg";

import { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import ReactStars from "react-rating-stars-component";



export default function ClientFavourites() {
    return (
        <section className="flex flex-wrap items-center justify-center gap-2 mb-2">
            <Card />
            <Card />

            <Card />
            <Card />

            <Card />
            <Card />

        </section>
    )
}

function Card() {
    const [activeTab, setActiveTab] = useState(0);


    const tabs = [
        { name: "Fixed Location", component: <FixedLocationServicesCard /> },
        { name: "Desired Location", component: <DesiredLocationServicesCard /> }
    ];

    const handleTabClick = (index) => {
        setActiveTab(index);
    };


    return (
        <section className="w-full md:w-[25rem] ">
            <div className="border rounded-md p-2.5 flex flex-col gap-2.5 flex-shrink-0 items-center justify-center">
                {/* image */}
                <div className="relative w-full h-[15.1rem] ">
                    <img
                        src={profile}
                        alt="Profile"
                        className="object-cover object-center  w-full h-[15.1rem] rounded-md shadow-md  "
                    />
                    <div className="top-0 rounded-t-md opacity-[50%] absolute h-[5rem] w-full bg-gradient-to-b from-black to-[#FFFFFF00] " />
                    <div className="absolute bg-white p-1.5 rounded-full top-3 right-3 bg-opacity-[65%]">
                        <FaHeart color="#21B8BF" size={18} />
                    </div>
                </div>

                {/* tags */}
                <div className="flex items-center justify-center gap-2.5 flex-wrap text-sm font-normal text-gray-400">
                    <p>Lorem Ipsum</p>
                    <div className="h-3.5 border border-gray-400" />
                    <p>Lorem</p>
                    <div className="h-3.5 border border-gray-400" />
                    <p>Lorem Ipsum</p>
                </div>

                {/* title */}
                <h1 className="px-5 text-xl font-medium text-center">Lorem ipsum dolor sit amet consectetur.</h1>
                {/* stars */}
                <ReactStars
                    classNames={"flex gap-2"}
                    size={18}
                    value={2.5}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                // emptyIcon={<i className="far fa-star" />}
                // halfIcon={<i className="fa fa-star-half-alt" />}
                // filledIcon={<i className="fa fa-star" />}
                />

                {/* reviews */}
                <p className="text-sm font-normal text-center text-gray-400">
                    120 reviews
                </p>

                {/* tabs row */}
                <div className={"flex flex-row w-full  border rounded-md"}>
                    {tabs.map((tab, index) => (
                        <div key={index} className="w-full p-0.5 ">
                            <button
                                onClick={() => handleTabClick(index)}
                                className={`w-full px-4 py-3 font-medium text-sm rounded-md   ${activeTab === index
                                    ? `bg-customGreen text-white`
                                    : "bg-white text-black"
                                    }`}
                            >
                                {tab.name}
                            </button>
                        </div>
                    ))}
                </div>

                {/* services */}
                <div className="w-full">{tabs[activeTab].component}</div>

                {/* // next button */}
                <div className="flex items-center w-full">
                <button
                    
                    className="px-2 py-1 text-xs font-medium text-white rounded-md bg-customBlue bg-opactiy-50"
                  >
                    Read More ...
                  </button>
                </div>





            </div>



        </section>
    )
}

function FixedLocationServicesCard() {
    return (
        <div className="flex flex-col w-full gap-3">
            {/* service 1 */}
            <div className="flex items-start justify-between w-full">
                <div className="flex flex-col w-full gap-0.5" >
                    <p className="text-base font-normal text-black">Service 1</p>
                    <p className="text-sm font-normal text-gray-500">30-40 Min</p>
                </div>
                <p className="w-full text-base font-normal text-right text-black"> Starting from 23 EUR</p>
            </div>

            {/* service 1 */}
            <div className="flex items-start justify-between w-full">
                <div className="flex flex-col w-full gap-0.5" >
                    <p className="text-base font-normal text-black">Service 1</p>
                    <p className="text-sm font-normal text-gray-500">30-40 Min</p>
                </div>
                <p className="w-full text-base font-normal text-right text-black"> Starting from 23 EUR</p>
            </div>


            {/* service 1 */}
            <div className="flex items-start justify-between w-full">
                <div className="flex flex-col w-full gap-0.5" >
                    <p className="text-base font-normal text-black">Service 1</p>
                    <p className="text-sm font-normal text-gray-500">30-40 Min</p>
                </div>
                <p className="w-full text-base font-normal text-right text-black"> Starting from 23 EUR</p>
            </div>

        </div>

    )
}

function DesiredLocationServicesCard() {
    return (
        <div className="flex flex-col w-full gap-3">
            {/* service 1 */}
            <div className="flex items-start justify-between w-full">
                <div className="flex flex-col w-full gap-0.5" >
                    <p className="text-base font-normal text-black">Service 1</p>
                    <p className="text-sm font-normal text-gray-500">30-40 Min</p>
                </div>
                <p className="w-full text-base font-normal text-right text-black"> Starting from 23 EUR</p>
            </div>

            {/* service 1 */}
            <div className="flex items-start justify-between w-full">
                <div className="flex flex-col w-full gap-0.5" >
                    <p className="text-base font-normal text-black">Service 1</p>
                    <p className="text-sm font-normal text-gray-500">30-40 Min</p>
                </div>
                <p className="w-full text-base font-normal text-right text-black"> Starting from 23 EUR</p>
            </div>

             {/* service 1 */}
             <div className="flex items-start justify-between w-full">
                <div className="flex flex-col w-full gap-0.5" >
                    <p className="text-base font-normal text-black">Service 1</p>
                    <p className="text-sm font-normal text-gray-500">30-40 Min</p>
                </div>
                <p className="w-full text-base font-normal text-right text-black"> Starting from 23 EUR</p>
            </div>
            
        </div>

    )
}
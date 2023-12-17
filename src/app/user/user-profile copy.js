
import TitleBar from '../../../components/titleBar';
import edit from '../../../images/professional/edit.svg';
import deleteIcon from '../../../images/professional/delete_icon.svg';
import category1 from '../../../images/professional/category1.svg';
import addIcon from '../../../images/professional/Add_Plus.svg';
import profile from '../../../images/professional/profile.jpg';
import cardFrameTopLeft from '../../../images/professional/Frame20.svg';
import cardFrameBottomRight
    from '../../../images/professional/Frame19.svg';

import Info from '../../../components/info';
import ReactStars from 'react-rating-stars-component';
import Select from '../../../components/select';
import { IoIosArrowDown } from 'react-icons/io';
import { useRef, useState } from 'react';
import ConfirmationDeletePopUp from '../../../components/confirmation_delete_popup';
import Navbar from "../../../components/navbar";
import CustomAddButton from '../../../components/custom_add_button';
import ProvinceCard from '../../../components/province_card';
import CustomAddSubServiceButton from '../../../components/custom_add_sub_service';
import SubTabs from '../../../components/subTabs';

export default function UserProfile() {
    const provinceOptions = [
        { id: 'drenthe', label: 'Drenthe', value: 'drenthe' },
        { id: 'florida', label: 'Florida', value: 'florida' },
        { id: 'other', label: 'Other', value: 'other' },
    ];
    const [currentProvinceSelected, setCurrentProvinceSelected] = useState(
        provinceOptions[0]
    );

    const [setshowProfileSection, setSetshowProfileSection] = useState(true);
    const [showFixedLocationSection, setShowFixedLocationSection] = useState(
        true
    );
    const [showServiceForSection, setShowServiceForSection] = useState(true);
    const [showCategoriesSection, setShowCategoriesSection] = useState(true);
    const [showGeneralNoteSection, setShowGeneralNoteSection] = useState(true);
    const [showTeamMemberSection, setShowTeamMemberSection] = useState(true);
    const [showVisualsSection, setShowVisualsSection] = useState(true);
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showSubServices, setShowSubServices] = useState(true);

    const toggleSubServices = () => {
        setShowSubServices(prevState => !prevState); // Toggle the visibility of sub-services
    };

    // show models states
    const [showEditProfileModel, setShowEditProfileModel] = useState(false);
    const [showAddLocationModel, setShowAddLocationModel] = useState(false);
    const [showEditLocationModel, setShowEditLocationModel] = useState(false);
    const [showEditServiceModel, setShowEditServiceModel] = useState(false);
    const [showEditGeneralNoteModel, setShowEditGeneralNoteModel] = useState(
        false
    );
    const [showAddTeamMemberModel, setShowAddTeamMemberModel] = useState(false);
    const [showEditTeamMemberModel, setShowEditTeamMemberModel] = useState(
        false
    );
    const [showFeatureTeamMemberModel, setShowFeatureTeamMemberModel] = useState(
        false
    );
    const [showAddImageModel, setShowAddImageModel] = useState(false);
    const [showAddSubServiceModel, setShowAddSubServiceModel] = useState(false);
    const [showAddServiceModel, setShowAddServiceModel] = useState(false);
    const [showEditOperatingAreaModel, setShowEditOperatingAreaModel] = useState(false);

    // popup states
    const [showDeleteVisualPopUp, setShowDeleteVisualPopUp] = useState(false);
    const [showPublishPagePopUp, setShowPublishPagePopUp] = useState(false);

    const [activeTab, setActiveTab] = useState(0);


    const tabs = [
        { name: "Fixed Location", component: <FixedLocationCard /> },
        { name: "Desired Location", component: <DesiredLocationCard /> }
    ];

    // handle popus functions
    const handleVisualsDelete = () => {
        setShowDeleteVisualPopUp(false);
    };

    const handlePublishPageProcess = () => {
        setShowPublishPagePopUp(false);
    };

    const cardData = [
        { id: 1, category: 'Hair', imageUrl: 'category1.jpg' },
        { id: 2, category: 'Skin', imageUrl: 'category2.jpg' },
        { id: 3, category: 'Nails', imageUrl: 'category3.jpg' },
        { id: 4, category: 'Makeup', imageUrl: 'category4.jpg' },
        { id: 5, category: 'Fragrance', imageUrl: 'category5.jpg' },
        { id: 6, category: 'Skincare', imageUrl: 'category6.jpg' },
        { id: 7, category: 'Body', imageUrl: 'category7.jpg' },
        { id: 8, category: 'Tools', imageUrl: 'category8.jpg' },
        { id: 9, category: 'Men', imageUrl: 'category9.jpg' },
        { id: 10, category: 'Gifts', imageUrl: 'category10.jpg' },
        { id: 11, category: 'Hair Care', imageUrl: 'category11.jpg' },
        { id: 12, category: 'Bath & Shower', imageUrl: 'category12.jpg' },
        { id: 13, category: 'Sun Care', imageUrl: 'category13.jpg' },
        { id: 14, category: 'Health', imageUrl: 'category14.jpg' },
        { id: 15, category: 'Fragrance', imageUrl: 'category15.jpg' },
        { id: 16, category: 'Accessories', imageUrl: 'category16.jpg' },
        { id: 17, category: 'Oral Care', imageUrl: 'category17.jpg' },
        { id: 18, category: 'Gift Sets', imageUrl: 'category18.jpg' },
        { id: 19, category: 'Shaving', imageUrl: 'category19.jpg' },
        { id: 20, category: 'Specials', imageUrl: 'category20.jpg' },
    ];

    const handleMouseDown = e => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        e.preventDefault(); // Prevent text selection
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = e => {
        if (!isDragging) return;
        const x = e.pageX - containerRef.current.offsetLeft;
        const dragDistance = x - startX;
        containerRef.current.scrollLeft = scrollLeft - dragDistance;
        setScrollLeft(scrollLeft - dragDistance);
        setStartX(x);
    };

    const handleCardClick = () => {
        console.log('Card clicked');
    };



    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <section className="relative md:p-0 px-3 min-h-[97.7vh] md:min-h-[97vh]">
            <div className="md:w-[85%] mx-auto w-full">
                <Navbar />
                <main className="">
                    <section className="w-full ">



                        {/* profile section */}
                        <div className="relative">
                            <div
                                onClick={() => setSetshowProfileSection(!setshowProfileSection)}
                                className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
                            >
                                <IoIosArrowDown
                                    size={18}
                                    color="white"
                                    className={`${setshowProfileSection ? '' : 'rotate-180'}`}
                                />
                            </div>
                            <TitleBar title={'Profile'} />
                            <div
                                className={`${setshowProfileSection ? 'flex flex-col' : 'hidden'}`}
                            >

                                <div className="flex flex-col items-center gap-5 m-5 md:flex-row md:items-start">
                                    {/* image */}
                                    <img
                                        src={profile}
                                        alt="Profile"
                                        className="  rounded-full object-contain object-center  cursor-pointer w-[7.9rem]  h-[7.9rem] "
                                    />
                                    {/* text */}
                                    <div className="flex flex-col w-full space-y-2">
                                        <p className="w-full px-3 py-3 text-base font-normal border border-gray-300 rounded-md ">
                                            Craig Martha
                                        </p>
                                        <p className="w-full px-3 py-3 text-base font-normal border border-gray-300 rounded-md ">
                                            Lorem ipsum dolor sit amet consectetur. Commodo ut vestibulum
                                            praesent duis. Imperdiet nunc quisque vitae ante ornare
                                            imperdiet diam sed. Pretium ut malesuada velit convallis tortor
                                            nulla mattis amet. Lectus nulla integer libero ornare aliquam
                                            sagittis posuere. Nec lacinia aliquet quam suspendisse.
                                            Elementum nunc ac sit id vel. Non facilisis dictumst egestas
                                            sit.
                                        </p>
                                        <div className="flex flex-col w-full gap-2 md:flex-row">
                                            <p className="w-full px-3 py-3 text-base font-normal border border-gray-300 rounded-md md:w-1/3 ">
                                                Craig Martha
                                            </p>
                                            <p className="w-full px-3 py-3 text-base font-normal border border-gray-300 rounded-md md:w-1/3 ">
                                                Craig Martha
                                            </p>
                                            <p className="w-full px-3 py-3 text-base font-normal border border-gray-300 rounded-md md:w-1/3 ">
                                                Craig Martha
                                            </p>
                                        </div>


                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <div className="flex items-center justify-center gap-2">
                                            <ReactStars
                                                classNames={"flex space-x-2"}
                                                size={18}
                                                value={2.5}
                                                edit={false}
                                                isHalf={true}
                                                activeColor="#ffd700"
                                            // emptyIcon={<i className="far fa-star" />}
                                            // halfIcon={<i className="fa fa-star-half-alt" />}
                                            // filledIcon={<i className="fa fa-star" />}
                                            />
                                            <p className="text-sm font-normal text-gray-400 w-max">
                                                120 reviews
                                            </p>
                                        </div>
                                        <div className={"flex flex-row w-max  border rounded-md"}>
                                            {tabs.map((tab, index) => (
                                                <div key={index} className="w-max p-0.5 ">
                                                    <button
                                                        onClick={() => handleTabClick(index)}
                                                        className={`w-max px-4 py-3 font-semibold text-base rounded-md   ${activeTab === index
                                                            ? `bg-customGreen text-white`
                                                            : "bg-white text-black"
                                                            }`}
                                                    >
                                                        {tab.name}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* location card */}
                        {/* <SubTabs tabs={tabs} gridClasses={"grid md:grid-cols-2 grid-cols-1 divide-x  border rounded-md"} bgColor={"bg-customGreen"} /> */}
                        <div className="mt-4">{tabs[activeTab].component}</div>
                        {/* <DesiredLocationCard />
                        <FixedLocationCard /> */}

                        {/* service for */}
                        <div className="relative">
                            <div
                                onClick={() => setShowServiceForSection(!showServiceForSection)}
                                className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
                            >
                                <IoIosArrowDown
                                    size={18}
                                    color="white"
                                    className={`${showServiceForSection ? "" : "rotate-180"}`}
                                />
                            </div>
                            <TitleBar title={"Service For"} />
                            <div
                                className={`${showServiceForSection ? "flex flex-col" : "hidden"}`}
                            >

                                {/* text */}
                                <div className="flex flex-wrap items-center w-full gap-2 mt-3 ms-2 ">
                                    <p className="px-3 py-3 text-base font-normal border border-gray-300 rounded-md flex-nowrap">
                                        only womens
                                    </p>
                                    <p className="px-3 py-3 text-base font-normal border border-gray-300 rounded-md flex-nowrap">
                                        only mens
                                    </p>
                                    <p className="px-3 py-3 text-base font-normal border border-gray-300 rounded-md flex-nowrap">
                                        only kids
                                    </p>
                                    <p className="px-3 py-3 text-base font-normal border border-gray-300 rounded-md flex-nowrap">
                                        kids
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* categories and sub services */}
                        <div className="relative">
                            <div
                                onClick={() => setShowCategoriesSection(!showCategoriesSection)}
                                className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
                            >
                                <IoIosArrowDown
                                    size={18}
                                    color="white"
                                    className={`${showCategoriesSection ? "" : "rotate-180"}`}
                                />
                            </div>
                            <TitleBar title={"Categories & Subservices"} />
                            <div
                                className={`${showCategoriesSection ? "flex flex-col" : "hidden"}`}
                            >
                                <div>
                                    <div
                                        ref={containerRef}
                                        onMouseDown={handleMouseDown}
                                        onMouseUp={handleMouseUp}
                                        onMouseMove={handleMouseMove}
                                        style={{
                                            display: "flex",
                                            overflowX: "scroll",
                                            userSelect: "none", // Disable text selection
                                            cursor: isDragging ? "grabbing" : "grab"
                                        }}
                                        className="flex items-center pt-5 pb-5 space-x-3 overflow-x-scroll cursor-pointer no-scrollbar "
                                    >
                                        {/* card */}
                                        {cardData.map(card =>
                                            <div
                                                key={card.id}
                                                onClick={handleCardClick}
                                                className="w-[11rem] flex flex-col items-center justify-center flex-shrink-0 px-2 py-4 space-y-3 rounded-md shadow-md hover:bg-gradient-to-b hover:from-customBlue hover:to-customGreen hover:text-white group"
                                            >
                                                <img
                                                    src={category1}
                                                    alt="Edit"
                                                    className="cursor-pointer group-hover:text-white "
                                                    style={{ cursor: "grab" }}
                                                    onDragStart={e => e.preventDefault()}
                                                // onClick={toggleUpdateButtonVisibility}
                                                />
                                                <p className="text-sm font-medium line-clamp-1">Hair</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* body retreatment */}
                                <div className="mx-4">
                                    <TitleBar title={"Body Treatment"} />

                                    {/* table */}
                                    <div className="overflow-x-scroll md:overflow-hidden">
                                        <div className="md:w-full w-[60rem]">
                                            {/* titles  */}
                                            <div className="flex items-center justify-between my-4">
                                                <p className="w-full py-2 text-lg font-semibold text-center border-r">
                                                    ( Sub ) Service Name
                                                </p>
                                                <p className="w-full py-2 text-lg font-semibold text-center border-r">
                                                    Duration
                                                </p>
                                                <p className="w-full py-2 text-lg font-semibold text-center border-r">
                                                    Price
                                                </p>
                                                <p className="w-full py-2 text-lg font-semibold text-center ">
                                                    Units
                                                </p>
                                            </div>
                                            {/* body */}
                                            <div className="flex flex-col ">
                                                {/* category 1 */}
                                                <div>
                                                    <div className="flex items-center w-full h-[6rem] justify-center text-customBlue bg-customBlue bg-opacity-5">
                                                        <div className="flex w-full h-full ">
                                                            <div className="w-2 bg-customBlue rounded-r-md" />
                                                            <p className="flex items-center justify-center w-full h-full text-lg font-normal text-center border-r ms-2 ">
                                                                Body Message
                                                            </p>
                                                        </div>
                                                        <p className="flex items-center justify-center w-full h-full text-lg font-normal text-center border-r">
                                                            1hr - 2hr
                                                        </p>
                                                        <div className="flex flex-col items-center justify-center w-full h-full space-y-1 text-lg font-normal text-center border-r">
                                                            <p>
                                                                <span className="text-sm line-through">60 EUR</span> 40
                                                                EUR
                                                            </p>
                                                            <div className="flex items-center justify-center space-x-2">
                                                                <span>Discount 20 EUR </span>

                                                                <Info title={"Discover More"} />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-center w-full h-full space-x-2 font-semibold ">

                                                            <button
                                                                onClick={toggleSubServices}
                                                                className="bg-customBlue rounded-full cursor-pointer p-1.5 bg-opacity-20 "
                                                            >
                                                                <IoIosArrowDown
                                                                    size={19}
                                                                    className={`${showSubServices
                                                                        ? ""
                                                                        : "rotate-180"} text-customBlue`}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* subcategories */}
                                                    {showSubServices &&
                                                        <div className="flex flex-col ">
                                                            <div className="flex items-center w-full border-b h-[3rem] justify-center  bg-opacity-5">
                                                                <div className="flex w-full h-full ">
                                                                    <p className="flex items-center justify-center w-full h-full text-lg font-normal border-r ms-3 ">
                                                                        Body Message
                                                                    </p>
                                                                </div>
                                                                <p className="flex items-center justify-center w-full h-full text-lg font-normal text-center border-r">
                                                                    1hr - 2hr
                                                                </p>
                                                                <div className="flex flex-col items-center justify-center w-full h-full space-y-1 text-lg font-normal text-center border-r">
                                                                    <p>60 EUR</p>
                                                                </div>
                                                                <div className="flex items-center justify-center w-full h-full gap-3 font-normal ">
                                                                    <input
                                                                        type="radio"
                                                                        name="subcategoryRadio"
                                                                        id="subcategoryRadio"
                                                                        className="flex items-center justify-center w-5 h-5 border rounded-full appearance-none checked:bg-none focus:outline-0 focus:ring-white bg-none outline-0"
                                                                        checked={true} // Replace isChecked with your state variable to determine if the input is checked
                                                                        // onChange={handleChange} // Replace handleChange with your function to handle input change
                                                                        style={{
                                                                            border: true ? "1px solid #21B8BF":"none",
                                                                            borderColor: true ? '#21B8BF' : '#D9D9D9',
                                                                            backgroundColor: true ? '#21B8BF' : 'transparent',
                                                                            backgroundImage: "none",
                                                                            padding: true ? "5px":"0px",
                                                                        }}        
                                                                    />
                                                                    {/* Decrease Button */}
                                                                    <button
                                                                        className="flex items-center justify-center w-6 h-6 pb-1 m-0 text-2xl font-extrabold text-center border border-gray-400 rounded-full text-customBlue"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <p className="text-base text-customBlue ">3</p>
                                                                    {/* Increase Button */}
                                                                    <button
                                                                        className="flex items-center justify-center w-6 h-6 p-0 m-0 text-2xl font-extrabold border border-gray-400 rounded-full text-customBlue"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                        {/* general note */}
                        <div className="relative">
                            <div
                                onClick={() => setShowGeneralNoteSection(!showGeneralNoteSection)}
                                className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
                            >
                                <IoIosArrowDown
                                    size={18}
                                    color="white"
                                    className={`${showGeneralNoteSection ? "" : "rotate-180"}`}
                                />
                            </div>
                            <TitleBar title={"General Note"} />
                            <div
                                className={`${showGeneralNoteSection ? "flex flex-col" : "hidden"}`}
                            >

                                <div className="px-3">
                                    <div className="p-5 mt-3  w-full min-h-[15rem] text-base font-normal border border-gray-300 rounded-md flex flex-col space-y-5">
                                        {/* <div className="flex items-center space-x-10">
                <p>Km Allowance</p>
                <p className="px-3 py-2 text-base font-normal border border-gray-300 rounded-md">
                  124 EUR/Km
                </p>
              </div> */}
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur. Commodo ut vestibulum
                                            praesent duis. Imperdiet nunc quisque vitae ante ornare
                                            imperdiet diam sed. Pretium ut malesuada velit convallis tortor
                                            nulla mattis amet. Lectus nulla integer libero ornare aliquam
                                            sagittis posuere. Nec lacinia aliquet quam suspendisse.
                                            Elementum nunc ac sit id vel. Non facilisis dictumst egestas
                                            sit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* team members */}
                        <div className="relative">
                            <div
                                onClick={() => setShowTeamMemberSection(!showTeamMemberSection)}
                                className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
                            >
                                <IoIosArrowDown
                                    size={18}
                                    color="white"
                                    className={`${showTeamMemberSection ? "" : "rotate-180"}`}
                                />
                            </div>
                            <TitleBar title={"Team Members"} />
                            <div
                                className={`${showTeamMemberSection ? "flex flex-col" : "hidden"}`}
                            >

                                {/* team cards */}
                                <div className="flex flex-wrap items-center gap-2 px-3 py-5">
                                    {/* card */}
                                    <div className="md:min-w-[21rem] p-5 rounded-md shadow-md ">
                                        <div className="flex items-center justify-around gap-3">
                                            {/* image */}
                                            <div className="flex items-center justify-around gap-3">
                                                <img
                                                    src={profile}
                                                    alt="Profile"
                                                    className="rounded-full object-contain object-center  cursor-pointer w-[3.7rem]  h-[3.7rem] "
                                                />
                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                    <p className="text-base font-normal">Craig Martha</p>
                                                    <p className="text-sm font-normal text-gray-400">
                                                        Body Treatment
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                <ReactStars
                                                    classNames={"flex space-x-2"}
                                                    size={18}
                                                    value={2.5}
                                                    edit={false}
                                                    isHalf={true}
                                                    activeColor="#ffd700"
                                                // emptyIcon={<i className="far fa-star" />}
                                                // halfIcon={<i className="fa fa-star-half-alt" />}
                                                // filledIcon={<i className="fa fa-star" />}
                                                />
                                                <p className="text-xs font-normal text-gray-400">
                                                    120 reviews
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mt-3">
                                            <div className="w-full py-2 text-xs font-medium text-center text-white rounded-md bg-gradient-to-b from-customBlue to-customGreen">
                                                Body Treatment
                                            </div>
                                            <div className="w-full py-2 text-xs font-medium text-center text-white rounded-md bg-gradient-to-b from-customBlue to-customGreen">
                                                Body Treatment
                                            </div>
                                            <div className="w-full py-2 text-xs font-medium text-center text-white rounded-md bg-gradient-to-b from-customBlue to-customGreen">
                                                Body Treatment
                                            </div>
                                            <div className="w-full py-2 text-xs font-medium text-center text-white rounded-md bg-gradient-to-b from-customBlue to-customGreen">
                                                Body Treatment
                                            </div>
                                        </div>


                                    </div>
                                </div>


                            </div>
                        </div>

                        {/* visuals */}
                        <div className="relative mb-20">
                            <div
                                onClick={() => setShowVisualsSection(!showVisualsSection)}
                                className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
                            >
                                <IoIosArrowDown
                                    size={18}
                                    color="white"
                                    className={`${showVisualsSection ? "" : "rotate-180"}`}
                                />
                            </div>
                            <TitleBar title={"Visuals"} />
                            <div className={`${showVisualsSection ? "flex flex-col" : "hidden"}`}>


                                {/* images list */}
                                <div className="flex flex-wrap items-center w-full gap-2 my-4 md:ml-2">
                                    {/* image card */}
                                    <div className="relative md:w-[18.3rem] w-full h-[18.3rem] ">
                                        <img
                                            src={profile}
                                            alt="Profile"
                                            className="object-cover object-center md:w-[18.3rem] w-full h-[18.3rem] rounded-md shadow-md  "
                                        />
                                        <div className="top-0 rounded-t-md opacity-[50%] absolute h-[5rem] w-full bg-gradient-to-b from-black to-[#FFFFFF00] " />

                                    </div>

                                    {/* image card */}
                                    <div className="relative md:w-[18.3rem] w-full h-[18.3rem] ">
                                        <img
                                            src={profile}
                                            alt="Profile"
                                            className="object-cover object-center md:w-[18.3rem] w-full h-[18.3rem] rounded-md shadow-md  "
                                        />
                                        <div className="top-0 rounded-t-md opacity-[50%] absolute h-[5rem] w-full bg-gradient-to-b from-black to-[#FFFFFF00] " />

                                    </div>

                                    {/* image card */}
                                    <div className="relative md:w-[18.3rem] w-full h-[18.3rem] ">
                                        <img
                                            src={profile}
                                            alt="Profile"
                                            className="object-cover object-center md:w-[18.3rem] w-full h-[18.3rem] rounded-md shadow-md  "
                                        />
                                        <div className="top-0 rounded-t-md opacity-[50%] absolute h-[5rem] w-full bg-gradient-to-b from-black to-[#FFFFFF00] " />

                                    </div>

                                    {/* image card */}
                                    <div className="relative md:w-[18.3rem] w-full h-[18.3rem] ">
                                        <img
                                            src={profile}
                                            alt="Profile"
                                            className="object-cover object-center md:w-[18.3rem] w-full h-[18.3rem] rounded-md shadow-md  "
                                        />
                                        <div className="top-0 rounded-t-md opacity-[50%] absolute h-[5rem] w-full bg-gradient-to-b from-black to-[#FFFFFF00] " />

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* booking bar */}
                        <section className='fixed bottom-0 left-0  w-[100%] z-10'>
                            <div className="md:w-[85%] mx-auto flex items-center justify-between   py-2 px-5 bg-customBlue rounded-md mt-5 ">
                                <h2 className="text-lg font-semibold text-white">2 Servics 560 EUR</h2>
                                <button className="bg-white rounded-md py-2.5 px-6 text-base font-medium text-customBlue">Book</button>
                            </div>
                        </section>

                    </section>
                </main>
            </div>
        </section>
    );
}

function DesiredLocationCard() {
    const [showFixedLocationSection, setShowFixedLocationSection] = useState(
        true
    );
    return (<div className="relative mb-10">
        <div
            onClick={() =>
                setShowFixedLocationSection(!showFixedLocationSection)}
            className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
        >
            <IoIosArrowDown
                size={18}
                color="white"
                className={`${showFixedLocationSection ? '' : 'rotate-180'}`}
            />
        </div>
        <TitleBar title={'Operating Areas'} />
        <div
            className={`${showFixedLocationSection ? 'flex flex-col pt-3 ' : 'hidden'}`}
        >


            <div className="flex flex-col gap-3 pl-4 my-1">
                <div className="flex items-center gap-6">
                    <label
                        htmlFor="onlyWomen"
                        className="mr-2 text-base font-normal cursor-pointer"
                    >
                        Everywhere In Netherland
                    </label>

                </div>
                <div className="flex items-center w-full gap-28">
                    <label
                        htmlFor="onlyWomen"
                        className="mr-2 text-base font-normal cursor-pointer"
                    >
                        Specific Areas
                    </label>

                </div>
            </div>

            <div className="flex items-center justify-between w-full gap-2 pl-4">
                <div className="flex items-start justify-between w-full gap-2 mt-3">
                    {/* province cards list */}
                    <div className="flex flex-wrap gap-2 ">
                        <ProvinceCard title={"Province1"} options={["municiplity1", "municiplity1", "municiplity1"]} onDelete={() => { }} />
                        <ProvinceCard title={"Province1"} options={["municiplity1", "municiplity1", "municiplity1"]} onDelete={() => { }} />
                        <ProvinceCard title={"Province1"} options={["municiplity1", "municiplity1", "municiplity1"]} onDelete={() => { }} />
                    </div>


                </div>
            </div>
        </div>
    </div>);
}

function FixedLocationCard() {
    const [showFixedLocationSection, setShowFixedLocationSection] = useState(
        true
    );
    return (

        <div className="relative mb-10">
            <div
                onClick={() => setShowFixedLocationSection(!showFixedLocationSection)}
                className="absolute top-1.5 right-3 p-2 rounded-full bg-gray-50 bg-opacity-10 cursor-pointer"
            >
                <IoIosArrowDown
                    size={18}
                    color="white"
                    className={`${showFixedLocationSection ? "" : "rotate-180"}`}
                />
            </div>
            <TitleBar title={"Fixed Location"} />
            <div
                className={`${showFixedLocationSection ? "flex flex-col" : "hidden"}`}
            >
                {/* location card */}
                <div className="md:mx-5  relative my-10 rounded-md shadow-md border md:w-[19rem] w-full p-5">

                    {/* frame top left */}
                    <img
                        src={cardFrameTopLeft}
                        alt="Edit"
                        className="absolute top-0 left-0 cursor-pointer"
                    // onClick={toggleUpdateButtonVisibility}
                    />
                    {/* frame top left */}
                    <img
                        src={cardFrameBottomRight}
                        alt="Edit"
                        className="absolute bottom-0 right-0 cursor-pointer"
                    // onClick={toggleUpdateButtonVisibility}
                    />

                    <div className="flex flex-col space-y-2.5 ">
                        <div className="flex w-full space-x-2">
                            <p className="text-base font-normal text-black ">Salon Name:</p>
                            <p className="text-base font-normal text-black ">Fashion Hub</p>
                        </div>
                        <div className="flex w-full space-x-2">
                            <p className="text-base font-normal text-black ">Address:</p>
                            <p className="text-base font-normal text-black ">
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                        </div>
                        <div className="flex w-full space-x-2">
                            <p className="text-base font-normal text-black ">
                                Postal Code:
                            </p>
                            <p className="text-base font-normal text-black ">1243</p>
                        </div>
                        <div className="flex w-full space-x-2">
                            <p className="text-base font-normal text-black ">
                                Municipality:
                            </p>
                            <p className="text-base font-normal text-black ">Lorem ipsum</p>
                        </div>
                        <div className="flex w-full space-x-2">
                            <p className="text-base font-normal text-black ">Province:</p>
                            <p className="text-base font-normal text-black ">Lorem ipsum</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}





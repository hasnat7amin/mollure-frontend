import CustomAddButton from "../../../../components/custom_add_button";

import TitleBar, { LightTitleBar } from "../../../../components/titleBar";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import edit from "../../../../images/professional/edit.svg";
import EditService from "./popups/edit_service";
import { useProfessionalContext } from "../../../../contexts/ProfessionalContextProvider";
import { useAuthContext } from "../../../../contexts/AuthContextProvider";
import EditGeneralNote from "./popups/edit_general_note";
import category1 from "../../../../images/professional/category1.svg";
import Info from "../../../../components/info";
import deleteIcon from "../../../../images/professional/delete_icon.svg";
import CustomAddSubServiceButton from "../../../../components/custom_add_sub_service";
import { baseUrl, imageUrl } from "../../../../apis/base_url";
import AddService from "./popups/add_service";
import AddSubService from "./popups/add_sub_service";
import ConfirmationDeletePopUp from "../../../../components/confirmation_delete_popup";
import ErrorPopUp from "../../../../components/error_popup";
import SuccessPopUp from "../../../../components/success_popup";
import UpdateService from "./popups/update_service";
import UpdateSubService from "./popups/update_sub_service";

const cardData = [
    { id: 1, category: "Hair", imageUrl: "category1.jpg" },
    { id: 2, category: "Skin", imageUrl: "category2.jpg" },
    { id: 3, category: "Nails", imageUrl: "category3.jpg" },
    { id: 4, category: "Makeup", imageUrl: "category4.jpg" },
    { id: 5, category: "Fragrance", imageUrl: "category5.jpg" },
    { id: 6, category: "Skincare", imageUrl: "category6.jpg" },
    { id: 7, category: "Body", imageUrl: "category7.jpg" },
    { id: 8, category: "Tools", imageUrl: "category8.jpg" },
    { id: 9, category: "Men", imageUrl: "category9.jpg" },
    { id: 10, category: "Gifts", imageUrl: "category10.jpg" },
    { id: 11, category: "Hair Care", imageUrl: "category11.jpg" },
    { id: 12, category: "Bath & Shower", imageUrl: "category12.jpg" },
    { id: 13, category: "Sun Care", imageUrl: "category13.jpg" },
    { id: 14, category: "Health", imageUrl: "category14.jpg" },
    { id: 15, category: "Fragrance", imageUrl: "category15.jpg" },
    { id: 16, category: "Accessories", imageUrl: "category16.jpg" },
    { id: 17, category: "Oral Care", imageUrl: "category17.jpg" },
    { id: 18, category: "Gift Sets", imageUrl: "category18.jpg" },
    { id: 19, category: "Shaving", imageUrl: "category19.jpg" },
    { id: 20, category: "Specials", imageUrl: "category20.jpg" }
];


export default function CategoryAndSubCategorySection({ id, type }) {
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [templateId, setTemplateId] = useState(null);
    const [showSubServices, setShowSubServices] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showCategoriesSection, setShowCategoriesSection] = useState(true);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showAddServiceModel, setShowAddServiceModel] = useState(false);

    const {
        categories,
        getCategories,
        servicesById,
        getServicesByCategoryId
    } = useProfessionalContext();
    const { token } = useAuthContext();



    const toggleSubServices = () => {
        setShowSubServices(prevState => !prevState); // Toggle the visibility of sub-services
    };

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
        console.log("Card clicked");
    };







    const fetchCategoriesDetails = async () => {
        await getCategories(token)
    }


    useEffect(() => {
        fetchCategoriesDetails();
    }, [id])


    useEffect(() => {
        categories && setSelectedCategory(categories[0]);
    }, [categories])





    return (
        <section>
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
                            {categories && selectedCategory && categories.map(card =>
                                <div
                                    key={card.id}
                                    onClick={() => setSelectedCategory(card)}
                                    className={`w-[11rem] flex flex-col items-center justify-center flex-shrink-0 px-2 py-4 space-y-3 rounded-md shadow-md hover:bg-gradient-to-b hover:from-customBlue hover:to-customGreen hover:text-white group ${selectedCategory.id == card.id ? "bg-gradient-to-b from-customBlue to-customGreen text-white" : "bg-white"}`}
                                >
                                    <img
                                        src={baseUrl+ "/imgs/category/" + card.image}
                                        width={100}
                                        height={100}
                                        alt="Edit"
                                        className="cursor-pointer group-hover:text-white h-20 w-20"
                                        style={{ cursor: "grab" }}
                                        onDragStart={e => e.preventDefault()}
                                    // onClick={toggleUpdateButtonVisibility}
                                    />
                                    <p className="text-sm font-medium line-clamp-1">{card.name_en}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* sub categories */}
                    {categories && selectedCategory && <Category category={selectedCategory} templateId={id} />}


                </div>
            </div>

        </section>
    )


}



function Category({ category, templateId }) {
    const [showSubServices, setShowSubServices] = useState(true);
    const [showAddServiceModel, setShowAddServiceModel] = useState(false);

    const {
        servicesById,
        getServicesByCategoryId
    } = useProfessionalContext();
    const { token } = useAuthContext();

    const toggleSubServices = () => {
        setShowSubServices(prevState => !prevState); // Toggle the visibility of sub-services
    };

    const fetchServicesById = async () => {
        category && await getServicesByCategoryId(token, category.id,templateId);
    }




    useEffect(() => {
        fetchServicesById();
    }, [category])


    return <section>
        <div className="">
            <LightTitleBar title={category.name_en + "'s Subservices"} />

            {/* table */}
            {servicesById && <div className="overflow-x-scroll md:overflow-hidden">
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
                            Action
                        </p>
                    </div>
                    {/* body */}
                    <div className="flex flex-col ">
                        {
                            servicesById && servicesById.map(service => (
                                <Services data={service} templateId={templateId} categoryId={category.id} />
                            ))
                        }

                    </div>
                </div>
            </div> 

            }

            {/* add service button  */}
            <div className="flex items-center justify-end w-full my-7">
                <CustomAddButton title={"Add Service"} handleClick={() => setShowAddServiceModel(true)} />

            </div>

            {/* add  service */}
            <AddService
                categoryId={category.id}
                templateId={templateId}
                parentId={1}
                type="main"
                showModel={showAddServiceModel}
                setShowModel={setShowAddServiceModel}
            />



        </div>
    </section>
}



function Services({ data, templateId, categoryId }) {
    const [showSubServices, setShowSubServices] = useState(true);
    const [showAddSubServiceModel, setShowAddSubServiceModel] = useState(false);
    const [showUpdateServiceModel, setShowUpdateServiceModel] = useState(false);
    const [showDeleteVisualPopUp, setShowDeleteVisualPopUp] = useState(false);
    const [showErrorModel, setShowErrorModel] = useState(false)
    const [error, setError] = useState(false);
    const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)
    const {
        deleteServiceAndSubService
    } = useProfessionalContext();
    const { token } = useAuthContext();


    const handleServiceDeleteConfirm = async (id, categoryId,templateId) => {
        setError('');

        const response = await deleteServiceAndSubService(token, id, categoryId,templateId);
        if (!response) {
            setError("Please check your credentials again.");

            setShowErrorModel(true);
        }
        else {

            //   setLoading(false);
            setShowSuccessPopUp(true)

        }

        setShowDeleteVisualPopUp(false);


    }

    const toggleSubServices = () => {
        setShowSubServices(prevState => !prevState); // Toggle the visibility of sub-services
    };


    return <section>
        {/* category 1 */}
        <div className="flex items-center w-full h-[6rem] justify-center text-customBlue bg-customBlue bg-opacity-5">
            <div className="flex w-full h-full ">
                <div className="w-2 bg-customBlue rounded-r-md" />
                <p className="flex items-center gap-2 justify-center w-full h-full text-lg font-normal text-center border-r ms-2 ">
                    {data?.service_name}
                    {data?.bio&&<Info title={data?.bio} />}
                </p>
            </div>
            <p className="flex items-center justify-center w-full h-full text-lg font-normal text-center border-r">
                {data?.duration}
            </p>
            <div className="flex flex-col items-center justify-center w-full h-full space-y-1 text-lg font-normal text-center border-r">
                <p>
                    <span className="text-sm line-through">{data?.price} EUR</span> {data?.price - data?.discount_amount}
                    EUR
                </p>
                <p className="flex items-center justify-center space-x-2">
                    <span>Discount {data.discount_amount} EUR </span>

                    {data.discount_info&&<Info title={data.discount_info} />}
                </p>
            </div>
            <div className="flex items-center justify-center w-full h-full space-x-2 font-semibold ">
                {/* edit button */}
                <button>
                    <img
                        src={edit}
                        alt="Edit"
                        className="mt-0 cursor-pointer "
                        onClick={()=>setShowUpdateServiceModel(true)}
                    />
                </button>
                {/* delete button */}
                <button>
                    <img
                        src={deleteIcon}
                        alt="deleteIcon"
                        className="mt-0 cursor-pointer "
                        onClick={() => setShowDeleteVisualPopUp(true)}
                    />
                </button>
                {/* add sub category button */}
                <CustomAddSubServiceButton title={"Add Sub Service"} handleClick={() => setShowAddSubServiceModel(true)} />

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
                {
                    data.sub_services && data.sub_services.map(subService => (
                        <SubServices parentId={data?.id} data={subService} categoryId={categoryId}
                            templateId={templateId} />
                    ))
                }
            </div>}

        {/* add  service */}
        <AddSubService
            categoryId={categoryId}
            templateId={templateId}
            parentId={data?.id}
            type="sub"
            showModel={showAddSubServiceModel}
            setShowModel={setShowAddSubServiceModel}
            servicePrice={data?.price}
        />
         {/* add  service */}
         <UpdateService
            categoryId={categoryId}
            templateId={templateId}
            parentId={data?.id}
            type="main"
            showModel={showUpdateServiceModel}
            setShowModel={setShowUpdateServiceModel}
            data={data}
        />
        
        <ConfirmationDeletePopUp
            showModel={showDeleteVisualPopUp}
            setShowModel={setShowDeleteVisualPopUp}
            title={"Are you sure you want to delete this Service?"}
            handleCancel={() => { setShowDeleteVisualPopUp(false); }}
            handleDelete={() => handleServiceDeleteConfirm(data?.id, categoryId,templateId)}
        />

        {/* error popup */}
        <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />
        {/* success popup */}
        <SuccessPopUp title={"Service Deleted Successfully."} showModel={showSuccessPopUp} setShowModel={setShowSuccessPopUp} />



    </section>
}



function SubServices({ data, templateId, categoryId, parentId }) {
    const [showDeleteVisualPopUp, setShowDeleteVisualPopUp] = useState(false);
    const [showErrorModel, setShowErrorModel] = useState(false)
    const [error, setError] = useState(false);
    const [showSuccessPopUp, setShowSuccessPopUp] = useState(false)
    const [showUpdateServiceModel, setShowUpdateServiceModel] = useState(false);

    const {
        deleteServiceAndSubService
    } = useProfessionalContext();
    const { token } = useAuthContext();


    const handleServiceDeleteConfirm = async (id, categoryId,templateId) => {
        setError('');

        const response = await deleteServiceAndSubService(token, id, categoryId,templateId);
        if (!response) {
            setError("Please check your credentials again.");

            setShowErrorModel(true);
        }
        else {

            //   setLoading(false);
            setShowSuccessPopUp(true)

        }

        setShowDeleteVisualPopUp(false);


    }


    return <section>
        <div className="flex items-center w-full border-b h-[3rem] justify-center  bg-opacity-5">
            <div className="flex w-full h-full ">
                <p className="flex items-center justify-center w-full h-full text-lg font-normal border-r ms-3 ">
                    {data?.service_name}
                </p>
            </div>
            <p className="flex items-center justify-center w-full h-full text-lg font-normal text-center border-r">
                {data?.duration}
            </p>
            <div className="flex flex-col items-center justify-center w-full h-full space-y-1 text-lg font-normal text-center border-r">
                <p>{data?.price} EUR</p>
            </div>
            <div className="flex items-center justify-center w-full h-full space-x-2 font-normal ">
                {/* edit image */}
                <button>
                    <img
                        src={edit}
                        alt="Edit"
                        className="mt-0 cursor-pointer "
                        onClick={()=>setShowUpdateServiceModel(true)}
                    />
                </button>
                {/* edit image */}
                <button>
                    <img
                        src={deleteIcon}
                        alt="deleteIcon"
                        className="mt-0 cursor-pointer "
                        onClick={() => setShowDeleteVisualPopUp(true)}

                    />
                </button>
            </div>
        </div>
        <ConfirmationDeletePopUp
            showModel={showDeleteVisualPopUp}
            setShowModel={setShowDeleteVisualPopUp}
            title={"Are you sure you want to delete this Service?"}
            handleCancel={() => { setShowDeleteVisualPopUp(false); }}
            handleDelete={() => handleServiceDeleteConfirm(data?.id, categoryId,templateId)}
        />

          {/* add  service */}
          <UpdateSubService
            categoryId={categoryId}
            templateId={templateId}
            parentId={parentId}
            type="sub"
            showModel={showUpdateServiceModel}
            setShowModel={setShowUpdateServiceModel}
            data={data}
        />

        {/* error popup */}
        <ErrorPopUp title={error} showModel={showErrorModel} setShowModel={setShowErrorModel} />
        {/* success popup */}
        <SuccessPopUp title={"SubService Deleted Successfully."} showModel={showSuccessPopUp} setShowModel={setShowSuccessPopUp} />


    </section>
}

import TitleBar from "../../../../components/titleBar";
import edit from "../../../../images/professional/edit.svg";
import deleteIcon from "../../../../images/professional/delete_icon.svg";
import category1 from "../../../../images/professional/category1.svg";
import addIcon from "../../../../images/professional/Add_Plus.svg";
import profile from "../../../../images/professional/profile.jpg";
import cardFrameTopLeft from "../../../../images/professional/Frame20.svg";
import cardFrameBottomRight from "../../../../images/professional/Frame19.svg";
import spinner from "../../../../images/spinner.svg";

import Info from "../../../../components/info";
import ReactStars from "react-rating-stars-component";
import Select from "../../../../components/select";
import { IoIosArrowDown } from "react-icons/io";
import { useRef, useState } from "react";
import EditProfile from "./popups/edit_profile";
import AddLocation from "./popups/add_location";
import EditLocation from "./popups/edit_location";
import EditService from "./popups/edit_service";
import EditGeneralNote from "./popups/edit_general_note";
import AddTeamMember from "./popups/add_team_member";
import AddImage from "./popups/add_image";
import EditTeamMember from "./popups/edit_team_member";
import FeatureTeamMember from "./popups/feature_team_member";
import AddSubService from "./popups/add_sub_service";
import AddService from "./popups/add_service";
import ConfirmationDeletePopUp from "../../../../components/confirmation_delete_popup";
import ConfirmationProcessPopUp from "../../../../components/confirmation_process_popup";
import CustomAddButton from "../../../../components/custom_add_button";
import CustomAddSubServiceButton from "../../../../components/custom_add_sub_service";
import ProfileSection from "./profile_section";
import FixedLocationSection from "./fixed_location_section";
import ServiceForSection from "./service_for_section";
import GeneralNoteSection from "./general_note_section";
import CategoryAndSubCategorySection from "./categories_and_subcategory_section";
import VisualsSection from "./visual_section";
import TeamMemberSection from "./team_member_section";
import PublishSection from "./publish_section";
import SaveTemplateSection from "./save_template_section";

export default function FixedLocation() {
  const provinceOptions = [
    { id: "drenthe", label: "Drenthe", value: "drenthe" },
    { id: "florida", label: "Florida", value: "florida" },
    { id: "other", label: "Other", value: "other" }
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
  const [loading, setLoading] = useState(false);

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
  const [showEditTeamMemberModel, setShowEditTeamMemberModel] = useState(false);
  const [showFeatureTeamMemberModel, setShowFeatureTeamMemberModel] = useState(
    false
  );
  const [showAddImageModel, setShowAddImageModel] = useState(false);
  const [showAddSubServiceModel, setShowAddSubServiceModel] = useState(false);
  const [showAddServiceModel, setShowAddServiceModel] = useState(false);

  // popup states
  const [showDeleteVisualPopUp, setShowDeleteVisualPopUp] = useState(false);
  const [showPublishPagePopUp, setShowPublishPagePopUp] = useState(false);

  // handle popus functions
  const handleVisualsDelete = () => {
    setShowDeleteVisualPopUp(false);
  };

  const handlePublishPageProcess = () => {
    setShowPublishPagePopUp(false);
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

  const handleSave = () => {
    console.log("Card Saved");
  };

  return (
    <section className="w-full">

      {/* copy template and clear all buttons */}

      <PublishSection id={1} type={"fixed"} />
      <ConfirmationProcessPopUp
        showModel={showPublishPagePopUp}
        setShowModel={setShowPublishPagePopUp}
        title={"Are you sure you want to publish the page?"}
        handleNo={() => setShowPublishPagePopUp(false)}
        handleYes={() => handlePublishPageProcess()}
      />


      <ProfileSection id={1} type={"fixed"} />
      <FixedLocationSection />
      <ServiceForSection id={1} type={"fixed"} />
      <GeneralNoteSection id={1} type={"fixed"} />
      <CategoryAndSubCategorySection id={1} type={"fixed"} />
      <TeamMemberSection id={1} type={"fixed"} />
      <VisualsSection id={1} type={"fixed"} />
      <SaveTemplateSection id={1} type={"fixed"} />





      {/* add image */}
      <AddImage
        showModel={showAddImageModel}
        setShowModel={setShowAddImageModel}
      />
      {/* feature team member */}
      <FeatureTeamMember
        showModel={showFeatureTeamMemberModel}
        setShowModel={setShowFeatureTeamMemberModel}
      />

      {/* add sub service */}
      <AddSubService
        showModel={showAddSubServiceModel}
        setShowModel={setShowAddSubServiceModel}
      />

    </section>
  );
}

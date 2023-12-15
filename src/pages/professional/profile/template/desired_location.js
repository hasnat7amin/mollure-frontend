
import TitleBar from '../../../../components/titleBar';
import edit from '../../../../images/professional/edit.svg';
import deleteIcon from '../../../../images/professional/delete_icon.svg';
import category1 from '../../../../images/professional/category1.svg';
import addIcon from '../../../../images/professional/Add_Plus.svg';
import profile from '../../../../images/professional/profile.jpg';
import cardFrameTopLeft from '../../../../images/professional/Frame20.svg';
import cardFrameBottomRight
  from '../../../../images/professional/Frame19.svg';

import Info from '../../../../components/info';
import ReactStars from 'react-rating-stars-component';
import Select from '../../../../components/select';
import { IoIosArrowDown } from 'react-icons/io';
import { useRef, useState } from 'react';
import EditProfile from './popups/edit_profile';
import AddLocation from './popups/add_location';
import EditLocation from './popups/edit_location';
import EditService from './popups/edit_service';
import EditGeneralNote from './popups/edit_general_note';
import AddTeamMember from './popups/add_team_member';
import AddImage from './popups/add_image';
import EditTeamMember from './popups/edit_team_member';
import FeatureTeamMember from './popups/feature_team_member';
import AddSubService from './popups/add_sub_service';
import AddService from './popups/add_service';
import ConfirmationDeletePopUp from '../../../../components/confirmation_delete_popup';
import ConfirmationProcessPopUp from '../../../../components/confirmation_process_popup';
import EditOperatingArea from './popups/edit_operating_area';
import CustomAddButton from '../../../../components/custom_add_button';
import ProvinceCard from '../../../../components/province_card';
import CustomAddSubServiceButton from '../../../../components/custom_add_sub_service';
import ProfileSection from './profile_section';
import ServiceForSection from './service_for_section';
import GeneralNoteSection from './general_note_section';
import VisualsSection from './visual_section';
import DesiredLocationService from './desired_location_section';
import CategoryAndSubCategorySection from './categories_and_subcategory_section';
import TeamMemberSection from './team_member_section';
import PublishSection from "./publish_section";
import SaveTemplateSection from './save_template_section';

export default function DesiredLocation() {
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

  return (
    <section className="w-full">
      <PublishSection id={2} type={"desired"} />
      <ConfirmationProcessPopUp
        showModel={showPublishPagePopUp}
        setShowModel={setShowPublishPagePopUp}
        title={'Are you sure you want to publish the page?'}
        handleNo={() => setShowPublishPagePopUp(false)}
        handleYes={() => handlePublishPageProcess()}
      />

      {/* profile section */}
      <ProfileSection id={2} />

     
      <DesiredLocationService />

      {/* service for */}
      <ServiceForSection id={2} type={"desired"} />
     
      <CategoryAndSubCategorySection id={2} type={"desired"} />

      {/* general note */}
      <GeneralNoteSection id={2} type={"desired"} />


      <TeamMemberSection id={2} type={"desired"} /> 

      {/* visuals */}
      <VisualsSection id={2} type={"desired"} /> 
      <SaveTemplateSection id={2} type={"desired"} /> 

     
     
     
      {/* edit service */}
      <EditService
        showModel={showEditServiceModel}
        setShowModel={setShowEditServiceModel}
      />
      
      {/* add team members */}
      <AddTeamMember
        showModel={showAddTeamMemberModel}
        setShowModel={setShowAddTeamMemberModel}
      />
      {/* edit team members */}
      <EditTeamMember
        showModel={showEditTeamMemberModel}
        setShowModel={setShowEditTeamMemberModel}
      />
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
      {/* add  service */}
      <AddService
        showModel={showAddServiceModel}
        setShowModel={setShowAddServiceModel}
      />

      
    </section>
  );
}





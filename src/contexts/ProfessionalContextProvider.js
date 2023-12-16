// ProfessionalContext.js

import React, { createContext, useContext, useState } from "react";
import ApiTemplate from "../apis/api_template";
import { jsonHeader, jsonHeaderWithoutToken, multiFormHeader } from "../apis/header"; // Assuming you have a different header for authenticated requests

const ProfessionalContext = createContext();

export const ProfessionalContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [templateBio, setTemplateBio] = useState(null)
  const [fixedLocation, setFixedLocation] = useState(null)
  const [serviceFor, setServiceFor] = useState(null)
  const [generalNote, setGeneralNote] = useState(null)
  const [categories, setCategories] = useState(null);
  const [visuals, setVisuals] = useState(null);
  const [servicesById, setServicesById] = useState(null);
  const [categoryAndServiceForTeam, setCategoryAndServiceForTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState(null)
  const [provincesAndMunicipalities, setProvincesAndMunicipalities] = useState(null);
  const [desiredLocation, setDesiredLocation] = useState(null);


  const getUserInfo = async (token) => {
    try {
      // Fetch user information from an API endpoint
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/profile", {}, headers);

      if (response && response["success"] && response.data.profile) {
        setUserInfo(response.data.profile);
      } else {
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const editUserInfo = async (token, id, data) => {
    try {
      const headers = multiFormHeader(token); // Assuming you need authentication for editing user info
      const response = await ApiTemplate(
        "post",
        "/api/profile/update/" + id,
        data,
        headers
      );

      if (response && response.success === true) {
        await getUserInfo(token)
        return true;// Assuming the API returns the updated user info
      }
      else return false;
    } catch (error) {
      return false;
    }
  };

  const getTemplateBio = async (token, id) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/get_bio/" + id, {}, headers);

      if (response && response["success"]) {
        setTemplateBio(response.data);
      } else {
        setTemplateBio(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const updateTemplateBio = async (token, data, id) => {
    try {
      const headers = multiFormHeader(token);
      const response = await ApiTemplate("post", "/api/store_bio", data, headers);

      if (response && response["success"]) {
        await getTemplateBio(token, id)
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      return false
    }
  };

  const getFixedLocation = async (token) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/fixed_location", {}, headers);

      if (response && response["success"]) {
        setFixedLocation(response.data ? response.data[0] : null);
      } else {
        setFixedLocation(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };


  const updateFixedLocation = async (token, data) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("post", "/api/fixed_location", data, headers);

      if (response && response["success"]) {
        await getFixedLocation(token)
        return true;
      } else {
        return false;
      }
    } catch (error) {

      console.error("Error fetching user information:", error);
      return false;

    }
  };


  const getServiceFor = async (token, id) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/service_for/" + id, {}, headers);

      if (response && response["success"]) {
        setServiceFor(response.data);
      } else {
        setServiceFor(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };


  const updateServiceFor = async (token, id, data) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("post", "/api/service_for", data, headers);

      if (response && response["success"]) {
        await getServiceFor(token, id)
        return true;
      } else {
        return false;
      }
    } catch (error) {

      console.error("Error fetching user information:", error);
      return false;

    }
  };


  const getGeneralNote = async (token, id) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/professional/get_note/" + id, {}, headers);

      if (response && response["success"] && response.data[0]) {
        setGeneralNote(response.data[0]);
      } else {
        setGeneralNote(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };


  const updateGeneralNote = async (token, id, data) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("post", "/api/professional/add_note", data, headers);

      if (response && response["success"]) {
        await getGeneralNote(token, id)
        return true;
      } else {
        return false;
      }
    } catch (error) {

      console.error("Error fetching user information:", error);
      return false;

    }
  };



  const getVisuals = async (token, id) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/add_visual_image/" + id, {}, headers);

      if (response && response["success"]) {
        setVisuals(response.data);
      } else {
        setVisuals(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const deleteVisuals = async (token, id, data) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("delete", "/api/add_visual_image/delete", JSON.stringify({ "image_ids": data }), headers);

      if (response && response["success"]) {
        getVisuals(token, id);
        return true;
      } else {
        return false;

      }
    } catch (error) {
      return false;
    }
  };

  const addVisuals = async (token, id, data) => {
    try {
      const headers = multiFormHeader(token); // Assuming you need authentication for editing user info
      const response = await ApiTemplate(
        "post",
        "/api/add_visual_image/"+id,
        data,
        headers
      );

      if (response && response.success === true) {
        await getVisuals(token, id)
        return true;// Assuming the API returns the updated user info
      }
    } catch (error) {
      console.error("Error editing user information:", error);
      return false;
    }
  };

  const getCategories = async (token) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/categories", {}, headers);

      if (response && response["success"]) {
        setCategories(response.data);
      } else {
        setCategories(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const getServicesByCategoryId = async (token, categoryId, templateId) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("post", "/api/services/category_related_services", JSON.stringify({ "category_id": categoryId, "template_id": templateId }), headers);

      if (response && response["success"] && response.data.length > 0) {
        setServicesById(response.data);
      } else {
        setServicesById(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const addServiceAndSubService = async (token, categoryId,templateId, data) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("post", "/api/services", data, headers);

      if (response && response["success"]) {
        await getServicesByCategoryId(token, categoryId,templateId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      return false;
    }
  };

  const deleteServiceAndSubService = async (token, id, categoryId,templateId) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("delete", "/api/services/delete/" + id, {}, headers);

      if (response && response["success"]) {
        await getServicesByCategoryId(token, categoryId,templateId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      return false;
    }
  };

  const updateServiceAndSubService = async (token, id, categoryId,templateId, data) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("post", "/api/services/update/" + id, data, headers);

      if (response && response["success"]) {
        await getServicesByCategoryId(token, categoryId,templateId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      return false;
    }
  };


  const getCategoryAndServiceForTeam = async (token, templateId) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/services/get_services_for_add_team/" + templateId, {}, headers);

      if (response && response["success"] && response.data.length > 0) {
        const updatedData = response.data.map(item => {
          return {
            id: item.id,
            "label_en": item.name_en,
            "label_nl": item.name_nl,
            "value_en": item.name_en,
            "value_nl": item.name_nl,
            services: item.services.map(service => {
              return {
                id: service.id,
                label: service.service_name,
                value: service.service_name,
              }
            })
          }
        })
        setCategoryAndServiceForTeam(updatedData);
      } else {
        setCategoryAndServiceForTeam(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const getTeamMembers = async (token, templateId) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/team_members/" + templateId, {}, headers);

      if (response && response["success"] && response.data.length > 0) {
        setTeamMembers(response.data);
      } else {
        setTeamMembers(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const addTeamMembers = async (token, templateId, data) => {
    try {
      const headers = multiFormHeader(token);
      const response = await ApiTemplate("post", "/api/team_members", data, headers);

      if (response && response["success"]) {
        await getTeamMembers(token, templateId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      return false;
    }
  };

  const updateTeamMembers = async (token, templateId, teamId, data) => {
    try {
      const headers = multiFormHeader(token);
      const response = await ApiTemplate("post", "/api/team_members/update/" + teamId, data, headers);

      if (response && response["success"]) {
        await getTeamMembers(token, templateId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      return false;
    }
  };

  const deleteTeamMembers = async (token, templateId, teamId) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("delete", "/api/team_members/delete/" + teamId, {}, headers);

      if (response && response["success"]) {
        await getTeamMembers(token, templateId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      return false;
    }
  };


  const getProvincesAndMunicipalities = async (token) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/provinces/muncipalities", {}, headers);

      if (response && response["success"] && response.data.length > 0) {
        const updatedData = response.data.map(item => {
          return {
            id: item.id,
            "label_en": item?.name,
            "label_nl": item?.nl_name,
            "value_en": item?.name,
            "value_nl": item?.nl_name,
            municipalities: item.municipalities.length > 0 ? item?.municipalities?.map(service => {
              return {
                id: service?.id,
                "label_en": service?.name,
                "label_nl": service?.nl_name,
                "value_en": service?.name,
                "value_nl": service?.nl_name,
              }
            }) : []
          }
        })
        setProvincesAndMunicipalities(updatedData);
      } else {
        setProvincesAndMunicipalities(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const getDesiredLocation = async (token) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/desired_location", {}, headers);

      if (response && response["success"]) {
        setDesiredLocation(response.data[0]);
      } else {
        setDesiredLocation(null);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const updateDesiredLocation = async (token, data) => {
    try {
      const headers = multiFormHeader(token);
      const response = await ApiTemplate("post", "/api/desired_location", data, headers);

      if (response && response["success"]) {
        await getDesiredLocation(token);
        return true;
      } else {

        return false;

      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      return false;
    }
  };


  const copyTemplate = async (token, id) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("post", "/api/copyTemplate/" + id, {}, headers);

      if (response && response["success"]) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const publishTemplate = async (token, id, data) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("post", "/api/templetes/publish/" + id, data, headers);

      if (response && response["success"]) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const postTeamMemberOnPublicPage = async (token, id, data) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("post", "/api/team_members/team_member_on_public_page/" + id, data, headers);

      if (response && response["success"]) {
        await getTemplateBio(token,id)
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

 

  return (
    <ProfessionalContext.Provider
      value={{
        userInfo,
        getUserInfo,
        editUserInfo,
        templateBio,
        getTemplateBio,
        updateTemplateBio,
        fixedLocation,
        getFixedLocation,
        updateFixedLocation,
        serviceFor,
        getServiceFor,
        updateServiceFor,
        generalNote,
        getGeneralNote,
        updateGeneralNote,
        categories,
        getCategories,
        visuals,
        getVisuals,
        deleteVisuals,
        addVisuals,
        servicesById,
        getServicesByCategoryId,
        addServiceAndSubService,
        deleteServiceAndSubService,
        updateServiceAndSubService,
        getCategoryAndServiceForTeam,
        categoryAndServiceForTeam,
        teamMembers,
        getTeamMembers,
        addTeamMembers,
        deleteTeamMembers,
        updateTeamMembers,
        provincesAndMunicipalities,
        getProvincesAndMunicipalities,
        desiredLocation,
        updateDesiredLocation,
        getDesiredLocation,
        copyTemplate,
        publishTemplate,
        postTeamMemberOnPublicPage

      }}
    >
      {children}
    </ProfessionalContext.Provider>
  );
};

export const useProfessionalContext = () => {
  const professionalContextValue = useContext(ProfessionalContext);
  return professionalContextValue;
};



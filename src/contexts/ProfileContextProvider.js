// ProfileContext.js

import React, { createContext, useContext, useState } from "react";
import ApiTemplate from "../apis/api_template";
import { jsonHeader, multiFormHeader } from "../apis/header";

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [userProfilePic, setUserProfilePic] = useState(null);

  const getUserProfilePic = async (token) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/profile/get_user_image", {}, headers);

      if (response && response.success && response.data) {
        setUserProfilePic(response.data);
      } else {
        setUserProfilePic(null);
      }
    } catch (error) {
      console.error("Error fetching company information:", error);
    }
  };

 

  return (
    <ProfileContext.Provider
      value={{
        userProfilePic,
        getUserProfilePic
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const companyContextValue = useContext(ProfileContext);
  return companyContextValue;
};

// CompanyContext.js

import React, { createContext, useContext, useState } from "react";
import ApiTemplate from "../apis/api_template";
import { jsonHeader, multiFormHeader } from "../apis/header";

const CompanyContext = createContext();

export const CompanyContextProvider = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState(null);

  const getCompanyInfo = async (token) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/company_profile", {}, headers);

      if (response && response.success && response.data) {
        setCompanyInfo(response.data.profile);
      } else {
        setCompanyInfo(null);
      }
    } catch (error) {
      console.error("Error fetching company information:", error);
    }
  };

  const editCompanyInfo = async (token, id, data) => {
    try {
      const headers = multiFormHeader(token);
      const response = await ApiTemplate(
        "post",
        `/api/company_profile/update/${id}`,
        data,
        headers
      );

      if (response && response.success === true) {
        await getCompanyInfo(token);
        return true;
      }
    } catch (error) {
      console.error("Error editing company information:", error);
      return false;
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        companyInfo,
        getCompanyInfo,
        editCompanyInfo,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = () => {
  const companyContextValue = useContext(CompanyContext);
  return companyContextValue;
};

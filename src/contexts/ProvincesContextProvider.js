// ProvinceContext.js

import React, { createContext, useContext, useState } from "react";
import ApiTemplate from "../apis/api_template";
import { jsonHeaderWithoutToken } from "../apis/header";

const ProvinceContext = createContext();

export const ProvinceContextProvider = ({ children }) => {
  const [provinces, setProvinces] = useState(null);

  const getAllProvinces = async (data) => {
    try {
      const headers = jsonHeaderWithoutToken();
      const response = await ApiTemplate(
        "get",
        "/api/provinces",
        null,
        headers
      );

      if (response && response.success === true) {
        setProvinces(response.data);
      } else {
        setProvinces(null);
        
      }
    } catch (error) {

      setProvinces(null);
      
    }
  };

  return (
    <ProvinceContext.Provider
      value={{
        provinces,
        getAllProvinces,
      }}
    >
      {children}
    </ProvinceContext.Provider>
  );
};

export const useProvinceContext = () => {
  const provinceContextValue = useContext(ProvinceContext);
  return provinceContextValue;
};

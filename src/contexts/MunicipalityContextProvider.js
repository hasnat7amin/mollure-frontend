// MunicipalityContext.js

import React, { createContext, useContext, useState } from "react";
import ApiTemplate from "../apis/api_template";
import { jsonHeaderWithoutToken } from "../apis/header";

const MunicipalityContext = createContext();

export const MunicipalityContextProvider = ({ children }) => {
  const [municipalities, setMunicipalities] = useState([]);
  
  const getAllMunicipalities = async (data) => {
    try {
      const headers = jsonHeaderWithoutToken();
      const response = await ApiTemplate(
        "get",
        "/api/municipalities?"+data,
        null,
        headers
      );

      if (response && response.success === true) {
        setMunicipalities(response.data);
      } else {
        setMunicipalities([]);
        
      }
    } catch (error) {
      console.error("Error fetching municipalities:", error);
      
    }
  };

  return (
    <MunicipalityContext.Provider
      value={{
        municipalities,
        getAllMunicipalities,
      }}
    >
      {children}
    </MunicipalityContext.Provider>
  );
};

export const useMunicipalityContext = () => {
  const municipalityContextValue = useContext(MunicipalityContext);
  return municipalityContextValue;
};

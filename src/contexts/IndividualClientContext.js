// IndividualClientContext.js

import React, { createContext, useContext, useState } from "react";
import ApiTemplate from "../apis/api_template";
import { jsonHeader, multiFormHeader } from "../apis/header";

const IndividualClientContext = createContext();

export const IndividualClientContextProvider = ({ children }) => {
  const [clientInfo, setClientInfo] = useState(null);

  const getClientInfo = async (token) => {
    try {
      const headers = jsonHeader(token);
      const response = await ApiTemplate("get", "/api/client_profile", {}, headers);

      if (response && response.success && response.data) {
        setClientInfo(response.data.profile);
      } else {
        setClientInfo(null);
      }
    } catch (error) {
      console.error("Error fetching client information:", error);
    }
  };

  const editClientInfo = async (token, id, data) => {
    try {
      const headers = multiFormHeader(token);
      const response = await ApiTemplate(
        "post",
        `/api/client_profile/update/${id}`,
        data,
        headers
      );

      if (response && response.success === true) {
        await getClientInfo(token);
        return true;
      }
    } catch (error) {
      console.error("Error editing client information:", error);
      return false;
    }
  };

  return (
    <IndividualClientContext.Provider
      value={{
        clientInfo,
        getClientInfo,
        editClientInfo,
      }}
    >
      {children}
    </IndividualClientContext.Provider>
  );
};

export const useIndividualClientContext = () => {
  const clientContextValue = useContext(IndividualClientContext);
  return clientContextValue;
};

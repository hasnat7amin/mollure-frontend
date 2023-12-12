
import React, { createContext, useContext, useState } from "react";
import ApiTemplate from "../apis/api_template";
import { jsonHeaderWithoutToken, multiFormHeaderWithoutToken } from "../apis/header";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null)

  const login = async (credentials, showCongratsPopup) => {
    try {

      const headers = jsonHeaderWithoutToken();

      const response = await ApiTemplate(
        "post",
        "/api/login",
        JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
        headers,

      );
      if (response && response["status"] === true) {
        console.log(response["user"]);

        await localStorage.setItem("token", JSON.stringify(response["token"]));
        await localStorage.setItem("user", JSON.stringify(response["user"]));

        setToken(response["token"]);
        setIsLoggedIn(true);
        setUserProfile(response["user"]);

        // window.location.href="/" ;
      } else {
        // console.log("error: ", response)
        setError("Please check your credentials again.");
      }

    } catch (error) {
      console.log("error.message message: ", error.message)

      setError(error.message)
    }
  };

  const signUpProfessionalAndCompany = async (data) => {
    try {

      const headers = multiFormHeaderWithoutToken();

      const response = await ApiTemplate(
        "post",
        "/api/professional_registeration",
        data,
        headers,
      );
      if (response && response["success"] === true) {

        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const signUpIndividual = async (data) => {
    try {

      const headers = multiFormHeaderWithoutToken();

      const response = await ApiTemplate(
        "post",
        "/api/client_registeration",
        data,
        headers,

      );
      if (response && response["success"] === true) {
        console.log(response["user"]);


        return true;

        // window.location.href="/" ;
      } else {
        // console.log("error: ", response)
        return false;
      }

    } catch (error) {
      console.log("error.message message: ", error.message)

      setError(error.message)
    }
  };

  const logout = async () => {
    // Implement the logic to log out the user, e.g., clearing tokens or session data
    await localStorage.removeItem("token");
    await localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  const isUserLoggedIn = () => {
    return isLoggedIn;
  };

  const checkUser = async () => {
    try {
      console.log(" checking user");
      const token = JSON.parse(await localStorage.getItem("token"));
      const user = JSON.parse(await localStorage.getItem("user"));
      // Implement the logic to check if the user is still authenticated (e.g., token validation)

      if (token !== null && user !== null) {
        setToken(token);
        setIsLoggedIn(true);
        setUserProfile(user);
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    } catch (error) {
      console.error("Error while checking user status:", error);
    }
  };

  const getUserProfile = () => {
    return userProfile;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isUserLoggedIn,
        checkUser,
        getUserProfile,
        userProfile,
        error,
        signUpProfessionalAndCompany,
        signUpIndividual,
        setError,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContextValue = useContext(AuthContext);
  return authContextValue;
};

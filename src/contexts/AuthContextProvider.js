
import React, { createContext, useContext, useState } from "react";
import ApiTemplate from "../apis/api_template";
import { jsonHeaderWithoutToken, multiFormHeaderWithoutToken, jsonHeader } from "../apis/header";

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
      const localToken = JSON.parse(await localStorage.getItem("token"));
      if (localToken !== null) {
        const headers = {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.head
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content"),
          "Authorization": "Bearer " + localToken,
        };

        const response = await ApiTemplate(
          "get",
          "/api/verifyToken",
          {},
          headers,
        );

        console.log(response)

        if (response && response["success"] === true) {
          console.log(response["data"]);
          // await localStorage.setItem("token", JSON.stringify(response["data"]["token"]));
          await localStorage.setItem("user", JSON.stringify(response["data"]["user"]));
          setIsLoggedIn(true);
          setToken(localToken)
          setUserProfile(response["data"]["user"]);

        } else {
          setIsLoggedIn(false);
          
          setUserProfile(null);
        }
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

  const forgotPassword = async (credentials) => {
    try {

      const headers = jsonHeaderWithoutToken();

      const response = await ApiTemplate(
        "post",
        "/api/forget-password",
        credentials,
        headers,

      );
      if (response && response["status"] === true) {
        return true;
        // window.location.href="/" ;
      } else {
        console.log("error response", response)
        return false
      }

    } catch (error) {
      console.log("error.message message: ", error)
      return false;
    }
  };

  const resetPassword = async (credentials) => {
    try {

      const headers = jsonHeaderWithoutToken();

      const response = await ApiTemplate(
        "post",
        "/api/reset-password",
        credentials,
        headers,

      );
      if (response && response["success"] === true) {
        return true;
        // window.location.href="/" ;
      } else {
        console.log("error response", response)
        return false
      }

    } catch (error) {
      console.log("error.message message: ", error)
      return false;
    }
  };

  const deleteAcount = async (token) => {
    try {

      const headers = jsonHeader(token);

      const response = await ApiTemplate(
        "delete",
        "/api/profile/delete_account",
        {},
        headers,

      );
      if (response && response["success"] === true) {
        return true;

      } else {
        console.log("error response", response)
        return false
      }

    } catch (error) {
      console.log("error.message message: ", error)
      return false;
    }
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
        token,
        isLoggedIn,
        forgotPassword,
        resetPassword,
        deleteAcount
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

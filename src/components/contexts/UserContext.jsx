import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import useApi from "../hooks/useApi";
import useSocket from "../hooks/useSocket";
import { useNavigate } from "react-router-dom";

const UserDetails = createContext();
export const useUser = () => useContext(UserDetails);
export const UserContextProvider = ({ children }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [token, setToken] = useState(cookies.get("auth-token") || null);
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const socket = useSocket("https://api.tapswap-clone.com");
  useEffect(() => {
    console.log("socket", socket);
  }, []);
  const { apiCall } = useApi();

  // const setAuthToken = (newToken) => {
  //   setToken(newToken);
  //   if (newToken) {
  //     cookies.set("auth-token", newToken, { path: "/", maxAge: 3600 });
  //   } else {
  //     cookies.remove("auth-token");
  //     setUserData(null);
  //   }
  // };
  const setAuthToken = (newToken) => {
    if (!newToken) return;
    setToken(newToken);
    cookies.set("auth-token", newToken, { path: "/", maxAge: 3600 });
  };

   const signOut = () => {
    cookies.remove("auth-token", { path: "/" });
    localStorage.removeItem("root");
    setToken(null);
    setUserData(null);
    navigate("/sign-in");
  };

  // const verifyUser = async () => {
  //   if (!token) {
  //     setUserData(null);
  //        navigate("/sign-in");
  //     return { success: false };
  //   }
  //   setLoadingUser(true);
  //   try {
  //     const response = await apiCall("GET", "user/get_user_info", null, token);
  //     if (response.success) {
  //       setUserData(response.data);
  //       return { success: true, data: response.data };
  //     } else {
  //       setAuthToken(null);
  //       return { success: false };
  //     }
  //   } catch (err) {
  //     setAuthToken(null);
  //     return { success: false };
  //   } finally {
  //     setLoadingUser(false);
  //   }
  // };

  const verifyUser = async () => {
    if (!token) {
      setUserData(null);
      navigate("/sign-in");
      return { success: false };
    }

    setLoadingUser(true);
    try {
      const response = await apiCall("GET", "user/get_user_info", null, token);

      if (response?.success) {
        setUserData(response.data);
        return { success: true, data: response.data };
      } else if (response?.msg === "Invalid token") {
        setAuthToken(null);
        navigate("/sign-in");
        return { success: false };
      } else {
        setAuthToken(null);
        navigate("/sign-in");
        return { success: false };
      }
    } catch (err) {
      setAuthToken(null);
      navigate("/sign-in");
      return { success: false };
    } finally {
      setLoadingUser(false);
    }
  };
  useEffect(() => {
    let interval;
    let isVerifying = false;

    const verifyLoop = async () => {
      if (!token || isVerifying) return;
      isVerifying = true;
      await verifyUser();
      isVerifying = false;
    };

    if (token) {
      verifyLoop();
      interval = setInterval(verifyLoop, 10000);
    } else {
      setLoadingUser(false);
    }

    return () => clearInterval(interval);
  }, [token]);

  //  useEffect(() => {
  //   if (token) {
  //     verifyUser();
  //     const interval = setInterval(() => {
  //       verifyUser();
  //     }, 10000);
  //     return () => clearInterval(interval);
  //   } else {
  //     setLoadingUser(false);
  //   }
  // }, [token]);
  const setTempToken = (newToken) => {
    if (!newToken) {
      cookies.remove("temp-token");
      return;
    }
    cookies.set("temp-token", newToken, { path: "/" });
  };
  const getTempToken = () => {
    return cookies.get("temp-token");
  };
  return (
    <UserDetails.Provider
      value={{
        token,
        setAuthToken,
        userData,
        setUserData,
        verifyUser,
        socket,
        loadingUser,
        setTempToken,
        getTempToken,
         signOut,
      }}
    >
      {children}
    </UserDetails.Provider>
  );
};

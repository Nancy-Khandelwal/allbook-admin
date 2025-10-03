import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import useApi from "../hooks/useApi";
import useSocket from "../hooks/useSocket";


const UserDetails = createContext();
export const useUser = () => useContext(UserDetails);
export const UserContextProvider = ({ children }) => {
  const cookies = new Cookies();
  const [token, setToken] = useState(cookies.get("auth-token") || null);
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const socket = useSocket("https://api.tapswap-clone.com");
  useEffect(()=>{
    console.log("socket",socket);
  },[]);
  const { apiCall } = useApi();

  
  const setAuthToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      cookies.set("auth-token", newToken, { path: "/", maxAge: 3600 });
    } else {
      cookies.remove("auth-token");
      setUserData(null);
    }
  };

  const verifyUser = async () => {
    if (!token) {
      setUserData(null);
      return { success: false };
    }
    setLoadingUser(true);
    try {
      const response = await apiCall("GET", "user/get_user_info", null, token);
      if (response.success) {
        setUserData(response.data);
        return { success: true, data: response.data };
      } else {
        setAuthToken(null);
        return { success: false };
      }
    } catch (err) {
      setAuthToken(null);
      return { success: false };
    } finally {
      setLoadingUser(false);
    }
  };

  
  useEffect(() => {
    if (token) {
      verifyUser();  
    } else {
      setLoadingUser(false);
    }
  }, [token]);

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
      }}
    >
      {children}
    </UserDetails.Provider>
  );
};



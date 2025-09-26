// import { createContext, useContext, useState } from "react";
// import Cookies from "universal-cookie";

// const UserDetails = createContext();
// export const useUser = () => useContext(UserDetails);

// export const UserContextProvider = ({ children }) => {
//   const cookies = new Cookies();

//   // Initialize token state from cookie (if exists)
//   const [token, setToken] = useState(cookies.get("auth-token") || null);

//   // Function to set auth token both in cookie and React state
//   const setAuthToken = (newToken) => {
//     if (newToken) {
//       cookies.set("auth-token", newToken, { path: "/" });
//     } else {
//       cookies.remove("auth-token", { path: "/" });
//     }
//     setToken(newToken);
//   };

//   // Other context state and functions here...

//   return (
//     <UserDetails.Provider value={{ token, setAuthToken }}>
//       {children}
//     </UserDetails.Provider>
//   );
// };


import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import useApi from "../hooks/useApi";
import useSocket from "../hooks/useSocket";

// const UserDetails = createContext();
// export const useUser = () => useContext(UserDetails);

// export const UserContextProvider = ({ children }) => {
//   const cookies = new Cookies();
//   const [token, setToken] = useState(cookies.get("auth-token") || null);
//   const [userData, setUserData] = useState({});

//   const { apiCall } = useApi();

//   // Set auth token in cookie and state
//   const setAuthToken = (newToken) => {
//     if (newToken) {
//       cookies.set("auth-token", newToken, { path: "/" });
//     } else {
//       cookies.remove("auth-token", { path: "/" });
//     }
//     setToken(newToken);
//   };

//   // Verify user API call
//   const verifyUser = async () => {
//     const { data, success } = await apiCall("GET", "user/get_user_info");
//     if (success) {
//       setUserData(data);
//     } else {
//       console.error("Failed to verify user");
//     }
//     return { data, success };
//   };

//   return (
//     <UserDetails.Provider value={{ token, setAuthToken, userData, setUserData, verifyUser }}>
//       {children}
//     </UserDetails.Provider>
//   );
// };

const UserDetails = createContext();
export const useUser = () => useContext(UserDetails);

// export const UserContextProvider = ({ children }) => {
//   const cookies = new Cookies();
//   const [token, setToken] = useState(cookies.get("auth-token") || null);
//    const [userData, setUserData] = useState(null);

//   const { apiCall } = useApi();

//   // Set auth token in cookie and state
//   const setAuthToken = (newToken) => {
//     if (newToken) {
//       cookies.set("auth-token", newToken, { path: "/" });
//     } else {
//       cookies.remove("auth-token", { path: "/" });
//     }
//     setToken(newToken);
//   };

//   // Verify user API call
//   const verifyUser = async () => {
//     try {
//       const { data, success } = await apiCall("GET", "user/get_user_info");
//       if (success) {
//         console.log("fd",data)
//         setUserData(data); // username mil jayega
//         return { data, success: true };
//       }
//       return { data: null, success: false };
//     } catch (err) {
//       console.error("Failed to verify user", err);
//       return { data: null, success: false };
//     }
//   };

//   // Auto verify if token exists
//   useEffect(() => {
//     if (token) verifyUser();
//   }, [token]);
export const UserContextProvider = ({ children }) => {
  const cookies = new Cookies();
  const [token, setToken] = useState(cookies.get("auth-token") || null);
  const [userData, setUserData] = useState(null);
 const socket = useSocket("https://api.tapswap-clone.com");
  const { apiCall } = useApi();

  // Set auth token in cookie and state
  const setAuthToken = async (newToken) => {
    setToken(newToken);

    if (newToken) {
      cookies.set("auth-token", newToken, { path: "/", maxAge: 3600 });

      // Call verifyUser only after login
      try {
        const response = await apiCall("GET", "user/get_user_info", null, newToken);
        if (response.success) {
          setUserData(response.data);
        } else {
          // Token invalid → clear it
          setAuthToken(null);
        }
      } catch (err) {
        console.error("Failed to verify user", err);
        setAuthToken(null);
      }
    } else {
      cookies.remove("auth-token");
      setUserData(null);
    }
  };

  // Manual verify function if needed (e.g., in ProtectedRoute)
  const verifyUser = async () => {
    if (!token) return { success: false };
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
    }
  };

  return (
    <UserDetails.Provider value={{ token, setAuthToken, userData, setUserData, verifyUser ,socket}}>
      {children}
    </UserDetails.Provider>
  );
};
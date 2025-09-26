import axios from "axios";
import { apiEndpoint as baseUrl } from "../constant/common";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import useToast from "./useToast"

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";



 const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASEURL}/api/`,
  });
  
const useApi = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { toastError } = useToast();

  const apiCall = async (
    method,
    path,
    data = {},
    contentType = "application/json"
  ) => {
    try {
      const token = cookies.get("auth-token");

      
      const config = {
        url: `${baseUrl}${path}`,
        method,
        headers: {
          "Content-Type": contentType,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        ...(method.toLowerCase() === "get"
          ? { params: data }
          : { data: data }),
      };

      const response = await axios(config);

      if (response?.data) {
        const res = response.data;

        if (
          !res.success &&
          res.msg === "Your session has expired! please login again"
        ) {
          cookies.remove("auth-token");
          navigate("/sign-in");
          toastError("Your session has expired. Please login again");
          return { success: false, msg: res.msg, data: [] };
        }

        return res;
      }
    } catch (error) {
      const statusCode = error?.response?.status;
      const apiMessage = error?.response?.data?.msg;

         if (statusCode === 401) {
        cookies.remove("auth-token");
        navigate("/sign-in");
        toastError("Your session has expired. Please login again");
        return { success: false, msg: "Unauthorized", data: [] };
      }

      if (statusCode === 404) {
        return {
          success: false,
          msg: apiMessage || "No Data Found",
          data: [],
        };
      } else {
        return {
          success: false,
          msg:
            apiMessage ||
            "Error while processing your request please try again later",
          data: [],
          error: apiMessage,
        };
      }
    }
  };

  return { apiCall };
};

// const useApi = () => {
//   const cookies = new Cookies();
//   const navigate = useNavigate();
//   const { toastError } = useToast();

//   const apiCall = async (
//     method,
//     path,
//     data = {},
//     contentType = "application/json"
//   ) => {
//     try {
//       const token = cookies.get("auth-token");

//       const config = {
//         url: `${baseUrl}${path}`,
//         method,
//         data,
//         headers: {
//           "Content-Type": contentType,
//           Authorization: token ? `Bearer ${token}` : undefined, 
//         },
//       };

//       const response = await axios(config);

//       // if (response?.data) {
//       //   // Session expired handling
//       //   if (
//       //     !response.data.success &&
//       //     response.data.message ===
//       //       "Your session has expired! please login again"
//       //   ) {
//       //     cookies.remove("auth-token");
//       //     navigate("/login");
//       //     toastError("Your session has expired. Please login again");
//       //     return { success: false };
//       //   }

//       //   return response.data;
//       // }
//        if (response?.data) {
       
//         const res = response.data;

        
//         if (
//           !res.success &&
//           res.msg === "Your session has expired! please login again"
//         ) {
//           cookies.remove("auth-token");
//           navigate("/login");
//           toastError("Your session has expired. Please login again");
//           return { success: false, msg: res.msg, data: [] };
//         }

//         return res; 
//       }
//     } catch (error) {
//       const statusCode = error?.response?.status;
//       const apiMessage = error?.response?.data?.msg;

//       if (statusCode === 404) {
//         return {
//           success: false,
//           msg: apiMessage || "No Data Found",
//           data: [],
//         };
//       } else {
//         return {
//           success: false,
//           msg:
//             apiMessage ||
//             "Error while processing your request please try again later",
//           data: [],
//           error: apiMessage,
//         };
//       }
//     }
//   };

//   return { apiCall };
// };
export default useApi;

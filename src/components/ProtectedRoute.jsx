import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import useApi from "./hooks/useApi";
import { useUser } from "./contexts/UserContext";

const ProtectedRoute = ({ failRedirect, successRedirect, children }) => {
  const cookies = new Cookies();
  const [verification, setVerification] = useState("processing");
  const { apicall } = useApi();
  const { token, verifyUser } = useUser();

  useEffect(() => {
    (async () => {
      // const token = cookies.get("auth-token");
      if (token) {
        const verify = await verifyUser();
        if (verify && verify.success) {
          setVerification("true");
        } else {
          setVerification("false");
        }
      } else {
        setVerification("false");
      }
    })();
    // eslint-disable-next-line
  }, [token]);

  if (verification === "processing") {
    return null;
  }

  if (children && failRedirect) {
    return verification === "true" ? (
      children
    ) : (
      <Navigate to={failRedirect} replace />
    );
  }
  if (children && successRedirect) {
    return verification === "true" ? (
      <Navigate to={successRedirect} replace />
    ) : (
      children
    );
  }
  return verification === "true" ? (
    <Navigate to={successRedirect} replace />
  ) : (
    <Navigate to={failRedirect} replace />
  );
};

export default ProtectedRoute;

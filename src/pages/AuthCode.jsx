import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../components/hooks/useApi";
import b9 from "@images/b9.png";
import useToast from "../components/hooks/useToast";
import OtpInputBox from "./OtpInputBox";
import { useUser } from "../components/contexts/UserContext";

const Auth = () => {
  const navigate = useNavigate();
  const { apiCall } = useApi();
  const { toastSuccess, toastError } = useToast();
  const [codeGenerated, setCodeGenerated] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [authType, setAuthType] = useState(null);
  const { getTempToken, setAuthToken, setTempToken } = useUser();
const otpRef = useRef();
  const handleChange = async (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (!codeGenerated) {
        await generateAuthCode();
        setCodeGenerated(true);
      }

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  
  const generateAuthCode = async () => {
    try {
      const res = await apiCall("GET", "user/generate_auth_code");
      if (res?.success) {
        setAuthType(res?.data?.authType || null);
        if (res?.data?.authType === "telegram_auth") {
          // toastSuccess(res?.msg || "Telegram code sent!");
        } else if (res?.data?.authType === "google_auth") {
          // toastSuccess(res?.msg || "Google Auth ready!");
        }
      } else {
        toastError(res?.msg || "Failed to generate code");
      }
    } catch (err) {
      toastError(err.message || "API Error");
    }
  };

  const handleResend = async () => {
    await generateAuthCode();
  };

  useEffect(() => {
    generateAuthCode();
  }, []);

 
  const verifyTelegramAuth = async (authCode) => {
    const tempToken = await getTempToken();
    const res = await apiCall(
      "POST",
      "user/verify_auth_code",
      { authCode }
    );
    console.log("Telegram Verify Response:", res);

    if (res && res.success) {
      setAuthToken(tempToken);
      setTempToken(null);
      navigate("/market-analysis");
    } else {
      toastError(res?.msg || "Invalid Telegram code");
      setTimeout(() => {
				otpRef.current.resetOtp();
			}, 300);
    }
  };

 
  const verifyGoogleAuth = async (authCode) => {
    const tempToken = await getTempToken();
    const res = await apiCall(
      "POST",
      "user/verify_google_auth",
      { token: authCode }
    );
    console.log("Google Verify Response:", res);

    if (res?.success) {
      setAuthToken(tempToken);
      setTempToken(null);
      navigate("/market-analysis");
    } else {
      toastError(res?.msg || "Invalid Google Auth code");
      	setTimeout(() => {
				otpRef.current.resetOtp();
			}, 300);
    }
  };

 
  const handleOtpComplete = async (authCode) => {
    if (authType === "telegram_auth") {
      await verifyTelegramAuth(authCode);
    } else if (authType === "google_auth") {
      await verifyGoogleAuth(authCode);
    } else {
      toastError("Unknown authentication type");
    }
  };

  return (
    <div className="login-auth">
      <div className="loginInner1 authentication">
        <div
          className="log-logo m-b-20"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={b9}
            alt="logo"
            style={{
              width: "200px",
              height: "250px",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="featured-box-login featured-box-secundary default">
          <h3 className="text-center">
            Security Code Verification Using Telegram App
          </h3>

          <div className="mt-3 text-center">
            Enter 6-digit code from your {authType === "google_auth" ? "Google Authenticator" : "Telegram Bot"}{" "}
            <span>
              <a href="#" onClick={handleResend}>
                Resend Code
              </a>
            </span>
          </div>

          <OtpInputBox  ref={otpRef} onComplete={handleOtpComplete} />
        </div>
      </div>
    </div>
  );
};


export default Auth;

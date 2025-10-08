import React, { useState, useEffect,useRef } from "react";
import useApi from "../components/hooks/useApi";
import useToast from "../components/hooks/useToast";
import Cookies from "universal-cookie";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Textinput from "../components/ui/Textinput";
import Loading from "../components/Loading";
import CopyToClipboard from "react-copy-to-clipboard";
import { useUser } from "../components/contexts/UserContext";
import OtpInputBox from "./OtpInputBox";
import { useNavigate, useLocation } from "react-router-dom";

const SecureAuthVerification = () => {
  const { apiCall } = useApi();
  const { toastSuccess, toastError } = useToast();
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  const [copyBtn, setCopyBtn] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [authCode, setAuthCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpContainer, setShowOtpContainer] = useState(false);
  const [isQrScanned, setIsQrScanned] = useState(false);
  const [showMobileOtp, setShowMobileOtp] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const { userData,signOut } = useUser();
  const otpRef = useRef();

  const handleEnableAdmin2FA = async () => {
    try {
      setLoading(true);
      const res = await apiCall("GET", "user/enable_2fa");

      if (res.success) {
        toastSuccess(res.msg || "2FA setup initiated");

        setData({
          img: res.data.qrURL,
          secret: res.data.secret,
        });
        setIsQrScanned(true);
      } else {
        toastError(res.msg || "Failed to enable 2FA");
      }
    } catch (err) {
      toastError(err.message || "API Error");
    } finally {
      setLoading(false);
    }
  };

  const handleEnableTelegramAuth = async () => {
    if (!loginPassword) {
      toastError("Please enter your login password");
      return;
    }

    try {
      setLoading(true);

      const res = await apiCall("POST", "user/enable_telegram_auth", {
        password: loginPassword,
      });

      if (res.success) {
        toastSuccess(
          res.msg || "Password verified and code generated successfully"
        );
        setAuthCode(res.data?.code || "");
        setShowContent(true);
      } else {
        toastError(res.msg || "Failed to generate Telegram auth code");
        setShowContent(false);
      }
    } catch (err) {
      toastError(err.message || "API Error");
    } finally {
      setLoading(false);
    }
  };

  const generateOtp = async () => {
    const res = await apiCall("GET", "user/generate_auth_code");
    if (res && res.success) {
      setShowOtpContainer(true);
    } else {
    }
  };

  const handleDisableTelegramAuth = async (authCode) => {
    const res = await apiCall("POST", "user/disable_telegram_auth", {
      authCode,
    });
    if (res && res.success) {
      toastSuccess(
        res?.msg || "2-Step Verification is disabled for your account."
      );
      setTimeout(() => {
				signOut();
			}, 1000);
    } else {
      setTimeout(() => {
				otpRef.current.resetOtp();
			}, 300);
      toastError(res?.msg || "Invalid code");
    }
  };

  const handleToggle2FA = async (otpCode) => {
    try {
      setLoading(true);

      if (otpCode) {
        const res = await apiCall("POST", "user/disable_2fa", {
          token: otpCode,
        });
        if (res.success) {
          toastSuccess(res.msg || "2FA disabled successfully");
          setTimeout(() => {
				signOut();
			}, 1000);
          // setUserData(prev => ({ ...prev, twoFactorAuth: false }));
          setShowOtpContainer(false);
          setShowMobileOtp(false);
          setData(null);
          setAuthCode("");
          setLoginPassword("");
        } else {
          setTimeout(() => {
				otpRef.current.resetOtp();
			}, 300);
          toastError(res.msg || "Wrong OTP. Please try again.");
        }
      } else {
        if (userData?.twoFactorAuth) {
          setShowMobileOtp(true);
        } else {
          await handleEnableAdmin2FA();
        }
      }
    } catch (err) {
      toastError(err.message || "API Error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle2FA1 = async (otpCode) => {
    if (!data?.secret) {
      toastError("Secret not found. Please generate QR first.");
      return;
    }

    try {
      setLoading(true);
      const res = await apiCall("POST", "user/save_and_verify_2fa", {
        secret: data.secret,
        token: otpCode,
      });

      if (res.success) {
        toastSuccess(res.msg || "2FA enabled successfully");
        userData.twoFactorAuth = true;
       setTimeout(() => {
				signOut();
			}, 1000);
        setIsQrScanned(false);
        setData(null);
      } else {
        setTimeout(() => {
				otpRef.current.resetOtp();
			}, 300);
        toastError(res.msg || "Wrong OTP. Please try again.");
      }
    } catch (err) {
      console.error("2FA verification error:", err);
      // toastError("Something went wrong while verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.twoFactorAuth && !activeTab) {
      setActiveTab("mobile-app");
    }
  }, [userData?.twoFactorAuth]);

  const onCopyText = () => {
    setCopyBtn(true);
    setTimeout(() => setCopyBtn(false), 2000);
  };
  return (
    <div className="w-full p-3">
      <div className="security-auth">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box flex items-center justify-between">
              <h4 className="mb-0 font-size-18">Secure Auth Verification</h4>
              <div className="page-title-right"></div>
            </div>
          </div>
        </div>{" "}
        <div>
          <div className="card-body">
            <div className="text-center">
              <b>Secure Auth Verification Status:</b>
              

              <span
                className={`${
                  userData?.twoFactorAuth ? "bg-success" : "bg-danger"
                } p-2 text-white ms-3 cursor-pointer`}
                onClick={async () => {
                 
                  if (userData?.twoFactorAuth) {
                    const type =
                      userData?.twoFactorAuthType || activeTab || "mobile-app";
                    setActiveTab(type);

                    if (userData.authType === "telegram_auth") {
                      setShowOtpContainer(true); 
                      setShowMobileOtp(false);
                      // handleEnableTelegramAuth();
                       await generateOtp();
                    } else if (userData.authType === "google_auth") {
                      setShowMobileOtp(true); 
                      setShowOtpContainer(false);
                      // handleEnableAdmin2FA();
                    }
                    return;
                  }

                 
                }}
              >
                {userData?.twoFactorAuth ? "Enabled" : "Disabled"}
              </span>
            </div>{" "}
            {!( userData?.twoFactorAuth) ? (
              <>
                <div className="mt-2 text-center">
                  Please select below option to enable secure auth verification
                </div>{" "}
                <div className="casino-report-tabs mt-3">
                  <ul className="nav nav-tabs">
                    <li className="nav-item pointer">
                      <a
                        className={`nav-link ${
                          activeTab === "mobile-app" ? "active" : ""
                        }`}
                        onClick={() => {
                          setActiveTab("mobile-app");
                          handleEnableAdmin2FA();
                        }}
                      >
                        Enable Using Mobile App
                      </a>
                    </li>{" "}
                    <li className="nav-item pointer">
                      <a
                        className={`nav-link ${
                          activeTab === "telegram" ? "active" : ""
                        }`}
                        onClick={async () => {
                          setActiveTab("telegram");
                          setLoginPassword("");
                          setAuthCode("");
                          setData(null);

                          if (userData?.twoFactorAuth) {
                            await generateOtp();
                          } else {
                            setShowOtpContainer(false);
                          }
                        }}
                      >
                        Enable Using Telegram
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : null}{" "}
            <div className="tab-content mt-4"> </div>
            {/* mobile app */}
            {activeTab === "mobile-app" && !userData.twoFactorAuth && data && (
              <div className="tab-content mt-4 !border-none">
                <div className="tab-pane mobile-app active">
                  {" "}
                  <div className="text-center">
                    <div className="mt-3">
                      Please enter below auth code in your 'Secure Auth
                      Verification App'.
                    </div>{" "}
                    <div className="mt-3">
                      <div className="verify-code1">
                        {/* {authCode} */}
                        {data && (
                          <div className="mt-4">
                            <div className="flex justify-center">
                              <img
                                src={data.img}
                                className="border rounded-lg m-3 w-56"
                              />
                            </div>
                            <div className="flex items-center my-5 mx-10">
                              <div className="flex-grow border-t border-slate-400"></div>
                              <span className="mx-3 text-black text-xs !tracking-[0px]">
                                OR
                              </span>
                              <div className="flex-grow border-t border-slate-400"></div>
                            </div>
                            <div className="flex items-center gap-1 w-full max-w-md flex items-center my-5 mx-10">
                              <label className="whitespace-nowrap font-semibold mr-10">
                                Secret:
                              </label>
                              <Textinput
                                type="text"
                                value={data.secret}
                                readOnly
                                className="flex-grow border rounded px-2 py-1 text-sm border-t "
                              />
                              <CopyToClipboard
                                text={data.secret}
                                onCopy={onCopyText}
                              >
                                <button className="p-2 border rounded bg-white hover:bg-gray-100">
                                  <Icon
                                    icon={
                                      copyBtn
                                        ? "iconamoon:copy-fill"
                                        : "iconamoon:copy-duotone"
                                    }
                                    width={20}
                                  />
                                </button>
                              </CopyToClipboard>
                            </div>

                          
                            {isQrScanned && (
                              <div className="mt-6">
                                <h6 className="text-center font-bold mb-2">
                                  Enter 6-digit OTP Code
                                </h6>
                                <div className="flex justify-center login-auth">
                                  <OtpInputBox ref={otpRef} onComplete={handleToggle2FA1} />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>{" "}
                    <div className="mt-3">
                      <b>
                        If you haven't downloaded,
                        <br />
                        please download 'Secure Auth Verification App' from
                        below link.
                      </b>
                    </div>
                    <div className="mt-3">
                      Using this app you will receive auth code during login
                      authentication
                    </div>{" "}
                    <div className="mt-3">
                      <a href="https://dataobj.ecoassetsservice.com/secure-auth-apk/SecureAuthApp-2.0.apk">
                        <button className="btn btn-primary">
                          <i className="fab fa-android"></i>
                          <span>Download on the Android</span>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>{" "}
              </div>
            )}
            {activeTab === "telegram" &&
              !userData?.twoFactorAuth &&
              !showOtpContainer && (
                <div className="tab-content mt-4 !border-none">
                  {" "}
                  <div className="tab-pane telegram active">
                    {" "}
                    <div className="text-center">
                      {!showOtpContainer && (
                        <>
                          <b>Please enter your login password to continue</b>{" "}
                          <div className="form-group mt-3 secure-password">
                            <input
                              type="password"
                              placeholder="Enter your login password"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              className="form-control"
                            />{" "}
                            <button
                              onClick={handleEnableTelegramAuth}
                              disabled={loading}
                              className="btn btn-primary ml-2 vt"
                            >
                              {" "}
                              {loading ? "Verifying..." : "Get Connection ID"}
                              {/* Get Connection ID */}
                            </button>
                          </div>
                        </>
                      )}
                      {authCode && (
                        <div className="mt-3">
                          <b>
                            Please follow below instructions for the telegram
                            2-step verification
                          </b>{" "}
                          <p>
                            Find{" "}
                            <a
                              target="_blank"
                              href="https://t.me/invesment12_bot?start"
                              className="text-primary"
                            >
                              @invesment12_bot
                            </a>{" "}
                            in your telegram and type
                            <kbd>/start</kbd>
                            command. Bot will respond you.
                          </p>{" "}
                          <p className="text-dark">
                            After this type <kbd>/connect {authCode}</kbd> and
                            send it to BOT.
                          </p>{" "}
                          <p>
                            Now your telegram account will be linked with your
                            website account and 2-Step veriication will be
                            enabled.
                          </p>{" "}
                          <hr />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            {userData?.authType === "telegram_auth" && showOtpContainer && (
              <div className="login-form mt-4 login-auth">
                <h4 className="text-center login-title">
                  Security Code Verification Using Telegram App
                </h4>
                <p>Enter 6-digit code from your telegram bot</p>
                <OtpInputBox ref={otpRef} onComplete={handleDisableTelegramAuth} />
              </div>
            )}
            {userData?.authType === "google_auth" &&
              !isQrScanned &&
              showMobileOtp && (
                <div className="login-form mt-4 login-auth">
                <h4 className="text-center login-title">
                  Security Code Verification Using Google Authenticator
                </h4>
                <p>Enter 6-digit code from your Google Authenticator</p>
               <OtpInputBox ref={otpRef} onComplete={handleToggle2FA} />
              </div>
               
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureAuthVerification;

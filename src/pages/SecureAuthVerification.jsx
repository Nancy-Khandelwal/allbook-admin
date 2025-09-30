import React, { useState, useEffect } from 'react'
import useApi from "../components/hooks/useApi";
import useToast from "../components/hooks/useToast";
import Cookies from "universal-cookie";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Textinput from "../components/ui/Textinput";
import Loading from "../components/Loading";
import CopyToClipboard from "react-copy-to-clipboard";

const SecureAuthVerification = () => {
  const { apiCall } = useApi();
  const { toastSuccess, toastError } = useToast();
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  const [copyBtn, setCopyBtn] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [authCode, setAuthCode] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleGenerateCode = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await apiCall("POST", "user/generate_auth_code");

  //     if (res.success) {
  //       toastSuccess(res.msg || "Auth code generated successfully");

  //       setAuthCode(res.data?.code || "");
  //     } else {
  //       toastError(res.msg || "Failed to generate auth code");
  //     }
  //   } catch (err) {
  //     toastError(err.message || "API Error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
 const handleEnableAdmin2FA = async () => {
  try {
    setLoading(true);
    const res = await apiCall("GET", "user/enable-admin-2FA");

    if (res.success) {
      toastSuccess(res.msg || "2FA setup initiated");

      setData({
        img: res.data,      
        secret: res.secret, 
      });
    } else {
      toastError(res.msg || "Failed to enable 2FA");
    }
  } catch (err) {
    toastError(err.message || "API Error");
  } finally {
    setLoading(false);
  }
};

  const handleGenerateCode1 = async () => {
    try {
      setLoading(true);
      const res = await apiCall("POST", "user/update_two_factor_auth", {
        enable: true,
      });

      if (res.success) {
        toastSuccess(res.msg || "Auth code generated successfully");
        setAuthCode(res.data?.code || "");
      } else {
        toastError(res.msg || "Failed to generate auth code");
      }
    } catch (err) {
      toastError(err.message || "API Error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndGenerateCode = async () => {
    if (!loginPassword) {
      toastError("Please enter your login password");
      return;
    }

    try {
      setLoading(true);

      const res = await apiCall("POST", "user/verify_password_enable_2fa", {
        password: loginPassword,
      });

      if (res.success) {


        // Step 2: Generate 2FA code after successful verification
        await handleGenerateCode1();
      } else {
        toastError(res.msg || "Password verification failed");
      }
    } catch (err) {
      toastError(err.message || "API Error");
    } finally {
      setLoading(false);
    }
  };

const onCopyText = () => {
    setCopyBtn(true);
    setTimeout(() => setCopyBtn(false), 2000);
  };
  return (
    <div className='w-full p-3'>
      <div className="security-auth"><div className="row"><div className="col-12"><div className="page-title-box flex items-center justify-between"><h4 className="mb-0 font-size-18">Secure Auth Verification</h4>
        <div className="page-title-right"></div></div></div></div> <div>
          <div className="card-body"><div className="text-center"><b>Secure Auth Verification Status:</b> <span className="badge badge-danger">Disabled</span></div> <div className="mt-2 text-center">
            Please select below option to enable secure auth verification
          </div> <div className="casino-report-tabs mt-3">
              <ul className="nav nav-tabs"><li className="nav-item pointer">
                <a className={`nav-link ${activeTab === 'mobile-app' ? 'active' : ''}`} onClick={() => {
                  setActiveTab("mobile-app");
                  handleEnableAdmin2FA();
                }}>Enable Using Mobile App</a></li> <li className="nav-item pointer">
                  <a className={`nav-link ${activeTab === 'telegram' ? 'active' : ''}`} onClick={() => setActiveTab("telegram")}>Enable Using Telegram</a></li></ul></div> <div className="tab-content mt-4">  </div>
            {/* mobile app */}
            {
              activeTab === 'mobile-app' && (
                <div className="tab-content mt-4 !border-none"><div className="tab-pane mobile-app active"> <div className="text-center"><div className="mt-3">
                  Please enter below auth code in your 'Secure Auth Verification App'.
                </div> <div className="mt-3">
                  <div className="verify-code1">
                  {/* {authCode} */}
                   {data && (
  <div className="mt-4">
    <div className="flex justify-center">
      <img
        src={data.img}          // QR code image
        className="border rounded-lg m-3 w-56"
      />
    </div>
   <div className="flex items-center my-5 mx-10">
  <div className="flex-grow border-t border-slate-400"></div>
  <span className="mx-3 text-black text-xs !tracking-[0px]">OR</span>
  <div className="flex-grow border-t border-slate-400"></div>
</div>

    <div className="flex items-center justify-between">
      <Textinput
        label="Secret : "
        classLabel="w-fit"
         divClass="w-auto min-w-[200px]" 
        // divClass="w-full !text-[20px]"
        type="text"
        value={data.secret}    
        readOnly
        horizontal
      />
      <CopyToClipboard text={data.secret} onCopy={onCopyText}>
        <button>
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
  </div>
)}


                </div></div> <div className="mt-3"><b>If you haven't downloaded,<br />please download 'Secure Auth
                  Verification App' from below link.</b></div>
                  <div className="mt-3">
                    Using this app you will receive auth code during login
                    authentication
                  </div> <div className="mt-3">
                    <a href="https://dataobj.ecoassetsservice.com/secure-auth-apk/SecureAuthApp-2.0.apk">
                      <button className="btn btn-primary"><i className="fab fa-android"></i>
                        <span>Download on the Android</span></button></a></div></div></div> </div>
              )}


            {/* telegram */}
            {
              activeTab === 'telegram' && (
                <div className="tab-content mt-4 !border-none"> <div className="tab-pane telegram active"> <div className="text-center"><b>Please enter your login password to continue</b> <div className="form-group mt-3 secure-password">
                  <input type="password" placeholder="Enter your login password" value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)} className="form-control" /> <button onClick={handleVerifyAndGenerateCode} disabled={loading} className="btn btn-primary ml-2 vt"> {loading ? "Verifying..." : "Get Connection ID"}
                    {/* Get Connection ID */}
                  </button></div>

                  {authCode && (
                    <div className="mt-3"><b>Please follow below instructions for the telegram 2-step
                      verification</b> <p>
                        Find <a target="_blank" href="https://t.me/two_factor_gauth_bot?start" className="text-primary">@two_factor_gauth_bot</a> in your telegram and type
                        <kbd>/start</kbd>
                        command. Bot will respond you.
                      </p> <p className="text-dark">
                        After this type <kbd>/connect {authCode}</kbd> and
                        send it to BOT.
                      </p> <p>
                        Now your telegram account will be linked with your website account
                        and 2-Step veriication will be enabled.
                      </p> <hr /></div>
                  )}
                </div>
                </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureAuthVerification
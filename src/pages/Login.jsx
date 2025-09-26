import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useApi from "../components/hooks/useApi"
import b9 from '@images/b9.png';
const Login = () => {
    const navigate = useNavigate();
    const { apiCall } = useApi();
    const [successfullyChangePassword, setSuccessfullyChangePassword] = useState(false);
    const [txnPassword, setTxnPassword] = useState("");
     const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted with data:", formData);
  setLoading(true);
  setError("");

  try {
    // request payload
    const data = JSON.stringify(formData);

    // API call in the same format as SignIn.jsx
    const res = await apiCall("POST", "user/reset_password", data);

    if (!res || !res.success) {
      throw new Error(res?.msg || "Something went wrong");
    }

    // txnPassword store karo agar response me ho
    if (res.data?.txnPassword) {
      setTxnPassword(res.data.txnPassword);
    }

    setSuccessfullyChangePassword(true);
  } catch (err) {
    console.error("Change password error:", err);
    setError(err.message || "Failed to change password");
  } finally {
    setLoading(false);
  }
};

    return (
        <>
        {
            successfullyChangePassword ? (
                <div className="cp-success-box"><div className="text-center container"><h1><span className="text-success">Success! Your password has been updated successfully.</span></h1> <h1>Your transaction password is  
                    {/* <span className="text-info token-box">469272</span>.  */}
                     <span className="text-info token-box">{txnPassword}</span>.
                    </h1> <h2>Please remember this transaction password, from now on all transcation of the website can be done only with this password and keep one thing in mind, do not share this password with anyone.</h2> <h2 className="mt-3 text-dark">Thank you, Team allbook.com</h2> <div className="font-hindi"><h1 className="mt-5"><span className="text-success">Success! आपका पासवर्ड बदला जा चुका है।</span></h1> <h1>आपका लेनदेन पासवर्ड <span className="text-info token-box">{txnPassword}</span> है।</h1> <h2>कृपया इस लेन-देन के पासवर्ड को याद रखें, अब से वेबसाइट के सभी हस्तांतरण केवल इस पासवर्ड से किए जा सकते हैं और एक बात का ध्यान रखें, इस पासवर्ड को किसी के साथ साझा न करें।</h2> <h2 className="mt-3 text-dark">धन्यवाद, टीम allbook.com</h2></div> <a href="/" className="btn btn-dark btn-lg mt-5 router-link-active min-w-[200px]" ><i className="fas fa-arrow-left mr-3"></i>Back</a></div></div>
            ) :
            (
                <div className='app h-screen !flex !flex-col !items-center w-full bg-[linear-gradient(#2E4A3B,#303733)]'>
       <section className="login-mn !pt-10">
        <div className="log-logo m-b-20 !flex !flex-col !items-center py-0.5">
        {/* <img src="https://sitethemedata.com/sitethemes/saffronexch.com/front/logo.png" className="max-w-[250px] max-h-[100px]" /> */}
        {/* <img src={b9} className='mx-auto' style={{ maxWidth: '350px', maxHeight: "100px" }} /> */}
          <img
                          src={b9}
                          alt="logo"
                          style={{ width: '150px', height: '100px', objectFit: 'contain' }}
                        />
        </div> <div className="log-fld"><h2 className="text-center">Change Password</h2>
           <form data-vv-scope="form-changepassword"  className="change-form p-2"  onSubmit={handleSubmit}><div className="form-group relative" ><label className="user-email-text !text-[14px] !text-[#000] !leading-[18px] !font-medium">Old Password</label> 
       {/* <input type="password" name="OldPassword"   value={formData.oldPassword}
                    onChange={handleChange} className="form-control" aria-required="true" aria-invalid="false" /> */}
                     <input
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="form-control"
                  />
       <span className="error">
                </span>
        </div> <div className="form-group relative"><label className="user-email-text !text-[14px] !text-[#000] !leading-[18px]">New Password</label> 
        {/* <input type="password" name="NewPassword"  value={formData.reNewPassword}
                    onChange={handleChange} className="form-control" aria-required="false" aria-invalid="false" /> */}
                     <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="form-control"
                  />
       <span className="error">
                </span>
                 </div> <div className="form-group relative"><label className="user-email-text !text-[14px] !text-[#000] !leading-[18px]">Confirm Password</label> 
                  <input
                    type="password"
                    name="reNewPassword"
                    value={formData.reNewPassword}
                    onChange={handleChange}
                    className="form-control"
                  />
                 {/* <input type="password" name="ConfirmNewPassword" data-vv-as="NewPassword"  value={formData.reNewPassword}
                    onChange={handleChange} className="form-control" aria-required="true" aria-invalid="false" /> */}
       <span className="error">
                </span>
                 </div> <div className="form-group mb-0">
                    {/* <button type="submit" className="btn btn-submit btn-login" onClick={(e) => {e.preventDefault(); setSuccessfullyChangePassword(true);}}>
                    Change Password
                </button> */}
                  <button
                    type="submit"
                    className="btn btn-submit btn-login"
                    disabled={loading}
                  >
                    {loading ? "Changing..." : "Change Password"}
                  </button>
                </div></form></div> </section>
                </div>
            )
        }
        
                </>
    )
}

export default Login
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../components/hooks/useApi";
import b9 from "@images/b9.png";
import * as yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const { apiCall } = useApi();
  const [successfullyChangePassword, setSuccessfullyChangePassword] =
    useState(false);
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
  const [errors, setErrors] = useState({
    newPassword: "",
    reNewPassword: "",
  });

    const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  const changePasswordSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required("New Password is required")
      .min(8, "New Password must be at least 8 characters")
      .matches(
        passwordRule,
        "New Password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number"
      ),
    reNewPassword: yup
      .string()
      .required("Confirm Password is required")
      .min(8, "Confirm Password must be at least 8 characters")
      .oneOf([yup.ref("newPassword"), null], "Confirm Password does not match"),
  });


  // handle new password validation
  const handleNewPasswordChange = async (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, newPassword: value }));

    try {
      await changePasswordSchema.validateAt("newPassword", {
        newPassword: value,
      });
      setErrors((prev) => ({ ...prev, newPassword: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, newPassword: err.message }));
    }

    // re-validate confirm password if already typed
    if (formData.reNewPassword) {
      try {
        await changePasswordSchema.validateAt("reNewPassword", {
          newPassword: value,
          reNewPassword: formData.reNewPassword,
        });
        setErrors((prev) => ({ ...prev, reNewPassword: "" }));
      } catch (err) {
        setErrors((prev) => ({ ...prev, reNewPassword: err.message }));
      }
    }
  };
  const handleReNewPasswordChange = async (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, reNewPassword: value }));

    try {
      await changePasswordSchema.validateAt("reNewPassword", {
        newPassword: formData.newPassword,
        reNewPassword: value,
      });
      setErrors((prev) => ({ ...prev, reNewPassword: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, reNewPassword: err.message }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    
    const { oldPassword, newPassword, reNewPassword } = formData;

    if (!oldPassword || !newPassword || !reNewPassword) {
      toastError("All fields are required");
      return;
    }

    // validate both passwords before submit
    try {
      await changePasswordSchema.validate(
        { newPassword, reNewPassword },
        { abortEarly: false }
      );
    } catch (validationError) {
      const validationErrors = {};
      validationError.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      toastError("Please correct the highlighted errors.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = JSON.stringify(formData);

      const res = await apiCall("POST", "user/reset_password", data);

      if (!res || !res.success) {
        throw new Error(res?.msg || "Something went wrong");
      }

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
      {successfullyChangePassword ? (
        <div className="cp-success-box">
          <div className="text-center container">
            <h1>
              <span className="text-success">
                Success! Your password has been updated successfully.
              </span>
            </h1>{" "}
            <h1>
              Your transaction password is
              <span className="text-info token-box">{txnPassword}</span>.
            </h1>{" "}
            <h2>
              Please remember this transaction password, from now on all
              transcation of the website can be done only with this password and
              keep one thing in mind, do not share this password with anyone.
            </h2>{" "}
            <h2 className="mt-3 text-dark">Thank you, Team allbook.com</h2>{" "}
            <div className="font-hindi">
              <h1 className="mt-5">
                <span className="text-success">
                  Success! आपका पासवर्ड बदला जा चुका है।
                </span>
              </h1>{" "}
              <h1>
                आपका लेनदेन पासवर्ड{" "}
                <span className="text-info token-box">{txnPassword}</span> है।
              </h1>{" "}
              <h2>
                कृपया इस लेन-देन के पासवर्ड को याद रखें, अब से वेबसाइट के सभी
                हस्तांतरण केवल इस पासवर्ड से किए जा सकते हैं और एक बात का ध्यान
                रखें, इस पासवर्ड को किसी के साथ साझा न करें।
              </h2>{" "}
              <h2 className="mt-3 text-dark">धन्यवाद, टीम allbook.com</h2>
            </div>{" "}
            <a
              href="/"
              className="btn btn-dark btn-lg mt-5 router-link-active min-w-[200px]"
            >
              <i className="fas fa-arrow-left mr-3"></i>Back
            </a>
          </div>
        </div>
      ) : (
        <div className="app h-screen !flex !flex-col !items-center w-full bg-[linear-gradient(#2E4A3B,#303733)]">
          <section className="login-mn !pt-10">
            <div className="log-logo m-b-20 !flex !flex-col !items-center py-0.5">
              {/* <img src="https://sitethemedata.com/sitethemes/saffronexch.com/front/logo.png" className="max-w-[250px] max-h-[100px]" /> */}
              {/* <img src={b9} className='mx-auto' style={{ maxWidth: '350px', maxHeight: "100px" }} /> */}
              <img
                src={b9}
                alt="logo"
                style={{
                  width: "150px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
            </div>{" "}
            <div className="log-fld">
              <h2 className="text-center">Change Password</h2>
              <form
                data-vv-scope="form-changepassword"
                className="change-form p-2"
                onSubmit={handleSubmit}
              >
                <div className="form-group relative">
                  <label className="user-email-text !text-[14px] !text-[#000] !leading-[18px] !font-medium">
                    Old Password
                  </label>

                  <input
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <span className="error"></span>
                </div>{" "}
                <div className="form-group relative">
                  <label className="user-email-text !text-[14px] !text-[#000] !leading-[18px]">
                    New Password
                  </label>

                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                     onChange={handleNewPasswordChange}
                    className="form-control"
                  />
                   {errors.newPassword && (
                    <div className="text-danger text-sm mt-1">
                      {errors.newPassword}
                    </div>
                  )}
                </div>{" "}
                <div className="form-group relative">
                  <label className="user-email-text !text-[14px] !text-[#000] !leading-[18px]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="reNewPassword"
                    value={formData.reNewPassword}
                   onChange={handleReNewPasswordChange}
                    className="form-control"
                  />

                   {errors.reNewPassword && (
                    <div className="text-danger text-sm mt-1">
                      {errors.reNewPassword}
                    </div>
                  )}
                </div>{" "}
                <div className="form-group mb-0">
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
                </div>
              </form>
            </div>{" "}
          </section>
        </div>
      )}
    </>
  );
};

export default Login;

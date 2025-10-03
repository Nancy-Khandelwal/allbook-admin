import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useApi from "../components/hooks/useApi";
import useToast from "../components/hooks/useToast";
import * as yup from "yup";
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
    .oneOf(
      [yup.ref("newPassword"), null],
      "Confirm Password does not match"
    )
    
});

const ChangePassword = ({ onClose }) => {
  const { apiCall } = useApi();
  const { toastSuccess, toastError } = useToast();
  const navigate = useNavigate();
  const [txnPassword, setTxnPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
  newPassword: "",
  reNewPassword: ""
});
const handleNewPasswordChange = async (e) => {
  const value = e.target.value;
  setNewPassword(value);

  try {
    await changePasswordSchema.validateAt("newPassword", { newPassword: value });
    setErrors((prev) => ({ ...prev, newPassword: "" }));
  } catch (err) {
    setErrors((prev) => ({ ...prev, newPassword: err.message }));
  }

  
  if (reNewPassword) {
    try {
      await changePasswordSchema.validateAt("reNewPassword", {
        newPassword: value,
        reNewPassword,
      });
      setErrors((prev) => ({ ...prev, reNewPassword: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, reNewPassword: err.message }));
    }
  }
};
const handleReNewPasswordChange = async (e) => {
  const value = e.target.value;
  setReNewPassword(value);

  try {
    await changePasswordSchema.validateAt("reNewPassword", {
      newPassword,
      reNewPassword: value,
    });
    setErrors((prev) => ({ ...prev, reNewPassword: "" }));
  } catch (err) {
    setErrors((prev) => ({ ...prev, reNewPassword: err.message }));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!txnPassword || !newPassword || !reNewPassword) {
      toastError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await apiCall("POST", "user/change_password", {
        txnPassword,
        newPassword,
        reNewPassword,
      });

      if (res.success) {
        toastSuccess(res.msg || "Password changed successfully");
        setTxnPassword("");
        setNewPassword("");
        setReNewPassword("");
        navigate("/sign-in");
        if (onClose) onClose();
      } else {
        toastError(res.msg || "Something went wrong");
      }
    } catch (error) {
      toastError(error.message || "API Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full p-3'>
      <div data-v-61537a09="" className="listing-grid"><div className="row"><div className="col-12"><div className="page-title-box pb-0 flex items-center justify-between"><h4 className="mb-0 text-[18px]">Change Password</h4> <div className="page-title-right"></div></div></div></div> <div className="col-12"><div className="row mt-3"><div className="col-4"><form onSubmit={handleSubmit} data-vv-scope="ChangePassword" method="post"><div className="form-group"><label className='!text-[#495057] !font-medium !text-[14px] !leading-[15px]'>New Password</label> <input type="password" data-vv-as="New Password" name="NewPassword" value={newPassword}
        // onChange={(e) => setNewPassword(e.target.value)}
          onChange={handleNewPasswordChange}
         className="form-control" aria-required="false" aria-invalid="false" /> </div> {errors.newPassword && (
  <div className="text-danger text-sm mt-1">{errors.newPassword}</div>
)}<br/>
         <div className="form-group"><label className='!text-[#495057] !font-medium !text-[14px] !leading-[15px]'>Confirm Password</label> <input data-vv-as="Confirm Password" type="password" name="ConfirmNewPassword" value={reNewPassword}
          // onChange={(e) => setReNewPassword(e.target.value)}
            onChange={handleReNewPasswordChange}
           className="form-control" aria-required="true" aria-invalid="false" /> </div>
           {errors.reNewPassword && (
  <div className="text-danger text-sm mt-1">{errors.reNewPassword}</div>
)} <br/>
            <div className="form-group"><label className='!text-[#495057] !font-medium !text-[14px] !leading-[15px]'>Transaction Password</label> <input data-vv-as="Transaction Code" type="password" name="password" value={txnPassword}
            onChange={(e) => setTxnPassword(e.target.value)} className="form-control" aria-required="true" aria-invalid="false" /> </div> <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Load"}
            {/* <button type="submit" className="btn btn-primary">Load */}
          </button></div></form></div></div></div></div>
    </div>
  )
}

export default ChangePassword
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useApi from "../components/hooks/useApi";
import useToast from "../components/hooks/useToast";

const ChangePassword = ({ onClose }) => {
  const { apiCall } = useApi();
  const { toastSuccess, toastError } = useToast();
  const navigate = useNavigate();
  const [txnPassword, setTxnPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
        onChange={(e) => setNewPassword(e.target.value)} className="form-control" aria-required="false" aria-invalid="false" /> </div> <div className="form-group"><label className='!text-[#495057] !font-medium !text-[14px] !leading-[15px]'>Confirm Password</label> <input data-vv-as="Confirm Password" type="password" name="ConfirmNewPassword" value={reNewPassword}
          onChange={(e) => setReNewPassword(e.target.value)} className="form-control" aria-required="true" aria-invalid="false" /> </div> <div className="form-group"><label className='!text-[#495057] !font-medium !text-[14px] !leading-[15px]'>Transaction Password</label> <input data-vv-as="Transaction Code" type="password" name="password" value={txnPassword}
            onChange={(e) => setTxnPassword(e.target.value)} className="form-control" aria-required="true" aria-invalid="false" /> </div> <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Load"}
            {/* <button type="submit" className="btn btn-primary">Load */}
          </button></div></form></div></div></div></div>
    </div>
  )
}

export default ChangePassword
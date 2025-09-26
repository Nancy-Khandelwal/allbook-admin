import React,{useState,useEffect} from 'react';
import {Icon} from '@iconify/react';
import useApi from '../components/hooks/useApi';
import Cookies from "universal-cookie";
import useToast from './hooks/useToast';
import signinIcon from '@images/sign-in-icon.svg'

const PasswordModal = ({ onClose, selectedUserp, updateAccountList2 }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [txnPassword, setTxnPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { apiCall } = useApi();
  const { toastSuccess, toastError } = useToast();

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword || !txnPassword) {
      toastError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toastError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        userId: selectedUserp._id,
        newPassword,
        reNewPassword: confirmPassword,
        txnPassword,
      };
   console.log("Payload sending =>", payload);
      const result = await apiCall("POST", "user/update_child_info", payload);

      if (result && result.success) {
        toastSuccess(result.msg || "Password updated successfully");

        if (typeof updateAccountList2 === "function") {
          updateAccountList2(selectedUserp._id, {});
        }

        onClose();
      } else {
        toastError(result?.msg || "Update failed");
      }
    } catch (err) {
      toastError(err?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="__BVID__243" role="dialog" aria-describedby="__BVID__243___BV_modal_body_" class="modal fade show !block" aria-modal="true"><div class="modal-dialog modal-md modal-dialog-scrollable"><span tabIndex="0"></span><div id="__BVID__243___BV_modal_content_" tabIndex="-1" class="modal-content"><header id="__BVID__243___BV_modal_header_" class="modal-header"><h4 class="modal-title">Password</h4> <button type="button" data-dismiss="modal" class="close text-white p-0 m-0" onClick={onClose}>×</button></header><div id="__BVID__243___BV_modal_body_" class="modal-body"> <form onSubmit={handleSubmit}data-vv-scope="UserChangePassword" method="post"><div class="form-group row"><label class="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">New Password</label> <div class="col-8 form-group-feedback form-group-feedback-right">
      <input type="password" name="userchangepasswordpassword"  value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} data-vv-as="Password" class="form-control" aria-required="false" aria-invalid="false" /> </div></div> <div class="form-group row"><label class="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Confirm Password</label> <div class="col-8 form-group-feedback form-group-feedback-right"><input type="password" name="userchangepasswordcpassword"  value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} data-vv-as="Confirm Password" class="form-control" aria-required="true" aria-invalid="false" /></div></div> <div class="form-group row"><label class="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Transaction Password</label> <div class="col-8 form-group-feedback form-group-feedback-right"><input type="password"   value={txnPassword}
                    onChange={(e) => setTxnPassword(e.target.value)} name="userchangepasswordmpassword" data-vv-as="Transaction Code" class="form-control" aria-required="true" aria-invalid="false" /> </div></div> <div class="form-group row"><div class="col-12 text-right"><button type="button" class="btn btn-back !bg-[#7cad79] !border-[#7cad79] !text-[#fff]" onClick={onClose}><Icon icon="fa7-solid:arrow-rotate-back" width="14" height="14"  style={{color: '#fff', display: 'inline'}} onClick={onClose} />
                    Back
                  </button>
                   {/* <button type="submit" class="btn btn-primary" onClick={onClose}>
                    submit */}
                     <button
                    type="submit"
                    className="btn btn-primary ml-2"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit"}
                    <img src={signinIcon} alt="sign-in" className='inline ml-1 min-w-[18px] h-[18px]' /></button></div></div></form></div></div><span tabIndex="0"></span></div></div>
  )
}

export default PasswordModal
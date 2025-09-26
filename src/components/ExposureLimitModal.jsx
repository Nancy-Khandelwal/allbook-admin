
import React,{useState,useEffect} from 'react';
import {Icon} from '@iconify/react';
import useApi from '../components/hooks/useApi';
import Cookies from "universal-cookie";
import useToast from './hooks/useToast';

const ExposureLimitModal = ({onClose, selectedUserl, setSelectedUserl, updateAccountList}) => {
  const [newLimit, setNewLimit] = useState("");
  const [txnPassword, setTxnPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const { apiCall } = useApi();

  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedUserl?._id) {
    toastError("User not selected properly");
    return;
  }

  if (!newLimit || !txnPassword) {
    toastError("New Limit and Transaction Password are required");
    return;
  }

  try {
    setLoading(true);

    const payload = {
      userId: selectedUserl._id,
      exposerLimit: Number(newLimit),
      txnPassword,
    };

    const result = await apiCall("POST", "user/update_child_info", payload);

    if (result && result.success) {
      toastSuccess(result.msg || "Exposure limit updated successfully");

     
      setSelectedUserl(prev => ({ ...prev, exposerLimit: Number(newLimit) }));

     
      if (typeof updateAccountList === "function") {
        updateAccountList(selectedUserl._id, Number(newLimit));
      }

      setNewLimit(""); 
      setTxnPassword(""); 
      onClose();
    } else {
      toastError((result && result.msg) || "Update failed");
    }
  } catch (err) {
    toastError(err?.message || "Server error");
  } finally {
    setLoading(false);
  }
};


  return (
   <div id="__BVID__247" role="dialog" aria-describedby="__BVID__247___BV_modal_body_" className="modal fade show !block" aria-modal="true" ><div className="modal-dialog modal-lg"><span tabIndex="0"></span><div id="__BVID__247___BV_modal_content_" tabIndex="-1" className="modal-content"><header id="__BVID__247___BV_modal_header_" className="modal-header"><h5 className="modal-title text-dark">Exposure Limit</h5> <button onClick={onClose} type="button" data-dismiss="modal" className="close !m-0 !p-0 text-white !bg-[#2e4a3b] hover:opacity-75">×</button></header><div id="__BVID__247___BV_modal_body_" className="modal-body credit-mdl"> <form data-vv-scope="updateExposureLimit"  onSubmit={handleSubmit} method="post"><div className="form-group row"><label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Old Limit</label> <div className="col-8"><input placeholder="Old Credit" type="text" readonly="readonly"value={selectedUserl?.exposerLimit || ""} className="form-control txt-right" /></div></div> <div className="form-group row"><label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">New Limit</label> <div className="col-8"><input type="number" name="exnewlimit" value={newLimit} onChange={(e) => setNewLimit(e.target.value)}className="form-control txt-right" aria-required="true" aria-invalid="false" /></div></div> <div className="form-group row"><label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Transaction Password</label> <div className="col-8 form-group-feedback form-group-feedback-right"><input name="userWithdrawFrmmpassword" type="password" value={txnPassword}
                    onChange={(e) => setTxnPassword(e.target.value)} className="form-control" aria-required="true" aria-invalid="false" /></div></div> <div className="form-group row"><div className="col-12 text-right"><button type="button" className="btn btn-back !bg-[#7cad79] !border-[#7cad79] !text-[#fff]" onClick={onClose}><Icon icon="fa7-solid:arrow-rotate-back" width="14" height="14"  style={{color: '#fff', display: 'inline'}} onClick={onClose} />
            Back
        </button>
            <button
                    type="submit"
                    className="btn btn-primary ml-2"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit"}
         {/* <button type="submit" className="btn btn-primary" onClick={onClose}>
                submit */}
                <i className="fas fa-sign-in-alt ml-1"></i></button></div></div></form></div></div><span tabIndex="0"></span></div></div>
  )
}
 

export default ExposureLimitModal
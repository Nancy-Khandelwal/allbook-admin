import React,{useState,useEffect} from 'react';
import {Icon} from '@iconify/react';
import signinIcon from '@images/sign-in-icon.svg'
import useApi from '../components/hooks/useApi';
import Cookies from "universal-cookie";
import useToast from './hooks/useToast';

const CarditModal = ({onClose, selectedUserc,updateAccountListCredit }) => {
  const { apiCall } = useApi();
  const { toastSuccess, toastError } = useToast();

  const [amount, setAmount] = useState("");
  const [txnPassword, setTxnPassword] = useState("");
  const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUserc?._id) {
      toastError("User ID missing");
      return;
    }
    if (!amount || !txnPassword) {
      toastError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await apiCall(
        "POST",
        "user/credit_to_child",
        {
          userId: selectedUserc._id, 
          amount,
          txnPassword,
        }
      );

      if (res.success) {
        toastSuccess(res.msg || "Credit added successfully");
         if (updateAccountListCredit) {
          updateAccountListCredit(selectedUserc._id, amount);
        }
        onClose(); 
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
    <div id="__BVID__240" role="dialog" aria-describedby="__BVID__240___BV_modal_body_" class="modal fade show !block" aria-modal="true" >
    <div class="modal-dialog modal-md">
      <span tabIndex="0"></span>
      <div id="__BVID__240___BV_modal_content_" tabIndex="-1" class="modal-content !block">
        <header id="__BVID__240___BV_modal_header_" class="modal-header"><h5 class="modal-title">Credit</h5>
         <button onClick={onClose} type="button" data-dismiss="modal" className="close !m-0 !p-0 text-white !bg-[#2e4a3b] hover:opacity-75">×</button></header>
         <div id="__BVID__240___BV_modal_body_" class="modal-body credit-mdl"> 
           <form data-vv-scope="userCreditUpdate" onSubmit={handleSubmit}method="post">
            <div class="form-group row"><label class="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">
              Old Credit
              </label> <div class="col-8">
                <input placeholder="Old Credit" type="text" readonly="readonly" value={selectedUserc?.credit || ""} name="userCreditUpdateusrnameamount" class="form-control txt-right" /></div></div> <div class="form-group row"><label class="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">New Credit</label> <div class="col-8 form-group-feedback form-group-feedback-right"><input type="text" name="userCreditUpdateamount"    value={amount}
                    onChange={(e) => setAmount(e.target.value)} class="form-control txt-right" aria-required="true" aria-invalid="false" /></div></div> <div class="form-group row"><label class="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Transaction Password</label> <div class="col-8 form-group-feedback form-group-feedback-right"><input name="userCreditUpdatempassword"   value={txnPassword}
                    onChange={(e) => setTxnPassword(e.target.value)} type="password" class="form-control" aria-required="true" aria-invalid="false" /></div></div> <div class="form-group row"><div class="col-12 text-right"><button type="button" class="btn btn-back !bg-[#7cad79] !border-[#7cad79] !text-[#fff]" onClick={onClose}><Icon icon="fa7-solid:arrow-rotate-back" width="14" height="14"  style={{color: '#fff', display: 'inline'}} />
                    Back
                  </button> 
                  {/* <button type="submit" class="btn btn-primary" onClick={onClose}>
                    submit */}
                     <button
                    type="submit"
                    class="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit"}
                    <img src={signinIcon} alt="sign-in" className='inline ml-1 min-w-[18px] h-[18px]' /></button></div></div></form></div></div><span tabIndex="0"></span>
                    </div>
                    </div>
  )
}

export default CarditModal
import React, { useState, useEffect }  from 'react';
import {Icon} from '@iconify/react';
import { useUser } from "../components/contexts/UserContext";
import useApi from '../components/hooks/useApi';
import Cookies from "universal-cookie";
import useToast from './hooks/useToast';

const WithdrawModal = ({onClose, selectedUserW}) => {
  const { userData, verifyUser } = useUser();
    const [amount, setAmount] = useState('');
    const [txnPassword, setTxnPassword] = useState('');
    const [remark, setRemark] = useState('');
    const [loading, setLoading] = useState(false);
    const { toastSuccess, toastError } = useToast();
    const cookies = new Cookies();
    const { apiCall } = useApi();

    useEffect(() => {
        if (!userData || !userData.username) {
            verifyUser();
        }
    }, [userData, verifyUser]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount || !txnPassword) {
            toastError("Amount and Transaction Password are required");
            return;
        }

        if (!selectedUserW?._id) {
            toastError("User not selected properly, try again");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                userId: selectedUserW._id,
                amount,
                txnPassword,
                remark,
            };

            const result = await apiCall("POST", "user/withdraw", payload);

            if (result && result.success) {
                toastSuccess(result.msg || `Withdraw successful for ${selectedUserW.username}`);
                onClose();
            } else {
                toastError((result && result.msg) || "Withdraw failed");
            }
        } catch (err) {
            toastError(err?.message || "Server error");
        } finally {
            setLoading(false);
        }
    };
  return (
    <div id="__BVID__242" role="dialog" aria-describedby="__BVID__242___BV_modal_body_" className="modal fade show !block" aria-modal="true"><div className="modal-dialog modal-md modal-dialog-scrollable"><span tabIndex="0"></span><div id="__BVID__242___BV_modal_content_" tabIndex="-1" className="modal-content"><header id="__BVID__242___BV_modal_header_" className="modal-header"><h5 className="modal-title text-dark">Withdraw</h5> <button onClick={onClose} type="button" data-dismiss="modal" className="close !m-0 !p-0 text-white !bg-[#2e4a3b] hover:opacity-75">×</button></header><div id="__BVID__242___BV_modal_body_" className="modal-body">  <form data-vv-scope="userWithdrawFrm" onSubmit={handleSubmit} method="post"><div className="form-group row"><label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">
      {/* Koushalg3 */}
      {userData?.username || "User"}
      </label> <div className="col-8"><div className="row"><div className="col-6"><input type="text" readonly="readonly" name="userWithdrawFrmloginusramount" className="form-control txt-right" /></div> <div className="col-6"><input type="text" readonly="readonly" name="userWithdrawFrmloginusrNamount" className="form-control txt-right" /></div></div></div></div> <div className="form-group row"><label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">
        {/* demo12v */}
        {selectedUserW?.username || "User"}
        </label> <div className="col-8"><div className="row"><div className="col-6"><input type="text" readonly="readonly" name="userWithdrawFrmusrnameamount" className="form-control txt-right" /></div> <div className="col-6"><input type="text" readonly="readonly" name="userWithdrawFrmusrnameNamount" className="form-control txt-right" /></div></div></div></div> <div className="form-group row"><label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Amount</label> <div className="col-8 form-group-feedback form-group-feedback-right"><input type="number" name="userWithdrawFrmamount" value={amount}
            onChange={(e) => setAmount(e.target.value)} className="form-control txt-right" aria-required="true" aria-invalid="true" /></div></div> <div className="form-group row"><label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Remark</label> <div className="col-8 form-group-feedback form-group-feedback-right"><textarea name="userWithdrawFrmremark" value={remark}
                onChange={(e) => setRemark(e.target.value)} className="form-control" aria-required="true" aria-invalid="true"></textarea></div></div> <div className="form-group row"><label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Transaction Password</label> <div className="col-8 form-group-feedback form-group-feedback-right"><input name="userWithdrawFrmmpassword" type="password"  value={txnPassword}
                    onChange={(e) => setTxnPassword(e.target.value)} className="form-control" aria-required="true" aria-invalid="false" /></div></div> <div className="form-group row"><div className="col-12 text-right"><button type="button" className="btn btn-back !bg-[#7cad79] !border-[#7cad79] !text-[#fff]" onClick={onClose}><Icon icon="fa7-solid:arrow-rotate-back" width="14" height="14"  style={{color: '#fff', display: 'inline'}} onClick={onClose} />
            Back
        </button> 
        {/* <button type="submit" className="btn btn-primary" onClick={onClose}>
                submit */}
                  <button type="submit" className="btn btn-primary ml-2" disabled={loading}>
                            {loading ? "Processing..." : "Submit"}
                <i className="fas fa-sign-in-alt ml-1"></i></button></div></div></form></div></div><span tabIndex="0"></span></div></div>
  )
}

export default WithdrawModal
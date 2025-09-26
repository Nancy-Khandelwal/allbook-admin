import React, { useState } from 'react';
import {Icon} from '@iconify/react';
import signinIcon from '@images/sign-in-icon.svg'

const MultiUserChangeStatusModal = ({onClose}) => {
  const [userChecked, setUserChecked] = useState(true);
  return (
    <div id="__BVID__244" role="dialog" aria-describedby="__BVID__244___BV_modal_body_" className="modal fade show !block" aria-modal="true"><div className="modal-dialog modal-md modal-dialog-scrollable"><span tabIndex="0"></span><div id="__BVID__244___BV_modal_content_" tabIndex="-1" className="modal-content"><header id="__BVID__244___BV_modal_header_" className="modal-header"><h4 className="modal-title">Change User Status</h4> <button type="button" data-dismiss="modal" className="close text-white m-0 p-0" onClick={onClose}>×</button></header><div id="__BVID__244___BV_modal_body_" className="modal-body">  
    {/* <div className="m-t-20">
        <div className="row"><div className="col-6 text-left"><p id="status-username " className="text-warning !text-[14px] !font-medium !leading-[15px]">demo12v</p></div></div>
        </div> */}
         <form data-vv-scope="UserLock" method="post"><div className="form-group row">
            <div className="form-group row w-full ml-1">
                <label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">User lock</label>
                 <label
      className={`vue-js-switch toggled relative inline-flex items-center cursor-pointer ${
        userChecked ? "text-[#1e1e1e]" : "text-gray-400"
      } text-[14px] font-medium leading-[15px]`}
    >
      <input
        type="checkbox"
        checked={userChecked}
        onChange={() => setUserChecked(!userChecked)}
        className="sr-only peer"
      />
      <div
        className={`w-[50px] h-[22px] rounded-full transition-colors duration-300 ${
          userChecked ? "bg-[#0088cc]" : "bg-gray-300"
        } relative`}
      >
        <div
          className={`absolute top-[3px] left-[3px] w-[16px] h-[16px] rounded-full bg-[#444] transition-transform duration-300 ${
            userChecked ? "translate-x-[28px]" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span
          className={`absolute top-0 text-[12px] !font-medium leading-[22px] !text-[#444] transition-all duration-300 uppercase
            ${userChecked ? "left-2" : "right-2"}
          `}
        >
        {userChecked ? "On" : "Off"}
      </span>
    </label></div> 
    {/* <div className="col-6 text-center"><label className="col-form-label d-block !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Bet Active</label> <label
      className={`relative inline-flex items-center cursor-pointer ${
        betChecked ? "text-[#1e1e1e]" : "text-gray-400"
      } text-[14px] font-medium leading-[15px]`}
    >
      <input
        type="checkbox"
        checked={betChecked}
        onChange={() => setBetChecked(!betChecked)}
        className="sr-only peer"
      />
      <div
        className={`w-[50px] h-[22px] rounded-full transition-colors duration-300 ${
          betChecked ? "bg-[#0088cc]" : "bg-gray-300"
        } relative`}
      >
        <div
          className={`absolute top-[3px] left-[3px] w-[16px] h-[16px] rounded-full bg-[#444] transition-transform duration-300 ${
            betChecked ? "translate-x-[28px]" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span
          className={`absolute top-0 text-[12px] !font-medium leading-[22px] !text-[#444] transition-all duration-300 uppercase
            ${betChecked ? "left-2" : "right-2"}
          `}
        >
        {betChecked ? "On" : "Off"}
      </span>
    </label></div> */}
    </div> <div className="form-group row"><label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Transaction Code</label> <div className="col-8 form-group-feedback-right pl-0"><input type="password" name="UserLockMpassword" placeholder='Transaction Code' className="form-control" aria-required="true" aria-invalid="true" /></div></div> <div className="form-group row"><div className="col-12 text-right">
        {/* <button type="button" className="btn btn-back !bg-[#B97242] !border-[#B97242] !text-[#fff]" onClick={onClose}><Icon icon="fa7-solid:arrow-rotate-back" width="14" height="14"  style={{color: '#fff', display: 'inline'}} />
                    Back
                  </button> */}
                   <button type="submit" className="btn btn-primary" onClick={onClose}>
                    submit
                    <img src={signinIcon} alt="sign-in" className='inline ml-1 min-w-[18px] h-[18px]' /></button></div></div></form></div></div><span tabIndex="0"></span></div></div>
  )
}

export default MultiUserChangeStatusModal
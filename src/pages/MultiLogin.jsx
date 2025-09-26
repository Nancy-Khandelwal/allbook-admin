import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import PasswordModal from '../components/PasswordModal';
import ChangeStatusModal from '../components/ChangeStatusModal';
import MultiUserChangePasswordModal from '../components/MultiUserChangePasswordModal';
import MultiUserChangeStatusModal from '../components/MultiUserChangeStatusModal';

const privileges = [
  { id: 1, label: "DashBoard" },
  { id: 2, label: "Market Analysis" },
  { id: 4, label: "User List" },
  { id: 5, label: "Insert User" },
  { id: 8, label: "Account Statement" },
  { id: 9, label: "Party Win Loss" },
  { id: 10, label: "Current Bets" },
  { id: 12, label: "General Lock" },
  { id: 13, label: "Casino Result" },
  { id: 14, label: "Live Casino Result" },
  { id: 15, label: "Our Casino" },
  { id: 16, label: "Events" },
  { id: 17, label: "Market Search Analysis" },
  { id: 19, label: "Login User creation" },
  { id: 54, label: "Withdraw" },
  { id: 55, label: "Deposit" },
  { id: 56, label: "Credit Reference" },
  { id: 57, label: "User Info" },
  { id: 58, label: "User Password Change" },
  { id: 59, label: "User Lock" },
  { id: 60, label: "Bet Lock" },
  { id: 91, label: "Active User" },
  { id: 104, label: "Agent Assign" },
];




const MultiLogin = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);

  const [checkedItems, setCheckedItems] = useState([]);

  // toggle single checkbox
  const handleToggle = (id) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  // toggle all checkboxes
  const handleToggleAll = () => {
    if (checkedItems.length === privileges.length) {
      setCheckedItems([]); // uncheck all
    } else {
      setCheckedItems(privileges.map((p) => p.id)); // check all
    }
  };

  const allChecked = checkedItems.length === privileges.length;

  const handleClose = () => {
    setShowPasswordModal(false);
    setShowChangeStatusModal(false);
  }

  return (
    <div className='w-full p-3 relative'>
      {(showPasswordModal || showChangeStatusModal) && (<div id="__BVID__241___BV_modal_backdrop_" className="modal-backdrop"></div>)}
      {showChangeStatusModal && (<MultiUserChangeStatusModal onClose={handleClose} />)}
      {showPasswordModal && (<MultiUserChangePasswordModal onClose={handleClose} />)}
      <div className="row"><div className="col-12"><div className="page-title-box d-flex align-items-center justify-content-between"><h4 className="mb-0 font-size-18">Multi Login Account</h4> <div className="page-title-right"></div></div></div></div>

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body create-account-container'>
              <form method="post" data-vv-scope="userInsert"><div className="create-account-form"><div><h5 className="mb-0 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Personal Information</h5> <div className="row"><div className="col-md-3 form-group"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>Client ID</label> <input type="text" name="uname" data-vv-as="Client ID" className="form-control is-invalid" aria-required="true" aria-invalid="false" /> </div> <div className="col-md-3 form-group"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>Full Name</label> <input type="text" name="fullname" data-vv-as="Full Name" className="form-control" aria-required="true" aria-invalid="false" /> </div> <div className="col-md-3 form-group"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>Password</label> <input type="password" data-vv-as="Password" name="password" className="form-control" aria-required="true" aria-invalid="false" /> </div> <div className="col-md-3 form-group"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>Confirm Password</label> <input type="password" data-vv-as="Confirm Password" name="cpass" className="form-control" aria-required="true" aria-invalid="false" /> </div></div></div> <div className="mt-2 previlages"><h5 className="mb-0">Privileges</h5> <div className="previlage-box"><div className="previlage-item"><div><div className="custom-control custom-checkbox"><input
                type="checkbox"
                className="custom-control-input"
                id="checkAll"
                checked={allChecked}
                onChange={handleToggleAll}
              /><label className="custom-control-label !text-[#1e1e1e] !text-[14px] !font-medium" htmlFor="checkAll">All</label></div></div></div> <br />

                {privileges.map((p) => (
                  <div className="previlage-item" key={p.id}>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={`check-${p.id}`}
                        checked={checkedItems.includes(p.id)}
                        onChange={() => handleToggle(p.id)}
                      />
                      <label className="custom-control-label !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]" htmlFor={`check-${p.id}`}>
                        {p.label}
                      </label>
                    </div>
                  </div>
                ))}</div>  <div className="previlage-master mt-2"><div className="form-group mb-0"><input type="password" name="mpass" placeholder="Transaction Code" className="form-control mpass-text" aria-required="true" aria-invalid="false" /> <button type="submit" className="btn btn-success">Submit</button> <button type="button" id="reset" className="btn btn-light">Reset</button></div></div></div></div></form>

              <div className="outer mt-4"><div className="inner"><table className="table table-bordered"><tbody><tr><th className="fixed-col-1">Action</th> <th className="fixed-col-2">Username</th> <th className="fixed-col-3">Full Name</th> <th>DashBoard</th><th>Market Analysis</th><th>User List</th><th>Insert User</th><th>Account Statement</th><th>Party Win Loss</th><th>Current Bets</th><th>General Lock</th><th>Casino Result</th><th>Live Casino Result</th><th>Our Casino</th><th>Events</th><th>Market Search Analysis</th><th>Login User creation</th><th>Withdraw</th><th>Deposit</th><th>Credit Reference</th><th>User Info</th><th>User Password Change</th><th>User Lock</th><th>Bet Lock</th><th>active user</th><th>Agent Assign</th></tr> <tr><td className="fixed-col-1"><a className="text-white btn btn-primary">U</a> <a className="text-white btn btn-info" onClick={() => setShowChangeStatusModal(true)} >S</a> <a className="text-white btn btn-success" onClick={() => setShowPasswordModal(true)}>P</a></td> <td className="fixed-col-2">Koushalg4
                <Icon icon="heroicons-solid:check" width="20" height="20" style={{ color: '#128412', display: 'inline' }} /></td> <td className="fixed-col-3">Koushalg4</td> <td className="text-center"><Icon icon="mingcute:check-circle-fill" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td><td className="text-center"><Icon icon="material-symbols:circle-outline" width="24" height="24" style={{ color: '#000', display: 'inline-block' }} /></td></tr></tbody></table></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiLogin
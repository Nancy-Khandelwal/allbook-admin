import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useUser } from "../components/contexts/UserContext";
import useApi from "../components/hooks/useApi";
import Cookies from "universal-cookie";
import useToast from "./hooks/useToast";

const DepositModal = ({ onClose, selectedUser, updateAccountListDeposit }) => {
  const { userData, verifyUser } = useUser();
  const [amount, setAmount] = useState("");
  const [txnPassword, setTxnPassword] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const { toastSuccess, toastError } = useToast();

  const [totalAfterDeposit, setTotalAfterDeposit] = useState(0);
  const [Afterdeposit, setAfterdeposit] = useState(0);
  const [updatedUserData, setUpdatedUserData] = useState(userData);
  const [updatedSelectedUser, setUpdatedSelectedUser] = useState(selectedUser);
  const { apiCall } = useApi();

  const [errors, setErrors] = useState({
    amount: false,
    txnPassword: false,
    remark: false,
  });

  useEffect(() => {
    if (!userData || !userData.username) {
      verifyUser();
    }
    setUpdatedUserData(userData);
    setUpdatedSelectedUser(selectedUser);
  }, [userData, selectedUser, verifyUser]);

  // base values
  const adminBase =
    Number(updatedUserData?.deposit || 0) +
    Number(updatedUserData?.profitlossbalance || 0) +
    Number(updatedUserData?.exposure || 0) -
    Number(updatedUserData?.downLineDeposit || 0);

  const userBase =
    Number(updatedSelectedUser?.deposit || 0) +
    Number(updatedSelectedUser?.profitlossbalance || 0) +
    Number(updatedSelectedUser?.exposure || 0) +
    Number(updatedSelectedUser?.downLineDeposit || 0);

 
  const calculateDeposit = (enteredAmount) => {
    const amt = Number(enteredAmount) || 0;
    if(amt<=0){
       setTotalAfterDeposit(0);
    setAfterdeposit(0);
    }
    else{
    setTotalAfterDeposit(amt ? adminBase - amt : adminBase);
    setAfterdeposit(amt ? userBase + amt : userBase);
    }
  };

  // Run calculation whenever amount changes
  // useEffect(() => {
  //   calculateDeposit(amount);
  // }, [amount]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    calculateDeposit(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      amount: !amount,
      txnPassword: !txnPassword,
      remark: !remark,
    };

    setErrors(newErrors);

    if (!amount || !txnPassword) {
      toastError("Amount and Transaction Password are required");
      return;
    }
    // if (!remark) {
    //   toastError("Remark is required");
    //   return;
    // }
    if (!selectedUser?._id) {
      toastError("User not selected properly, try again");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        userId: selectedUser._id,
        amount,
        txnPassword,
        remark,
      };

      const result = await apiCall("POST", "user/deposit", payload);

      if (result && result.success) {
        toastSuccess(
          result.msg || `Deposit successful for ${selectedUser.username}`
        );

        const refreshedLogin = await verifyUser();
        if (refreshedLogin) {
          setUpdatedUserData(refreshedLogin);
        }

        if (updateAccountListDeposit) {
          updateAccountListDeposit(
            selectedUser._id,
            Number(selectedUser.deposit || 0) + Number(amount),
            Number(selectedUser.balance || 0) + Number(amount)
          );
        }

        setAmount("");
        setTotalAfterDeposit(0);
        setAfterdeposit(0);
        setTxnPassword("");
        setRemark("");
        onClose();
      } else {
        toastError(result?.msg || "Deposit failed");
      }
    } catch (err) {
      toastError(err?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTotalAfterDeposit(0);
    setAfterdeposit(0);
    onClose();
  };

  return (
    <div
      id="__BVID__241"
      role="dialog"
      aria-describedby="__BVID__241___BV_modal_body_"
      className="modal fade show !block"
      aria-modal="true"
    >
      <div className="modal-dialog modal-md modal-dialog-scrollable">
        <span tabIndex="0"></span>
        <div
          id="__BVID__241___BV_modal_content_"
          tabIndex="-1"
          className="modal-content"
        >
          <header id="__BVID__241___BV_modal_header_" className="modal-header">
            <h4 className="modal-title">Deposit</h4>{" "}
            <button
              onClick={handleClose}
              type="button"
              data-dismiss="modal"
              className="close !m-0 !p-0 text-white !bg-[#2e4a3b] hover:opacity-75"
            >
              ×
            </button>
          </header>
          <div id="__BVID__241___BV_modal_body_" className="modal-body">
            {" "}
            <form
              data-vv-scope="userdepositeMDL"
              onSubmit={handleSubmit}
              method="post"
            >
              <div className="form-group row">
                <label className="col-form-label col-4 !text-[#495057] !font-medium !text-[14px] !leading-[15px]">
                  {userData?.username || "User"}
                </label>{" "}
                <div className="col-8">
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="text"
                        readOnly="readOnly"
                        value={adminBase}
                        name="userDipositeloginusramount"
                        className="form-control txt-right"
                      />
                    </div>{" "}
                    <div className="col-6">
                      <input
                        type="text"
                        readOnly="readOnly"
                        value={totalAfterDeposit}
                        name="userDipositeloginusrNamount"
                        className="form-control txt-right"
                      />
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="form-group row">
                <label className="col-form-label col-4 !text-[#495057] !font-medium !text-[14px] !leading-[15px]">
                  {selectedUser?.username || "User"}
                </label>
                <div className="col-8">
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="text"
                        readOnly="readOnly"
                        value={userBase}
                        name="userDipositeusrnameamount"
                        className="form-control txt-right"
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        readOnly="readOnly"
                        value={Afterdeposit}
                        name="userDipositeusrnameNamount"
                        className="form-control txt-right"
                      />
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="form-group row">
                <label className="col-form-label col-4 !text-[#495057] !font-medium !text-[14px] !leading-[15px]">
                  Amount
                </label>{" "}
                <div className="col-8 form-group-feedback form-group-feedback-right">
                  <input
                    type="number"
                    name="userDipositeamount"
                    className="form-control txt-right"
                    value={amount}
                    onChange={handleAmountChange}
                    aria-required="true"
                    aria-invalid="true"
                  />
                </div>
              </div>{" "}
              <div className="form-group row">
                <label className="col-form-label col-4 !text-[#495057] !font-medium !text-[14px] !leading-[15px]">
                  Remark
                </label>
                <div className="col-8 form-group-feedback form-group-feedback-right">
                  <textarea
                    name="userDipositeremark"
                    className="form-control"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    aria-required="true"
                  ></textarea>{" "}
                  {errors.remark && (
                    <span className="text-red-500 text-sm mt-1 flex items-center">
                      <i className="fas fa-times-circle mr-1"></i> Remark is
                      required
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label col-4 !text-[#495057] !font-medium !text-[14px] !leading-[15px]">
                  Transaction Password
                </label>{" "}
                <div className="col-8 form-group-feedback form-group-feedback-right">
                  <input
                    name="userDipositempassword"
                    type="password"
                    className="form-control"
                    aria-required="true"
                    aria-invalid="false"
                    value={txnPassword}
                    onChange={(e) => setTxnPassword(e.target.value)}
                  />
                </div>
              </div>{" "}
              <div className="form-group row">
                <div className="col-12 text-right">
                  <button
                    type="button"
                    className="btn btn-back !bg-[#7cad79] !border-[#7cad79] !text-[#fff]"
                    onClick={onClose}
                  >
                    <Icon
                      icon="fa7-solid:arrow-rotate-back"
                      width="14"
                      height="14"
                      style={{ color: "#fff", display: "inline" }}
                      onClick={onClose}
                    />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary ml-2"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit"}{" "}
                    <i className="fas fa-sign-in-alt ml-1"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <span tabIndex="0"></span>
      </div>
    </div>
  );
};

export default DepositModal;

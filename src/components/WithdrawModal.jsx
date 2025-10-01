import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useUser } from "../components/contexts/UserContext";
import useApi from "../components/hooks/useApi";
import Cookies from "universal-cookie";
import useToast from "./hooks/useToast";

// const WithdrawModal = ({onClose, selectedUserWW,updateAccountListWithdraw}) => {
//   const { userData, verifyUser } = useUser();
//     const [amount, setAmount] = useState('');
//     const [txnPassword, setTxnPassword] = useState('');
//     const [remark, setRemark] = useState('');
//     const [loading, setLoading] = useState(false);
//     const { toastSuccess, toastError } = useToast();
//     const cookies = new Cookies();
//     const { apiCall } = useApi();
//      const [updatedUserData, setUpdatedUserData] = useState(userData);
//       const [updatedselectedUserW, setUpdatedselectedUserW] = useState(selectedUserWW);
//    const [errors, setErrors] = useState({
//         amount: false,
//         txnPassword: false,
//         remark: false,
//     });

//       const localUserData = useMemo(() => userData, [userData]);
//   const localselectedUserW = useMemo(() => selectedUserWW, [selectedUserWW]);

//    useEffect(() => {
//         if (!userData || !userData.username) {
//             verifyUser();
//         }
//         setUpdatedUserData(userData);
//         setUpdatedselectedUserW(selectedUserWW);
//     }, [userData, selectedUserWW, verifyUser]);

//     const deposit = selectedUserWW?.deposit || 0;
//     const profitlossbalance = selectedUserWW?.profitlossbalance || 0;
//     const exposure = selectedUserWW?.exposure || 0;
//   const downLineDeposit = selectedUserWW?.downLineDeposit ||0;

//    useEffect(() => {
//       setUpdatedUserData(userData);
//   }, [userData]);

//   useEffect(() => {
//       setUpdatedselectedUserW(selectedUserWW);
//   }, [selectedUserWW]);
// const Userdata =
//     Number(updatedUserData?.deposit || 0) +
//     Number(updatedUserData?.profitlossbalance || 0) +
//     Number(updatedUserData?.exposure || 0)+ Number(updatedselectedUserW?.downLineDepositunt || 0);
// console.log("Userdata", amount ,Userdata)
// // totalAfterDeposit ko update karo:
//  const adminBase =
//     Number(localUserData?.deposit || 0) +
//     Number(localUserData?.profitlossbalance || 0) +
//     Number(localUserData?.exposure || 0) -
//     Number(localUserData?.downLineDeposit || 0);

//   const userBase =
//     Number(localselectedUserW?.deposit || 0) +
//     Number(localselectedUserW?.profitlossbalance || 0) +
//     Number(localselectedUserW?.exposure || 0) +
//     Number(localselectedUserW?.downLineDeposit || 0);

//   // Calculate values based on input amount
//   const totalAfterDeposit = amount ? adminBase + Number(amount) : adminBase;
//   const Afterdeposit = amount ? userBase - Number(amount) : userBase;

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//    setErrors({
//             amount: !amount,
//             txnPassword: !txnPassword,
//             remark: !remark,
//         });
//         if (!amount || !txnPassword) {
//             toastError("Amount and Transaction Password are required");
//             return;
//         }
//          if (!remark) {
//         toastError("Remark is required");
//         return;
//     }

//         if (!selectedUserWW?._id) {
//             toastError("User not selected properly, try again");
//             return;
//         }

//         try {
//             setLoading(true);

//             const payload = {
//                 userId: selectedUserWW._id,
//                 amount,
//                 txnPassword,
//                 remark,
//             };

//             const result = await apiCall("POST", "user/withdraw", payload);

//             if (result && result.success) {
//                 toastSuccess(result.msg || `Withdraw successful for ${selectedUserWW.username}`);
//                 const refreshedLogin = await verifyUser();
//     if (refreshedLogin) setUpdatedUserData(refreshedLogin);

//     // Parent ke account list me update karo
//     if (updateAccountListWithdraw) {
//         const newWithdraw = (selectedUserWW.withdraw || 0) + Number(amount);
//         const newBalance = (selectedUserWW.balance || 0) - Number(amount);

//         updateAccountListWithdraw(selectedUserWW._id, newWithdraw, newBalance);

//         // Local modal state ko bhi update karo, taaki turant reflect ho
//         setUpdatedselectedUserW(prev => ({
//             ...prev,
//             withdraw: newWithdraw,
//             balance: newBalance
//         }));
//     }

//   setAmount('');
//   setTxnPassword('');
//   setRemark('');
//   onClose();

//             } else {
//                 toastError((result && result.msg) || "Withdraw failed");
//             }
//         } catch (err) {
//             toastError(err?.message || "Server error");
//         } finally {
//             setLoading(false);
//         }
//     };
const WithdrawModal = ({
  onClose,
  selectedUserW,
  updateAccountListWithdraw,
  onRefreshLists,
}) => {
  const { userData, verifyUser } = useUser();
  const { apiCall } = useApi();
  const { toastSuccess, toastError } = useToast();
  const [amount, setAmount] = useState("");
  const [txnPassword, setTxnPassword] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    amount: false,
    txnPassword: false,
    remark: false,
  });
  const [totalAfterWithdraw, setTotalAfterWithdraw] = useState(0);
  const [Afterwithdraw, setAfterwithdraw] = useState(0);
  const [updatedUserData, setUpdatedUserData] = useState(userData);
  const [updatedselectedUserW, setUpdatedselectedUserW] =
    useState(selectedUserW);

  useEffect(() => {
    if (!userData || !userData.username) {
      verifyUser();
    }
    setUpdatedUserData(userData);
    setUpdatedselectedUserW(selectedUserW);
  }, [userData, selectedUserW, verifyUser]);

  // base values
  const adminBase =
    Number(updatedUserData?.deposit || 0) +
    Number(updatedUserData?.profitlossbalance || 0) +
    Number(updatedUserData?.exposure || 0) -
    Number(updatedUserData?.downLineDeposit || 0);

  const userBase =
    Number(updatedselectedUserW?.deposit || 0) +
    Number(updatedselectedUserW?.profitlossbalance || 0) +
    Number(updatedselectedUserW?.exposure || 0) +
    Number(updatedselectedUserW?.downLineDeposit || 0);

  // 🔹 Separate calculation method
  const calculateWithdraw = (enteredAmount) => {
    const amt = Number(enteredAmount) || 0;
    if (amt <= 0) {
      setTotalAfterWithdraw(0);
      setAfterwithdraw(0);
    } else {
      setTotalAfterWithdraw(amt ? adminBase + amt : adminBase);
      setAfterwithdraw(amt ? userBase - amt : userBase);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    calculateWithdraw(value);
  };

  // const totalAfterDeposit = amount ? adminBase + Number(amount) : adminBase;
  // const Afterdeposit = amount ? userBase - Number(amount) : userBase;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ amount: !amount, txnPassword: !txnPassword, remark: !remark });

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
      if (result?.success) {
        toastSuccess(
          result.msg || `Withdraw successful for ${selectedUserW.username}`
        );

        // Refresh admin
        const refreshedAdmin = await verifyUser();
        if (refreshedAdmin) setUpdatedUserData({ refreshedAdmin });
          updateAccountListWithdraw(
            selectedUserW._id,
            Number(selectedUserW.deposit || 0) - Number(amount),
            Number(selectedUserW.balance || 0) + Number(amount)
          );
       
        setAmount("");
        setTotalAfterWithdraw(0);
        setAfterwithdraw(0);
        setTxnPassword("");
        setRemark("");
        onClose();
      } else {
        toastError(result?.msg || "Withdraw failed");
      }
    } catch (err) {
      toastError(err?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      id="__BVID__242"
      role="dialog"
      aria-describedby="__BVID__242___BV_modal_body_"
      className="modal fade show !block"
      aria-modal="true"
    >
      <div className="modal-dialog modal-md modal-dialog-scrollable">
        <span tabIndex="0"></span>
        <div
          id="__BVID__242___BV_modal_content_"
          tabIndex="-1"
          className="modal-content"
        >
          <header id="__BVID__242___BV_modal_header_" className="modal-header">
            <h5 className="modal-title text-dark">Withdraw</h5>{" "}
            <button
              onClick={onClose}
              type="button"
              data-dismiss="modal"
              className="close !m-0 !p-0 text-white !bg-[#2e4a3b] hover:opacity-75"
            >
              ×
            </button>
          </header>
          <div id="__BVID__242___BV_modal_body_" className="modal-body">
            {" "}
            <form
              data-vv-scope="userWithdrawFrm"
              onSubmit={handleSubmit}
              method="post"
            >
              <div className="form-group row">
                <label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">
                  {/* Koushalg3 */}
                  {userData?.username || "User"}
                </label>{" "}
                <div className="col-8">
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="text"
                        readonly="readonly"
                        value={adminBase}
                        name="userWithdrawFrmloginusramount"
                        className="form-control txt-right"
                      />
                    </div>{" "}
                    <div className="col-6">
                      <input
                        type="text"
                        readonly="readonly"
                        value={totalAfterWithdraw}
                        name="userWithdrawFrmloginusrNamount"
                        className="form-control txt-right"
                      />
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="form-group row">
                <label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">
                  {/* demo12v */}
                  {selectedUserW?.username || "User"}
                </label>{" "}
                <div className="col-8">
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="text"
                        readonly="readonly"
                        value={userBase}
                        name="userWithdrawFrmusrnameamount"
                        className="form-control txt-right"
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        readonly="readonly"
                        value={Afterwithdraw}
                        name="userWithdrawFrmusrnameNamount"
                        className="form-control txt-right"
                      />
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="form-group row">
                <label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">
                  Amount
                </label>{" "}
                <div className="col-8 form-group-feedback form-group-feedback-right">
                  <input
                    type="number"
                    name="userWithdrawFrmamount"
                    value={amount}
                    onChange={handleAmountChange}  
                    className="form-control txt-right"
                    aria-required="true"
                    aria-invalid="true"
                  />
                </div>
              </div>{" "}
              <div className="form-group row">
                <label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">
                  Remark
                </label>{" "}
                <div className="col-8 form-group-feedback form-group-feedback-right">
                  <textarea
                    name="userWithdrawFrmremark"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className="form-control"
                    aria-required="true"
                  ></textarea>{" "}
                  {errors.remark && (
                    <span className="text-red-500 text-sm mt-1 flex items-center">
                      <i className="fas fa-times-circle mr-1"></i> Remark is
                      required
                    </span>
                  )}
                </div>
              </div>{" "}
              <div className="form-group row">
                <label className="col-form-label col-4 !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">
                  Transaction Password
                </label>{" "}
                <div className="col-8 form-group-feedback form-group-feedback-right">
                  <input
                    name="userWithdrawFrmmpassword"
                    type="password"
                    value={txnPassword}
                    onChange={(e) => setTxnPassword(e.target.value)}
                    className="form-control"
                    aria-required="true"
                    aria-invalid="false"
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
                  {/* <button type="submit" className="btn btn-primary" onClick={onClose}>
                submit */}
                  <button
                    type="submit"
                    className="btn btn-primary ml-2"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit"}
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

export default WithdrawModal;

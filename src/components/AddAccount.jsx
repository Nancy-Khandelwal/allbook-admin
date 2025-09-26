import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useApi from './hooks/useApi'; // adjust path as needed
import useToast from './hooks/useToast'; // adjust path as needed
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from "universal-cookie";
import * as yup from 'yup';
import { useUser } from "../components/contexts/UserContext";
import { ACCOUNT_ROLES, getCreatableRoles } from "./constant/accountRoles"
import signinIcon from '@images/sign-in-icon.svg'

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Retype Password is required"),
  fullName: yup.string().required("Full name is required"),
  txnPassword: yup.string().required("Transaction password is required"),
  role: yup.string().required("Role is required"),

  credit: yup.number().default(0).min(0, "Credit must be 0 or more"),

  minBet: yup.number().when("role", {
    is: (val) => val === "user",
    then: () => yup.number().required("Min Bet is required"),
    otherwise: () => yup.number().nullable(),
  }),
  maxBet: yup.number().when("role", {
    is: (val) => val === "user",
    then: () => yup.number().required("Max Bet is required"),
    otherwise: () => yup.number().nullable(),
  }),
  betDelay: yup.number().when("role", {
    is: (val) => val === "user",
    then: () => yup.number().required("Bet Delay is required"),
    otherwise: () => yup.number().nullable(),
  }),
});

// const AddAccount = () => {
//   return (
//     <div className='add-account'>
//         <h2 className="m-b-20">Add Account</h2>
//         <form data-vv-scope="InserUserAccount" method="post"><div className="row"><div className="col-6"><h4 className="mb-4 col-12">Personal Detail</h4> <div className="row"><div className="col-6"><div className="form-group"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]' htmlFor="">Client Name:</label> <input type="text" placeholder="Client Name" name="clientname" className="form-control is-invalid" aria-required="true" aria-invalid="false" /> </div></div> <div className="col-6"><div className="form-group"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]' htmlFor="">User Password:</label> <input type="password" placeholder="User Password" name="password" className="form-control" aria-required="true" aria-invalid="false" /> </div></div> <div className="col-6"><div className="form-group"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]' htmlFor="">Retype Password:</label> <input type="password" placeholder="Retype Password" name="rpassword" className="form-control" /></div></div> <div className="col-6"><div className="form-group"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]' htmlFor="">Full Name:</label> <input type="text" placeholder="Full Name" name="fullname" className="form-control is-invalid" aria-required="true" aria-invalid="true" /> <small className="error">
//                 The fullname field is required
//               </small></div></div> <div className="col-6"><div className="form-group"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]' htmlFor="">City:</label> <input type="text" placeholder="City" name="city" className="form-control" aria-required="false" aria-invalid="false" /> </div></div> <div className="col-6"><div className="form-group"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]' htmlFor="">Phone:</label> <input type="text" placeholder="Phone Number" name="mono" maxlength="15" className="form-control" aria-required="false" aria-invalid="false" /> </div></div></div></div> <div className="col-6"><h4 className="mb-4 col-12">Account Detail</h4> <div className="row"><div className="col-6"><div className="form-group"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]' htmlFor="">Account Type:</label> <select name="newlvlno" label="label" data-vv-as="User Type" className="form-control is-invalid" aria-required="true" aria-invalid="true"><option value="">Select Account Type</option> <option value="5">Agent</option><option value="6">User</option></select> <small className="error">
//                 The User Type field is required
//               </small></div></div> <div className="col-6"><div className="form-group"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]' htmlFor="">Credit Reference:</label> <input type="text" placeholder="Credit Reference" name="camt" className="form-control is-invalid" aria-required="true" aria-invalid="true" /> <small className="error">
//                   The camt field is required
//                 </small></div></div> </div></div></div> <div className="row mt-4"><div className="col-12"><h4 className="mb-4 col-md-12">Commission Settings</h4> <table className="table table-striped table-bordered"><tbody><tr><td>Upline</td> <td>0</td></tr> <tr><td>Downline</td> <td><input type="text" name="comm" id="" placeholder="0" maxlength="4" className="" /></td></tr> <tr><td>Our</td> <td></td></tr></tbody></table></div> <div className="col-12"><h4 className="mb-4 col-md-12">Partnership</h4> <table className="table table-striped table-bordered"><tbody><tr><td>Upline</td> <td>0</td></tr> <tr><td>Downline</td> <td><div className="form-group"><input type="text" name="spart1" placeholder="0" disabled="disabled" className="" aria-required="true" aria-invalid="false" /> </div></td></tr> <tr><td>Our</td> <td></td></tr></tbody></table></div> </div> <div className="row mt-4"><div className="col-12"><div className="form-group col-3 float-right"><label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]' htmlFor="m_pwd">Transaction Password:</label> <input placeholder="Transaction Password" value="" type="password" name="mpassword" className="form-control is-invalid" aria-required="true" aria-invalid="true" /></div></div></div> <div className="row m-t-20"><div className="col-md-12"><div className="float-right"><input type="hidden" name="_token" /> <button type="submit" className="btn btn-submit">Create Account</button></div></div></div></form>
//     </div>
//   );
// };
const AddAccount = () => {
  const { apiCall } = useApi();
  const { toastSuccess, toastError } = useToast();
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const { userData } = useUser();

  const currentRoleObj = userData
    ? ACCOUNT_ROLES.find(r => r.value === userData?.role)
    : null;
  console.log("fds", userData?.role)

  // fallback: show all if no canCreate defined
  const filteredRoles = currentRoleObj?.canCreate?.length
    ? ACCOUNT_ROLES.filter(r => currentRoleObj.canCreate.includes(r.value))
    : ACCOUNT_ROLES;




  console.log("Filtered Roles:", filteredRoles);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({

    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      credit: 0
    }
  });

  const role = watch("role");


  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const result = await apiCall(
        "POST",
        "user/add_account",
        formData
      );

      if (result && result.success) {
        toastSuccess(result.msg || "Account created successfully");
        reset();
      } else {
        toastError((result && result.msg) || "Something went wrong");
      }
    } catch (err) {
      toastError(err?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  console.log("Form errors:", errors);

  return (
    <div className='add-account'>
      <h2 className="m-b-20">Add Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} data-vv-scope="InserUserAccount" method="post">
        <div className="row">
          <div className="col-6">
            <h4 className="mb-4 col-12">Personal Detail</h4>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>Client Name:</label>
                  <input type="text" {...register("username")} placeholder="Client Name" className="form-control" />
                  {errors.username && <small className="error">{errors.username.message}</small>}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>User Password:</label>
                  <input type="password" {...register("password")} placeholder="User Password" className="form-control" />
                  {errors.password && <small className="error">{errors.password.message}</small>}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>Retype Password:</label>
                  <input type="password" {...register("rePassword")} placeholder="Retype Password" className="form-control" />
                  {errors.rePassword && <small className="error">{errors.rePassword.message}</small>}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>Full Name:</label>
                  <input type="text" {...register("fullName")} placeholder="Full Name" className="form-control" />
                  {errors.fullName && <small className="error">{errors.fullName.message}</small>}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>City:</label>
                  <input type="text" {...register("city")} placeholder="City" className="form-control" />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>Phone:</label>
                  <input type="text" {...register("phone")} placeholder="Phone Number" maxLength="15" className="form-control" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <h4 className="mb-4 col-12">Account Detail</h4>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>Account Type:</label>
                  <select {...register("role", {
                    onChange: (e) => {
                      console.log("Selected:", e.target.value);


                      // you can set local state here if needed
                    }
                  },)} className="form-control" >
                    {/* <option value="">{filteredRoles.length ? "Select Account Type" : "Loading..."}</option>
  {filteredRoles.map(role => (
    <option key={role.value} value={role.value}>
      {role.label}
    </option> */}
                    <option value=""> Select Account Type</option>
                    {filteredRoles.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}

                  </select>
                  {errors.role && <small className="error">{errors.role.message}</small>}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>Credit Reference:</label>
                  <input
                    type="number"
                    {...register("credit")}
                    placeholder="Credit Reference"
                    className="form-control"
                    defaultValue={0}
                  />
                  {errors.credit && <small className="error">{errors.credit.message}</small>}
                </div>
              </div>
              {
                role === 'user' && (
                  <div className="col-6"><div className="form-group"><label for="" className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]'>Exposer Limit:</label> <input type="text" placeholder="Exposer Limit" name="exposerlim" className="form-control" /></div></div>
                )
              }
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <h4 className="mb-4 col-md-12">Commission Settings</h4>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr><td>Upline</td><td>0</td></tr>
                <tr><td>Downline</td><td><input type="text" {...register("commission")} placeholder="0" maxLength="4" /></td></tr>
                <tr><td>Our</td><td></td></tr>
              </tbody>
            </table>
          </div>

          <div className="col-12">
            <h4 className="mb-4 col-md-12">Partnership</h4>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr><td>Upline</td><td>0</td></tr>
                <tr><td>Downline</td><td><div className="form-group"><input type="text"  {...register("spart1")} placeholder="0" disabled /></div></td></tr>
                <tr><td>Our</td><td></td></tr>
              </tbody>
            </table>
          </div>

          {
            role === 'user' && (
              <div className="col-12"><h4 className="mb-4 col-md-12">Min Max Bet</h4> <table className="table table-striped table-bordered"><tbody><tr><td rowspan="2">Min Bet</td> <td>100</td></tr> <tr><td><input type="text" placeholder="100" {...register("minBet")} value="100" />    {errors.minBet && <small className="error">{errors.minBet.message}</small>}</td></tr> <tr><td rowspan="2">Max Bet</td> <td>5000000</td></tr> <tr><td>
                <input type="text" placeholder="5000000" value="5000000"  {...register("maxBet")} />      {errors.maxBet && <small className="error">{errors.maxBet.message}</small>}</td></tr> <tr><td rowspan="2">Delay</td> <td>5.00</td></tr> <tr><td><input type="text" placeholder="5.00" value="5.00"   {...register("betDelay")} />   {errors.betDelay && <small className="error">{errors.betDelay.message}</small>}</td></tr></tbody></table></div>
            )
          }
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="form-group col-3 float-right">
              <label className='!text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]' htmlFor="m_pwd">Transaction Password:</label>
              <input type="password" {...register("txnPassword")} placeholder="Transaction Password" className="form-control" />
              {errors.txnPassword && <small className="error">{errors.txnPassword.message}</small>}
            </div>
          </div>
        </div>

        <div className="row m-t-20">
          <div className="col-md-12">
            <div className="float-right">
              {/* Button preserved visually — only uses the defined `loading` state */}
              <div className="form-group text-center">
                <button type="submit" disabled={loading} className="btn btn-submit btn-login">
                  {loading ? "Creating..." : "Create Account"}
                  <img src={signinIcon} alt="sign-in" className='inline ml-1 min-w-[18px] h-[18px]' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};



export default AddAccount
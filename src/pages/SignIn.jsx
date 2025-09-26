import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useApi from "../components/hooks/useApi";
import useToast from "../components/hooks/useToast";
import { useUser } from "../components/contexts/UserContext";
import signinIcon from '@images/sign-in-icon.svg'
import b9 from '@images/b9.png';
const schema = yup.object().shape({
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
});

const SignIn = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { setAuthToken, setUserData } = useUser();
  const { apiCall, loading, error } = useApi();
  const { toastSuccess, toastError } = useToast();

  const onSubmit = async (formData) => {
    try {
      const payload = JSON.stringify({ ...formData, role: "admin" });
      const result = await apiCall("POST", "user/login", payload);

      console.log("Login response:", result);

      if (result && result.success) {
        const userData = result.data;
        const isFirstLogin = userData?.isFirstLogin;

        console.log("isFirstLogin:", isFirstLogin);

        setAuthToken(userData.token);
        setUserData(userData);

        // Navigate based on first login status
        if (isFirstLogin) {
          // First time login → go to /admin for password change
          navigate("/admin");
        } else {
          // After password changed → go to /market-analysis
          navigate("/market-analysis");
        }

        toastSuccess(result.msg || "Login successful");
      } else {
        toastError(result.msg || error || "Login failed");
        reset();
      }
    } catch (err) {
      toastError(err?.message || "Something went wrong");
    }
  };


  return (
    <div className='login'>
      <div className='app'>
        <section className="login-mn">
          <div className="log-logo m-b-20">
            {/* <img src="https://sitethemedata.com/sitethemes/saffronexch.com/front/logo.png" className='mx-auto' style={{ maxWidth: '250px', maxHeight: "100px" }} /> */}
            <img src={b9} className='mx-auto' style={{ maxWidth: '350px', maxHeight: "100px" }} />
          </div>
          <div className="log-fld">
            <h2 className="text-center">Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" data-vv-scope="form-login" className="form-horizontal">
              <div id="input-group-1" role="group" className="form-group">
                <div>
                  <input id="input-1" name="username"  {...register("username")} type="text" placeholder="Username" className="form-control !bg-[#e8f0fe]" disabled={loading} />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                  )} </div></div>
              <div id="input-group-2" role="group" className="form-group"><div>
                <input id="input-2" name="password"  {...register("password")} type="password" placeholder="password" className="form-control !bg-[#e8f0fe]" disabled={loading} />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div></div>
              {/* <div className="form-group text-center">
                        <button onClick={() => navigate('/')} className="btn btn-submit btn-login">Login
                             <i className="fas fa-sign-in-alt"></i></button></div> */}
              <div className="form-group text-center">
                <button type="submit" disabled={loading} className="btn btn-submit btn-login">
                  {loading ? "Logging in..." : "Login"}
                  <img src={signinIcon} alt="sign-in" className='inline ml-1 min-w-[18px] h-[18px]' />
                </button>
              </div>
            </form> </div></section>
      </div>
    </div>
  )
}

export default SignIn

// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';

// const SignIn = () => {

//     const navigate = useNavigate();

//     return (
//         <div className='login'>
//         <div className='app'>
//         <section className="login-mn"><div className="log-logo m-b-20"><img src="https://sitethemedata.com/sitethemes/saffronexch.com/front/logo.png" className='mx-auto' style={{maxWidth: '250px', maxHeight: "100px;"}} /></div> <div className="log-fld"><h2 className="text-center">Sign In</h2>  <form autoComplete="off" data-vv-scope="form-login" className="form-horizontal"> <div id="input-group-1" role="group" className="form-group"><div><input id="input-1" name="username" type="text" placeholder="Username" className="form-control !bg-[#e8f0fe]" /> </div></div> <div id="input-group-2" role="group" className="form-group"><div><input id="input-2" name="password" type="password" placeholder="password" className="form-control !bg-[#e8f0fe]" /> </div></div> <div className="form-group text-center"><button onClick={() => navigate('/admin')} className="btn btn-submit btn-login">Login <i className="fas fa-sign-in-alt"></i></button></div></form> </div></section>
//         </div>
//         </div>
//     )
// }

// export default SignIn
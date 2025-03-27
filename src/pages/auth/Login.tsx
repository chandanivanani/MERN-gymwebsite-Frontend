import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import imageLogin from "../../images/about.jpg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Header from "../../components/LandingPage/Header";
import Footer from "../../components/LandingPage/Footer";
// import {MdEmail} from "react-icons/md";
// import {RiLockPasswordFill} from "react-icons/ri";
// import {FaEye,FaEyeSlash} from "react-icons/fa";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { loginUser } from "../../store/slices/authSlice";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.auth.user);
  // console.log("logged in user",user);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); //toggle showpassword state
  };

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const resultAction = await dispatch(loginUser(data)).unwrap();
      // console.log("login data:", resultAction);
      toast.success("Login successful");

      if(resultAction.user)
      navigate(resultAction?.user?.role === 1 ? "/admin" : "/user");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 500) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center mt-10">
        {/* BackGround image */}
        <div className="absolute inset-0 z-0">
          <img
            src={imageLogin}
            alt=""
            className="w-full h-full object-cover opacity-40 brightness-50"
          />
        </div>

        {/* Login form */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="bg-surface-200 shadow-inner shadow-neutral-200 ml-2 mr-2 rounded-2xl px-8 pt-6 pb-8 mb-4">
            <div className="text-center">
              <div className="bg-primary-400 rounded-full inline-block p-2">
                <LockOutlinedIcon className="h-10 w-10 text-white" />
              </div>
              <h2 className="mt-1 text-xl font-medium text-white">Login</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email
                </label>

                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm border border-e-0 rounded-s-md bg-surface-200 text-gray-400 border-gray-600">
                    <MailIcon className="h-6 w-6 text-gray-400" />
                  </span>
                  <input
                    type="email"
                    {...register("email")}
                    className="rounded-none rounded-e-lg border block flex-1 min-w-0 w-full text-sm p-2.5 bg-surface-200 border-gray-600 placeholder-gray-200 text-white focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm italic">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm border border-e-0 rounded-l-md bg-surface-200 text-gray-400 border-gray-600">
                    <LockIcon className="h-6 w-6 text-gray-400" />
                  </span>

                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="rounded-none rounded-e-lg border block min-w-0 w-full text-sm p-2.5 bg-surface-200 border-gray-600 placeholder-gray-200 text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter password"
                    />

                    {/* show eye icon in the input field */}
                    <div className="absolute items-center end-0 top-0 mt-3 justify-center pr-5">
                      {showPassword ? (
                        <VisibilityIcon
                          className="text-gray-400 w-5 h-5 cursor-pointer"
                          onClick={handleTogglePassword}
                        />
                      ) : (
                        <VisibilityOffIcon
                          className="text-gray-400 w-5 h-5 cursor-pointer"
                          onClick={handleTogglePassword}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm italic">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-4 text-center">
                <button
                  className="bg-primary-400 hover:bg-primary-200 w-full text-white font-medium py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline text-lg tracking-wider"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className="flex justify-between">
                <div className="text-center">
                  <Link
                    to="/forgot"
                    className="inline-block align-baseline text-sm text-primary-600 hover:underline"
                  >
                    Forgot password
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    to="/signup"
                    className="inline-block align-baseline text-sm text-primary-600 hover:underline"
                  >
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

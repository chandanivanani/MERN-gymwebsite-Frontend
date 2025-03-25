import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import imagelogin from "../../images/about.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/LandingPage/Header";
import Footer from "../../components/LandingPage/Footer";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../store/slices/authSlice";
import { AppDispatch } from "../../store/store";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

interface FormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

const ForgotPass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormInput) => {
    try {
      const response = await dispatch(forgotPassword(data));
      console.log("forgot page", response);

      if(response.meta.requestStatus === "fulfilled"){
        navigate("/login");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 500) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={imagelogin}
            alt=""
            className="w-full h-full object-cover opacity-40 brightness-50"
          />
        </div>

        {/* forgot form */}
        <div className="relative mx-auto w-full mt-20 max-w-md">
          <div className="bg-surface-200 shadow-inner shadow-neutral-200 ml-2 mr-2 rounded-2xl px-8 pt-6 pb-8 mb-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="text-sm rounded-lg block w-full p-2.5 bg-surface-200 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 foucs:border-blue-500"
                  placeholder="john.doe@company.com"
                  required
                />
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
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="text-sm rounded-lg block w-full p-2.5 bg-surface-200 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="•••••••••"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm italic">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 tet-sm font-medium text-white "
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  className="text-sm rounded-lg block w-full p-2.5 bg-surface-200 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="•••••••••"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm italic">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="mb-4 text-center">
                <button
                  className="bg-primary-400 hover:bg-primary-200 w-full text-white font-medium py-2 px-3 rounded-lg focus:outline-none text-lg tracking-wider"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPass;

import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Loading from "./components/dashboard/common/Loading";
import PrivateRoutes from "./utils/PrivateRoutes";

const LandingPage = React.lazy(() => import("./pages/home/LandingPage"));
const SignUp = React.lazy(() => import("./pages/auth/Signup"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const ForgotPass = React.lazy(() => import("./pages/auth/ForgotPass"));
const ErrorPage = React.lazy(() => import("./components/dashboard/common/ErrorPage"))

function App() {
  return (
    <>
      <Toaster />

      <Suspense fallback={<Loading />}>
        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/unauthorized" element={<ErrorPage />} />

          {/* ===========================================auth============================ */}

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPass />} />

        </Routes>
      </Suspense>
    </>
  );
}

export default App;

import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Loading from "./components/dashboard/common/Loading";
import PrivateRoutes from "./utils/PrivateRoutes";
import ForgotPass from "./pages/auth/ForgotPass";

const LandingPage = React.lazy(() => import("./pages/home/LandingPage"));
const SignUp = React.lazy(() => import("./pages/auth/Signup"));
const Login = React.lazy(() => import("./pages/auth/Login"));

function App() {
  return (
    <>
      <Toaster />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

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

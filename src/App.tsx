import React,{Suspense} from 'react'
import {Route , Routes} from 'react-router-dom';
import './App.css'
import { Toaster } from 'react-hot-toast';
import Loading from './components/dashboard/common/Loading'
import PrivateRoutes from './utils/PrivateRoutes'


const LandingPage = React.lazy(() => import("./pages/home/LandingPage"));
const SignUp = React.lazy(() => import("./pages/auth/Signup"));


function App() {
  return (
    <>
    <Toaster />
      
    <Suspense fallback={<Loading/>}>
    <Routes>
      <Route path="/" element={<LandingPage/>} />


      {/* ===========================================auth========================= */}

      <Route path='/signup' element={<SignUp />}/>
    </Routes>

    </Suspense>
    </>
  );
}

export default App;

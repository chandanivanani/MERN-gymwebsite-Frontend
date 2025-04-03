import React,{useEffect} from "react";
import { Outlet,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const PrivateRoutes = () => {
     const {user,token} = useSelector((state:RootState) => state.auth);
     const navigate = useNavigate();
     const role = user?.role;
   //   console.log(role);
   //   console.log(token);

     useEffect(() => {
        if(!token) {
            // If user is not authenticated, redirect to login page
          navigate("/login");
        } else {
           if(user?.role === 1 && window.location.pathname.includes('/user')) {
              navigate('/unauthorized');
           }

           else if(user?.role === 0 && window.location.pathname.includes('/admin')) {
             navigate('/unauthorized');
           }
        }
     },[user,token]);

     //render the nested routes
     return <Outlet />;
}

export default PrivateRoutes;
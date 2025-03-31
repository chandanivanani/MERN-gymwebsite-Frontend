import React from "react";
import { useNavigate } from "react-router-dom";
type Props = {}

const ErrorPage = (props:Props) => {
      const navigate = useNavigate();
      const handleClick = () => {
        navigate("/")
      }
      
      return (
        <div>
            <div className="flex flex-col items-center justify-center mt-60">
                <span className="text-white text-4xl font-semibold mb-2">Sorry 😓</span>
                <span className="text-white text-center text-xl mb-3 tracking-wide">You are not authorized to access this page</span>
                <button className="text-base bg-primary-500 px-3 py-1.5 font-medium tracking-wider text-white" onClick={handleClick}>Go Back</button>

            </div>
        </div>
      )
}

export default ErrorPage;
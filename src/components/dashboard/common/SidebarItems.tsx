import React from "react";
import { useNavigate } from "react-router-dom";

interface NavItemProps {
    text: string;
    path: string;
    icon?: React.ReactElement;
}

const SidebarItem : React.FC<NavItemProps> = ({text,path,icon}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    };

    return (
        <div className="flex flex-col justify-center ">
            <button onClick={handleClick} className="flex items-center hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-100 rounded px-10 py-2">
               {icon && <span className="mr-3">{icon}</span>}
               <span>{text}</span>
            </button>
        </div>
    );
};

export default SidebarItem;
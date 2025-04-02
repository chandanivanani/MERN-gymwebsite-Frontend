import React from "react";
import logo from '../../../images//MainLogo.png';
import CloseIcon from '@mui/icons-material/Close';
import SidebarItem from "./SidebarItems";
import { MenuItems } from '../../../utils/MenuItems'

interface SidebarProps{
     mobileOpen: boolean;
     handleDrawerClose: () => void;
     menuItems: MenuItems[]; 
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerClose, menuItems }) => {
    return (
        <>
          <aside
            className={`absolute left-0 top-0 z-50 flex h-screen w-72.5 flex-col transform overflow-y-hidden bg-surface-200 duration-300 ease-linear dark:bg-boxdark md:static md:translate-x-0 ${
                mobileOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >

          <div className="flex flex-col h-full shadow-lg w-60 ">
            <div className="flex items-center justify-around mt-4 pb-4 border-gray-100">
               <img src={logo} alt="logo" className="h-12" />

        {/* Close button to close the mobile drawer */}
            <button className="md:hidden mr-4 text-white" onClick={handleDrawerClose}>
                <CloseIcon/>
            </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="flex flex-col py-4 space-y-1">

            {menuItems.map((item, index) => (
               <SidebarItem key={index} text={item.text} path={item.path} icon={item.icon} />
            ))}
         </ul>
        </nav>
    </div>
</aside>
        </>
    );
};

export default Sidebar;
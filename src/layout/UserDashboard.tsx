import React, {Suspense} from "react";
import { Route, Routes } from 'react-router-dom';
import { UserMenuItems } from "../utils/MenuItems";
import Sidebar from "../components/dashboard/common/Sidebar";
import Loading from "../components/dashboard/common/Loading";

const UserProfile = React.lazy(() => import("../pages/user/profile/UserProfile"))
const UserHome = React.lazy(() => import("../pages/user/userDashboard/UserHome"))

const UserDashboard = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    return (
        <>
           {/*=========== Page Wrapper Start=============== */}
           <div className="flex h-screen overflow-hidden">

            {/*=========================sidebar start=========================*/}
            <Sidebar mobileOpen={mobileOpen}
              handleDrawerClose={handleDrawerClose}
              menuItems={UserMenuItems}
            />
            {/*===================== Sidebar End============================= */}

            {/*===================== Content Area Start====================== */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

                {/*==================== Header Start =================*/}
                <Navbar />
                {/*==================== Header End ===================*/}

                {/*=================Main Content Start =================*/}
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-surface-100">
                        <Suspense fallback= {<Loading/>}>
                          <Routes>
                            <Route path="/" element={<UserHome />} />
                            <Route path="home" element={<UserHome />} />
                            <Route path="profile" element={<UserProfile />} />


                          </Routes>
                        </Suspense>

                    </div>
                </main>
                {/*================== Main Content End===================== */}
            </div>
            {/*================== Content Area End================ */}
           </div>
           {/* ====================Page Wrapper End==================== */}
        </>
    );
};

export default UserDashboard;
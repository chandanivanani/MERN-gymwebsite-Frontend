import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as LinkRouter } from "react-router-dom";
import { Link } from "react-scroll";
import defaultuser from "../../images/defaultUser.jpg";
import Logo from "../../images/MainLogo.png";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, token, image } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(token);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleDashboardClick = () => {
    if (user?.role === 1) {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <>
      <nav className="fixed w-full z-20 top-0 bg-surface-100 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <LinkRouter
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-11" alt="Flowbite Logo" />
          </LinkRouter>
          <div className="flex items-center md:order-2 space-x-0 md:space-x-0">
            {token ? (
              <>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2"
                >
                  <span>
                    <img
                      src={
                        image ? `http://localhost:5000/${image}` : defaultuser
                      }
                      className="h-9 w-9 rounded-full border-1 border-gray-800 mx-auto my-4"
                    />
                  </span>

                  <ArrowDropDownIcon className="hidden text-gray-300 text-lg sm:block" />
                </button>
              </>
            ) : (
              <>
                <LinkRouter to="/signup">
                  <button className="md:block hidden text-base bg-primary-500 px-3 py-1.5 ml-2 mr-2 font-medium tracking-wider rounded-lg text-white">
                    SignUp
                  </button>
                </LinkRouter>
              </>
            )}

            {/*=================================================Toggle-Menu========================================================================== */}
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden"
              onClick={toggleMenu}
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>

          {/*====================================================navbar================================================================================= */}
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 bg-surface-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <LinkRouter
                  to="/"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-200 md:p-0"
                  aria-current="page"
                >
                  Home
                </LinkRouter>
              </li>
              <li>
                <Link
                  to="about"
                  smooth={true}
                  duration={500}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-200 cursor-pointer md:p-0"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="features"
                  smooth={true}
                  duration={500}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-200 cursor-pointer md:p-0"
                >
                  Features
                </Link>
              </li>

              {!token && (
                <li className="md:hidden">
                  <LinkRouter to="/signup">
                    <button className="block w-full px-4 py-2 text-sm rounded-lg bg-primary-400 text-white">
                      SignUp
                    </button>
                  </LinkRouter>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* User Menu */}

      <div
        className={`right-0 px-4 mt-6 md:mt-4 mr-5 z-50 ${
          isUserMenuOpen ? "fixed" : "hidden"
        } text-base list-none divide-y rounded-lg shadow bg-surface-200 divide-gray-600`}
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-sm capitalize tracking-wide text-gray-300">
            {user?.firstname ?? "Guest"}
          </span>
          <span className="block text-xs mt-1 tracking-wide truncate text-gray-300">
            {user?.email}
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <button
              className="block px-4 py-2 text-sm w-full hover:bg-gray-600 text-white rounded-lg hover:text-white"
              onClick={handleDashboardClick}
            >
              Dashboard
            </button>
          </li>
          <li>
            <LinkRouter to="/login">
              <button
                className="block w-full px-4 py-2 text-sm rounded-lg hover:bg-gray-600 text-white marker:hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </LinkRouter>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;

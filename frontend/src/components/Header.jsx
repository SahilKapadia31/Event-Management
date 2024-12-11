import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignInAlt,
  faSignOutAlt,
  faCaretDown,
  faPlus,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="py-4 bg-white shadow">
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#dc143c] flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
          <span>BookMyEvents</span>
        </Link>

        {/* Buttons */}
        <div className="relative flex items-center space-x-4">
          {user ? (
            <>
              <span className="font-semibold text-gray-700">
                Welcome, {user.username}
              </span>

              {/* Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-[#dc143c] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#b11230] flex items-center"
                >
                  Actions
                  <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                    <Link
                      to="/create-event"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#ffe5e9] hover:text-[#dc143c] flex items-center"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />
                      Create Event
                    </Link>
                    <Link
                      to="/my-events"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#ffe5e9] hover:text-[#dc143c] flex items-center"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={faListAlt} className="mr-2" />
                      My Events
                    </Link>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center bg-[#dc143c] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#b11230]"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center bg-white text-[#dc143c] border border-[#dc143c] px-4 py-2 rounded-md font-semibold hover:bg-[#ffe5e9]"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center bg-[#dc143c] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#b11230]"
              >
                <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
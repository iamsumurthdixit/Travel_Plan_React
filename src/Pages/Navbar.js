import { Link } from "react-router-dom";
import { AppContext } from "./AppContextFile";
import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { Notification } from "./Notification";
import "../css/navbar.css";

export const Navbar = () => {
  const {
    role,
    user,
    isLoggedIn,
    handleLogout,
    isDropdownOpen,
    setDropdownOpen,
  } = useContext(AppContext);

  return (
    <nav>
      <ul className="nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {isLoggedIn && user ? (
          <>
            <li className="nav-item active">
              <span className="nav-link">{user.name}</span>
            </li>
            {role === "admin" && Cookies.get("jwt") && (
              <li className="nav-item">
                <Link to="/addPlan" className="nav-link">
                  Add Plan
                </Link>
              </li>
            )}
            {role === "user" && Cookies.get("jwt") && (
              <>
                <li className="nav-item">
                  <Link to="/registeredPlansOnly" className="nav-link">
                    View Registered Plans
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={() => setDropdownOpen(!isDropdownOpen)}>
                    {isDropdownOpen
                      ? "Hide Notifications"
                      : "Show Notifications"}
                  </button>
                  {isDropdownOpen && (
                    <Notification
                      isDropdownOpen={isDropdownOpen}
                      setDropdownOpen={setDropdownOpen}
                    />
                  )}
                </li>
              </>
            )}
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-round"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

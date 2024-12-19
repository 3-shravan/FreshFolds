import React from "react";

import "./header.css";
import { Link } from "react-router-dom";
import { AuthProvider, useAuth } from "@/utils/authContext";

const CommonHeader = (props) => {
  const { isLoggedIn, currentUser, logout } = useAuth();

  return (
    <header className="header">
      <nav className="navbar">

        <Link to={isLoggedIn ? "/dashboard" : "/"} className="logo">
          {/* <img src=' ' alt=" " /> */}
          Fresh & Folds
          <span></span>
        </Link>
        

        <ul className="nav-links">
          {/* Based on the user state, show the login and register links */}

          {}
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services & Pricing</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}

          {/***
           * Based on the user state, show the Dashboard, Logout, Profile Avatar, etc
           * Add the code here
           */}

          {isLoggedIn && (
            <>
             
              <li>
                <Link to="/profile" className="profile">
                  {/* <img
                    src={currentUser?.avatarUrl || "/avatar.png"}
                    alt="Profile Avatar"
                    className="avatar"
                  /> */}
                  {currentUser?.fullName}
                </Link>
              </li>
              <li>
                <Link to="#" onClick={logout}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default CommonHeader;

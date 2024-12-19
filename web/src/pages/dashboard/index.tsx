import React from "react";
import { useContext } from "react";
import { useAuth } from "../../utils/authContext";
import {
  FaHome,
  FaShoppingCart,
  FaHistory,
  FaCreditCard,
  FaTruck,
} from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import DashboardAdmin from "./DashboardAdmin";
import DashboardUser from "./DashboardUser";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const ifAdmin = currentUser?.userType === "admin";
  

  const handleNavigation = (path) => {
    navigate(path);
  };
  
    const showDashboard=ifAdmin
    ?location.pathname==="/admin"
    :location.pathname==="/user";

  return (
    <>
      <div className="dashboard-wrapper">
        <div className="sidebarContainer">
          <ul className="sidebarMenu">
            <li className="menuItem" onClick={() => handleNavigation(ifAdmin ? "/admin" : "/user")}>
              <FaHome className="menuIcon" />
              <button className="menuText">Home</button>
            </li>

            {!ifAdmin && (
              <li className="menuItem" onClick={() => handleNavigation("/user/new-order")}>
                <FaShoppingCart className="menuIcon" />
                <button className="menuText">Order</button>
              </li>
            )}

            <li className="menuItem" onClick={() => handleNavigation(ifAdmin ? "/admin/track-order" : "/user/track-order")}>
              <FaTruck className="menuIcon" />
              <button className="menuText">Track Order</button>
            </li>

            <li className="menuItem" onClick={() => handleNavigation(ifAdmin ? "/admin/order-history-admin" : "/user/order-history")}>
              <FaHistory className="menuIcon" />
              <button className="menuText">Order History</button>
            </li>
          </ul>
        </div>

        <div className="dashboard-container">
        {showDashboard ? (
            <div className="default-dashboard">
             {ifAdmin ? <DashboardAdmin/> : <DashboardUser/>}
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;




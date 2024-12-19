import "./App.css";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./utils/authContext";
import LandingPage from "./pages/landing/landingPage";
import LoginPage from "./pages/login";
import DashboardPage from "@/pages/dashboard";
import RegisterPage from "./pages/register";
import PageNotImplemented from "./pages/pageEmpty";
import CommonHeader from "@/Components/Header";
import AboutUs from "./pages/about/AboutUs";
import Service from "./pages/service and pricing/Service";
import Contact from "./pages/contact/Contact";
import OrderHistoryAdmin from "./pages/orderHistoryTracking/admin/OrderHistoryAdmin";
import OrderHistoryUser from "./pages/orderHistoryTracking/OrderHistoryUser";
import OrderTracking from "./pages/orderHistoryTracking/OrderTracking";
import NewOrder from "./pages/newOrder/newOrder";
import TrackOrder from "./pages/trackOrder/trackOrder";
import { ProtectedRoute, ProtectedRouteAdmin } from "./utils/protectedRoutes";
import UnprotectedRoute from "./utils/unprotectedRoutes";

import Box from "./pages/Ordertrack/Box";
import CheckboxPage from "./pages/Ordertrack/CheckboxPage";
import RequestSubmission from "./Components/RequestSubmission";

const BlankLayout = () => {
  return (
    <>
      <CommonHeader />
      <main>
        <div className="main"> </div>
        <Outlet />
        <ToastContainer />
      </main>
    </>
  );
};
const App = () => {
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleCheckboxChange = (value) => {
    setSelectedEvent(value);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BlankLayout />,
      children: [
        {
          element: <UnprotectedRoute />,
          children: [
            {
              path: "/",
              element: <LandingPage />,
            },
            {
              path: "/login",
              element: <LoginPage />,
            },
            {
              path: "/register",
              element: <RegisterPage />,
            },
            {
              path: "/contact",
              element: <Contact />,
            },
            {
              path: "/services",
              element: <Service />,
            },
            {
              path: "/about",
              element: <AboutUs />,
            },

            {
              path: "*",
              element: <PageNotImplemented />,
            },
          ],
        },

        // Protected routes --------------------------------------------

        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/",
              element: <DashboardPage />,
            },

            {
              path: "/user",
              element: <DashboardPage />,
              children: [
                { path: "new-order", element: <NewOrder /> },
                {
                  path: "req",
                  element: <RequestSubmission />,
                },
                { path: "track-order", element: <TrackOrder /> },
                { path: "order-history", element: <OrderHistoryUser /> },
                { path: "payment", element: <h2>Payment Section</h2> },
              ],
            },

            {
              path: "order-tracking/:order_id",
              element: <OrderTracking />,
            },
          ],
        },

        {
          element: <ProtectedRouteAdmin />,
          children: [
            {
              path: "/admin",
              element: <DashboardPage />,
              children: [
                { path: "order-history-admin", element: <OrderHistoryAdmin /> },
                {
                  path: "order-history/:fullName/:user_id",
                  element: <OrderHistoryUser />,
                },
              ],
            },

            {
              path: "order-tracking/:order_id",
              element: <OrderTracking />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;

// {
//   path: "/track",
//   element: (
//     <Box
//       selectedEvent={selectedEvent}
//       handleCheckboxChange={handleCheckboxChange}
//     />
//   ),
// },
// {
//   path: "/ordertrack/admin",
//   element: (
//     <CheckboxPage
//       handleCheckboxChange={handleCheckboxChange}
//       selectedEvent={selectedEvent}
//     />
//   ),
// },

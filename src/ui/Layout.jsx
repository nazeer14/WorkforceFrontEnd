import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

function Layout() {
  const location = useLocation();

  // Hide header on these routes
  const hiddenRoutes = ["/login", "/forgot", "/register","/*"];

  return (
    <>
      {!hiddenRoutes.includes(location.pathname) && <Header />}
      <Outlet /> {/* This renders the child routes */}
    </>
  );
}

export default Layout;

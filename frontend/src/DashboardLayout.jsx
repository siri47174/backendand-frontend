import React from "react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
    <Navbar />
    <Sidebar />
    <Outlet />
  </div>
  );
};

export default DashboardLayout;

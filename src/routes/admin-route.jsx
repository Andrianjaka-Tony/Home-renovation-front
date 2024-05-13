import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Unit from "../pages/unit";
import Home from "../pages/admin/home";
import ContractById from "../pages/admin/contract-by-id";
import Dashboard from "../pages/admin/dashboard";
import Menu from "../components/menu";

function AdminRoute() {
  const location = useLocation();

  const items = [
    {
      name: "Dashboard",
      to: "./dashboard",
    },
    {
      name: "Devis",
      to: "./home",
    },
  ];

  return (
    <>
      <Menu items={items} />
      <Routes location={location} key={location.pathname}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/units" element={<Unit />} />
        <Route path="/contract/:id" element={<ContractById />} />
      </Routes>
    </>
  );
}

export default AdminRoute;

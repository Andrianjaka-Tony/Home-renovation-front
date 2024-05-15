import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Unit from "../pages/unit";
import Home from "../pages/admin/home";
import ContractById from "../pages/admin/contract-by-id";
import Dashboard from "../pages/admin/dashboard";
import Menu from "../components/menu";
import FileImport from "../pages/admin/file-import";
import FinishingType from "../pages/admin/finishing-type";
import Work from "../pages/admin/work";
import Reset from "../pages/admin/reset";

function AdminRoute() {
  const location = useLocation();

  const items = [
    {
      name: "Dashboard",
      to: "./dashboard",
    },
    {
      name: "Devis",
      to: "./contract",
    },
    {
      name: "Import",
      to: "./file-import",
    },
    {
      name: "Finition",
      to: "./finishing",
    },
    {
      name: "Travaux",
      to: "./work",
    },
    {
      name: "Reinitialiser",
      to: "./reset",
    },
    {
      name: "Deconnexion",
      to: "/sign-out",
    },
  ];

  return (
    <>
      <Menu items={items} />
      <Routes location={location} key={location.pathname}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contract" element={<Home />} />
        <Route path="/units" element={<Unit />} />
        <Route path="/contract/:id" element={<ContractById />} />
        <Route path="/file-import" element={<FileImport />} />
        <Route path="/finishing" element={<FinishingType />} />
        <Route path="/work" element={<Work />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
}

export default AdminRoute;

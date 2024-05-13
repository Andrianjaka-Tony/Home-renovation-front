import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Unit from "../pages/unit";

function AdminRoute() {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/units" element={<Unit />} />
      </Routes>
    </>
  );
}

export default AdminRoute;

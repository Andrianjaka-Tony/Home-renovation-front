import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Menu from "../components/menu";
import ClientContract from "../pages/client/client-contract";
import ClientHome from "../pages/client/home";
import { AnimatePresence } from "framer-motion";
import ClientContactById from "../pages/client/client-contract-by-id";

const items = [
  {
    name: "Accueil",
    to: "./home",
  },
];

function ClientRoute() {
  const location = useLocation();

  return (
    <>
      <Menu items={items} />
      {/* <AnimatePresence mode="wait"> */}
      <Routes location={location} key={location.pathname}>
        <Route path="/home" element={<ClientHome />} />
        <Route path="/contract" element={<ClientContract />} />
        <Route path="/contract/:id" element={<ClientContactById />} />
      </Routes>
      {/* </AnimatePresence> */}
    </>
  );
}

export default ClientRoute;

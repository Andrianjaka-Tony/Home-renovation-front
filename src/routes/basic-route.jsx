import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignIn from "../pages/sign-in";
import AdminRoute from "./admin-route";
import SignInClient from "../pages/client/client-sign-in";
import ClientRoute from "./client-route";
import { AnimatePresence } from "framer-motion";
import SIgnOut from "../pages/sign-out";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/sign-in-client");
  }, []);

  return null;
};

function BasicRoute() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Redirect />} />
          <Route path="/sign-in-client" element={<SignInClient />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-out" element={<SIgnOut />} />
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/client/*" element={<ClientRoute />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default BasicRoute;

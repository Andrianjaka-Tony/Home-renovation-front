import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("client-contact");
    sessionStorage.removeItem("storage-token");
    navigate("/");
  }, []);

  return null;
}

export default SignOut;

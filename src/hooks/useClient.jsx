import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useClient() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("client-contact")) {
      navigate("/sign-out");
    }
  }, []);
}

export default useClient;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("storage-token")) {
      navigate("/sign-out");
    }
  }, []);
}

export default useAdmin;

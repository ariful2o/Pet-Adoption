import { useContext } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";

const useAuth = () => {
  const content = useContext(AuthContext);
  return content;
};

export default useAuth;
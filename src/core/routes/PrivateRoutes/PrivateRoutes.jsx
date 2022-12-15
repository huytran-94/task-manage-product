import { Navigate, Outlet } from "react-router-dom";
import { LOCAL_SERVICE } from "../../services/localServ";

const PrivateRoutes = () => {
  let auth = LOCAL_SERVICE.user.get();
  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoutes;

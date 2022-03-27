import { Navigate, Outlet } from "react-router-dom";

import { HOME } from "../constants/routes";

import { useSelector } from "../store";

const AuthProvider = () => {
  const isLogin = useSelector((state) => state.curUser.isLogin);
  return isLogin ? <Outlet /> : <Navigate to={HOME} />;
};

export default AuthProvider;

import { Link, useLocation } from "react-router-dom";

import { HOME, LOGIN, SIGNIN } from "../../constants/routes";
import Login from "../../components/Auth/Login/Login";
import Signin from "../../components/Auth/Signin/Signin";

import classes from "./Auth.module.css";

export default () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN || location.pathname === HOME;

  const actionBtn = (
    <div className={classes.action}>
      <button type="submit">{isLogin ? "Login" : "SignIn"}</button>
    </div>
  );

  return (
    <main className={classes.auth}>
      <h1>{isLogin ? "login" : "singin"}</h1>
      {isLogin ? <Login>{actionBtn}</Login> : <Signin>{actionBtn}</Signin>}
      <Link className={classes.toggle} to={!isLogin ? LOGIN : SIGNIN}>
        {isLogin ? "create new account" : "login"}
      </Link>
    </main>
  );
};

import { Link } from "react-router-dom";

import { HOME } from "../constants/routes";

import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.notFoundContainer}>
      <div className={classes.notFoundBox}>
        <h2>404</h2>
        <p>Sorry, the page you're looking con not found.</p>
        <Link to={HOME}>メイン画面</Link>
      </div>
    </div>
  );
};

export default NotFound;

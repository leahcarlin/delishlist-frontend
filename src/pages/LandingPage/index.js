import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import "./LandingPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token) history.push("/home");
  }, [token]);

  return (
    <div className="LandingPageContainer">
      <h4>Welcome to</h4>
      <div className="Title">
        <FontAwesomeIcon
          icon={faUtensils}
          style={{ marginRight: "10px", fontSize: "1.5em" }}
        />
        <h1>Delish List</h1>
        <FontAwesomeIcon
          icon={faUtensils}
          style={{ marginLeft: "15px", fontSize: "1.5em" }}
        />
      </div>
      <div className="AppInfo">
        <p>
          An app where you and your friends can create wish lists of restaurants
          you want to visit
        </p>
      </div>
      <div className="link-to-login">
        <h4>To use this app you have to log in or create an account</h4>
        <Link to="/login">
          <button>Log in</button>
        </Link>
      </div>
    </div>
  );
}

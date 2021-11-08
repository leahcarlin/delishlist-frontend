import React from "react";
import "./HeaderTabs.scss";
import { Link } from "react-router-dom";

export default function HeaderTabs() {
  return (
    <div className="headerContainer" style={{ marginTop: "10px" }}>
      <Link className="link" to="/">
        <p>My Lists</p>
      </Link>
      <Link className="link" to="/restaurant/favorites">
        <p>My Favorites</p>
      </Link>
      <Link className="link" to="/restaurant/find">
        <p>Find Restaurants</p>
      </Link>
    </div>
  );
}

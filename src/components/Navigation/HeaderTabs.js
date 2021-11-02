import React from "react";
import "./HeaderTabs.scss";
import { Link } from "react-router-dom";

export default function HeaderTabs() {
  return (
    <div className="headerContainer" style={{ marginTop: "10px" }}>
      <Link className="link" to="/">
        <p>My Lists</p>
      </Link>
      <Link className="link">
        <p>My Favorites</p>
      </Link>
      <Link className="link">
        <p>Browse Restaurants</p>
      </Link>
    </div>
  );
}

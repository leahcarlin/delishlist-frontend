import React from "react";
import "./HeaderTabs.scss";

export default function HeaderTabs() {
  return (
    <div className="headerContainer" style={{ marginTop: "10px" }}>
      <button>My Lists</button>
      <button>My Favorites</button>
      <button>Browse Restaurants</button>
    </div>
  );
}

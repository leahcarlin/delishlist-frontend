import React from "react";

export default function UserProfile(props) {
  const { user } = props;
  return (
    <div
      className="userDetails"
      style={{
        width: "90%",
        display: "flex",
        margin: "20px 0 20px 0",
        justifyContent: "space-around",
      }}
    >
      <div className="profileImg" style={{ alignSelf: "flex-start" }}>
        <img
          src={user.profileImg}
          alt={user.firstName}
          style={{
            width: "150px",
            maxWidth: "100%",
            height: "auto",
            marginRight: "20px",
            borderRadius: "10px",
          }}
        />
      </div>
      <div
        className="profileInfo"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h4>
          {user.firstName} {user.lastName}
        </h4>
        <p style={{ margin: "0" }}>
          <b>{user.myLists.length}</b> lists
        </p>
        <p># of shared lists</p>
      </div>
    </div>
  );
}

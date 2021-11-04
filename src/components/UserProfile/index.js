import React from "react";

export default function UserProfile(props) {
  const { user } = props;
  const sharedLists = user.myLists.filter((list) => {
    return list.users.length > 1;
  });

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
        <h5>
          {user.firstName} {user.lastName}
        </h5>
        <p style={{ margin: "0" }}>
          <b>{user.myLists.length}</b> lists
        </p>
        {sharedLists.length === 1 ? (
          <p>
            <b>1</b> shared list
          </p>
        ) : (
          <p>
            <b>{sharedLists.length}</b> shared lists
          </p>
        )}
      </div>
    </div>
  );
}

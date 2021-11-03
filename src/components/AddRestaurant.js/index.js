import React from "react";
import { Row } from "react-bootstrap";

export default function AddRestaurant(props) {
  const { lists, addToMyList } = props;

  return (
    <Row style={{ marginTop: "20px" }}>
      <p>
        <b>My Lists:</b>
      </p>
      {lists.map((list, index) => (
        <button
          style={{ border: "none" }}
          key={list.id}
          onClick={() => addToMyList(list.id)}
        >
          <li
            style={{
              listStyleType: "none",
              display: "flex",
              alignContent: "center",
            }}
          >
            <p style={{ marginRight: "5px" }}>{list.title}</p>
            <i class="bi bi-plus-circle"></i>
          </li>
        </button>
      ))}
    </Row>
  );
}

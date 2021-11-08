import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../store/list/selectors";

export default function MyFavorites() {
  const favorites = useSelector(selectFavorites);
  return (
    <Container>
      <h2>My Favorite Restaurants</h2>
    </Container>
  );
}

import React from "react";
import { Container, Form } from "react-bootstrap";

export default function FindRestaurants() {
  return (
    <Container>
      <h1>Find Restaurants</h1>
      <Form>
        <Form.Group>
          <Form.Label>Search for a restaurant by name</Form.Label>
        </Form.Group>
      </Form>
    </Container>
  );
}

import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Button, Row, Image, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchRestaurant } from "../../store/restaurant/actions";
import { selectSearch } from "../../store/restaurant/selectors";
import { Link } from "react-router-dom";

export default function FindRestaurant() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const search = useSelector(selectSearch);
  console.log("search selector", search);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchRestaurant(name));
    setName("");
  };

  const getImage = async (photoReference) => {
    const apiKey = "AIzaSyC8xDuaNPzG31t7Ns31FOlA8Q1HngWaWTM";
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${photoReference}&key=${apiKey}`
    );
    setImage(res.data);
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2>
        <b>Find Restaurants</b>
      </h2>
      <Form>
        <Form.Group>
          <Form.Label>Search for a restaurant by name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ marginTop: "10px" }}
          onClick={onSubmit}
        >
          Search
        </Button>
      </Form>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {!search
          ? null
          : search.map((result) => (
              <Row
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Col>
                  <Image
                    src={() =>
                      setImage(getImage(result.photos[0].photo_reference))
                    }
                  />
                </Col>
                <Col style={{ fontSize: ".75em" }}>{result.name}</Col>
                <Col style={{ display: "flex" }}>
                  <Link to={`/restaurant/${result.place_id}`}>
                    <Button
                      style={{ width: "50px", textAlign: "center" }}
                      variant="primary"
                    >
                      View
                    </Button>
                  </Link>
                  <Button
                    style={{ width: "50px", marginLeft: "5px" }}
                    variant="primary"
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            ))}
      </Row>
    </Container>
  );
}

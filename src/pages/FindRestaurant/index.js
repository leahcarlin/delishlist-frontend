import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Image, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchRestaurant } from "../../store/restaurant/actions";
import { selectMyLists } from "../../store/user/selectors";
import { selectSearch } from "../../store/restaurant/selectors";
import { Link, useHistory } from "react-router-dom";
import "./FindRestaurant.scss";
import { addRestaurantToList } from "../../store/list/actions";
import AddRestaurant from "../../components/AddRestaurant.js";
import { fetchMyLists } from "../../store/user/actions";
import { showEuros } from "../../config/constants";

export default function FindRestaurant() {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [addToList, setAddToList] = useState(false);
  const [name, setName] = useState("");
  const [photoReference, setPhotoReference] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [priceLevel, setPriceLevel] = useState("");
  const [rating, setRating] = useState("");
  const search = useSelector(selectSearch);
  const lists = useSelector(selectMyLists);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchMyLists);
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchRestaurant(searchName));
    setSearchName("");
  };

  const addToMyList = (id) => {
    dispatch(
      addRestaurantToList(
        id,
        name,
        photoReference,
        placeId,
        priceLevel,
        rating,
        history
      )
    );
    setName("");
    setPhotoReference("");
    setPlaceId("");
    setPriceLevel(null);
    setRating(null);
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
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
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
              <Row className="results" key={result.place_id}>
                <Col className="col-img">
                  <Image
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${result.photos[0].photo_reference}&key=${process.env.REACT_APP_GKEY}`}
                  />
                </Col>
                <Col className="col-info">
                  <p>
                    <b>{result.name}</b>
                  </p>
                  <p>Rating: {result.rating}</p>
                  <p>{showEuros(result.price_level)}</p>
                  <div className="link">
                    <Link to={`/restaurant/${result.place_id}`}>View</Link>
                    <button
                      className="add-btn"
                      onClick={() => {
                        setName(result.name);
                        setPhotoReference(result.photos[0].photo_reference);
                        setPlaceId(result.place_id);
                        setPriceLevel(result.price_level || null);
                        setRating(parseFloat(result.rating));
                        setAddToList(!addToList);
                      }}
                    >
                      Add to List
                    </button>
                  </div>
                </Col>
              </Row>
            ))}
      </Row>
      {!lists ? null : (
        <Row>
          {addToList ? (
            <AddRestaurant lists={lists} addToMyList={addToMyList} />
          ) : null}
        </Row>
      )}
      <Row style={{ marginTop: "20px" }}>
        <b>
          <p className="inspo">Need some inspiration?</p>
        </b>
        <p>
          <Link to="/restaurant/browse">Browse restaurants</Link> that other
          users have added to their lists!
        </p>
      </Row>
    </Container>
  );
}

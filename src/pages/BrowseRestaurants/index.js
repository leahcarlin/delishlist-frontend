import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { Link, useHistory } from "react-router-dom";
import { fetchAllRestaurants } from "../../store/restaurant/actions";
import { selectAllRestaurants } from "../../store/restaurant/selectors";
import { fetchMyLists } from "../../store/user/actions";
import { selectMyLists } from "../../store/user/selectors";
import AddRestaurant from "../../components/AddRestaurant.js";
import { addRestaurantToList } from "../../store/list/actions";
import { showEuros, showStars } from "../../config/constants";
import { apiKey } from "../../config/constants";

export default function BrowseRestaurants() {
  const dispatch = useDispatch();
  const allRestaurants = useSelector(selectAllRestaurants);
  const [addToList, setAddToList] = useState(false);
  const [name, setName] = useState("");
  const [photoReference, setPhotoReference] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [priceLevel, setPriceLevel] = useState("");
  const [rating, setRating] = useState("");
  const lists = useSelector(selectMyLists);
  const history = useHistory();
  console.log("lists?", lists);

  useEffect(() => {
    dispatch(fetchAllRestaurants);
    dispatch(fetchMyLists);
  }, [dispatch]);

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

  if (!allRestaurants) return <Loading />;

  return (
    <Container>
      <h1 style={{ marginTop: "20px" }}>Browse Restaurants</h1>
      {allRestaurants.map((res) => (
        <Row className="results" key={res.id}>
          <Col className="col-img">
            <Image
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${res.photoReference}&key=${apiKey}`}
            />
          </Col>
          <Col className="col-info">
            <p>
              <b>{res.name}</b>
            </p>
            <p>{showStars(res.rating)}</p>
            <p>{showEuros(res.priceLevel)}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Link
                to={`/restaurant/${res.placeId}`}
                style={{ color: "#d62828", textDecoration: "none" }}
              >
                View
              </Link>
              <button
                className="add-btn"
                onClick={() => {
                  setAddToList(!addToList);
                  setName(res.name);
                  setPhotoReference(res.photoReference);
                  setPlaceId(res.placeId);
                  setPriceLevel(res.priceLevel || null);
                  setRating(parseFloat(res.rating));
                }}
              >
                Add to List
              </button>
            </div>
          </Col>
        </Row>
      ))}
      {!lists ? null : (
        <Row>
          {addToList ? (
            <AddRestaurant lists={lists} addToMyList={addToMyList} />
          ) : null}
        </Row>
      )}
    </Container>
  );
}

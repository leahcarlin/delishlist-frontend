import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantDetails } from "../../store/restaurant/actions";
import { selectRestaurantDetails } from "../../store/restaurant/selectors";
import {
  selectFavoritePlaceIds,
  selectFavorites,
  selectMyLists,
} from "../../store/user/selectors";
import Loading from "../../components/Loading";
import "./RestaurantDetails.scss";
import AddRestaurant from "../../components/AddRestaurant.js";
import { fetchMyLists, getFavorites } from "../../store/user/actions";
import { addRestaurantToList } from "../../store/list/actions";
import { useParams } from "react-router";
import { apiKey } from "../../config/constants";
import { useHistory } from "react-router-dom";
import { markFavorite, removeFavorite } from "../../store/user/actions";
import MapContainer from "../../components/Map";
import { showEuros } from "../../config/constants";

export default function RestaurantDetails() {
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurantDetails);
  const lists = useSelector(selectMyLists);
  const favorites = useSelector(selectFavorites);
  const favPlaceIds = useSelector(selectFavoritePlaceIds);
  console.log("place ids?", favPlaceIds);
  const [addToList, setAddToList] = useState(false);
  const { place_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchMyLists);
    dispatch(fetchRestaurantDetails(place_id));
    dispatch(getFavorites);
  }, [dispatch, place_id]);

  const addToMyList = (id) => {
    dispatch(
      addRestaurantToList(
        id,
        restaurant.name,
        restaurant.photos[0].photo_reference,
        restaurant.place_id,
        restaurant.price_level,
        restaurant.rating,
        history
      )
    );
  };

  if (!restaurant) return <Loading />;

  return (
    <Container fluid className="RestDetailsContainer">
      <Row className="RestDetails-row-1">
        <Image
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${restaurant.photos[0].photo_reference}&key=${apiKey}`}
        />
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <h3>
          <b>{restaurant.name}</b>
        </h3>
        <p>{restaurant.formatted_address}</p>
        <p>Rating: {restaurant.rating}</p>
        {restaurant.price_level ? (
          <p>{showEuros(restaurant.price_level)}</p>
        ) : null}
      </Row>
      <Row className="RestDetails-row-2" style={{ marginBottom: "20px" }}>
        <Col className="col1">
          {restaurant?.opening_hours.weekday_text.map((day) => (
            <p style={{ margin: "0" }}>{day}</p>
          ))}
        </Col>
        <Col className="col2" xs={4}>
          <button
            className="AddButton"
            onClick={() => setAddToList(!addToList)}
          >
            <i class="bi bi-list-task"></i>
            <p>add to list</p>
          </button>
        </Col>
      </Row>
      {!lists ? null : (
        <Row style={{ marginBottom: "20px" }}>
          {addToList ? (
            <AddRestaurant lists={lists} addToMyList={addToMyList} />
          ) : null}
        </Row>
      )}
      <Row className="RestDetails-row-3">
        <a target="_blank" rel="noreferrer" href={restaurant.website}>
          Visit Website
        </a>
      </Row>
      <MapContainer
        name={restaurant.name}
        lat={restaurant.geometry.location.lat}
        lng={restaurant.geometry.location.lng}
      />
    </Container>
  );
}

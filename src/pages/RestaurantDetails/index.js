import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantDetails } from "../../store/restaurant/actions";
import { selectRestaurantDetails } from "../../store/restaurant/selectors";
import { selectMyLists } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import "./RestaurantDetails.scss";
import AddRestaurant from "../../components/AddRestaurant.js";
import { fetchMyLists } from "../../store/user/actions";
import { addRestaurantToList } from "../../store/list/actions";
import { useParams } from "react-router";

export default function RestaurantDetails() {
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurantDetails);
  const lists = useSelector(selectMyLists);
  const [addToList, setAddToList] = useState(false);
  const { place_id } = useParams();

  useEffect(() => {
    dispatch(fetchMyLists);
    dispatch(fetchRestaurantDetails(place_id));
  }, [dispatch, place_id]);

  const addToMyList = (id) => {
    dispatch(addRestaurantToList(id, restaurant.name, restaurant.place_id));
  };

  if (!restaurant) return <Loading />;

  return (
    <Container fluid className="RestDetailsContainer">
      <Row style={{ marginTop: "20px" }} className="RestDetails-row-1">
        <img
          src="http://veraconsulting.it/wp-content/uploads/2014/04/placeholder.png"
          alt={restaurant.name}
        />
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <h3>
          <b>{restaurant.name}</b>
        </h3>
        <p>{restaurant.formatted_address}</p>
        <p>{restaurant.rating}</p>
        {restaurant.price_level ? <p>{restaurant.price_level}</p> : null}
      </Row>
      <Row className="RestDetails-row-2" style={{ marginBottom: "20px" }}>
        {restaurant?.opening_hours.weekday_text.map((day) => (
          <p style={{ margin: "0" }}>{day}</p>
        ))}
      </Row>
      <Row className="RestDetails-row-3">
        <a target="_blank" rel="noreferrer" href={restaurant.website}>
          Visit Website
        </a>
      </Row>
      <Row className="RestDetails-row-4">
        <Col className="col-3">
          <button
            className="AddButton"
            onClick={() => setAddToList(!addToList)}
          >
            <i class="bi bi-list-task"></i>
            <p>add to list</p>
          </button>
        </Col>
        <Col className="col-3">
          <p style={{ marginRight: "5px" }}>add to favorites</p>{" "}
          <i class="bi-heart"></i>
        </Col>
      </Row>
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

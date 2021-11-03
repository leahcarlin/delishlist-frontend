import React, { useEffect } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantDetails } from "../../store/restaurant/actions";
import { selectRestaurantDetails } from "../../store/restaurant/selectors";
import { selectMyLists } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import "./RestaurantDetails.scss";
import { fetchMyLists } from "../../store/user/actions";

export default function RestaurantDetails() {
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurantDetails);
  const lists = useSelector(selectMyLists);
  console.log("list", lists);

  useEffect(() => {
    dispatch(fetchMyLists);
    dispatch(fetchRestaurantDetails("ChIJC83Lp7kJxkcR6e4dkMmc6fQ"));
  }, [dispatch]);

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
        {restaurant.opening_hours.weekday_text.map((day) => (
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
          <Dropdown>
            <Dropdown.Toggle
              style={{
                background: "none",
                color: "black",
                border: "none",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p>add to list</p>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {lists.map((list) => (
                <Dropdown.Item style={{ fontSize: "1em" }}>
                  {list.title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="col-3">
          <p style={{ marginRight: "5px" }}>add to favorites</p>{" "}
          <i class="bi-heart"></i>
        </Col>
      </Row>
    </Container>
  );
}

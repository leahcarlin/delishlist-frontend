import React, { useEffect } from "react";
import { Container, Row, Col, Dropdown, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< Updated upstream
import { fetchListDetails } from "../../store/list/actions";
=======
import {
  fetchListDetails,
  getFavorites,
  markRestaurantVisited,
} from "../../store/list/actions";
>>>>>>> Stashed changes
import { selectListDetails } from "../../store/list/selectors";
import Loading from "../../components/Loading";
import moment from "moment";
import "moment/locale/en-gb";
import "./ListDetails.scss";
import { Link } from "react-router-dom";
import { apiKey } from "../../config/constants";
import { showEuros } from "../../config/constants";

export default function ListDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const list = useSelector(selectListDetails);
  moment.locale("en-gb"); // european date format

  useEffect(() => {
    dispatch(fetchListDetails(id));
    dispatch(getFavorites);
  }, [dispatch, id]);

<<<<<<< Updated upstream
=======
  const clickVisited = (restaurantId) => {
    dispatch(markRestaurantVisited(id, restaurantId));
  };

>>>>>>> Stashed changes
  if (!list) return <Loading />;

  return (
    <Container fluid>
      <Row className="ListDetails-row-1" style={{ marginTop: "20px" }}>
        <h2>{list.title}</h2>
        <p>Created {moment(list.createdAt).format("LL")}</p>
      </Row>
      <Row className="ListDetails-row-2">
        <Col>
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
              {list.users.length === 1 ? (
                <p>1 collaborator</p>
              ) : (
                <p>{list.users.length} collaborators</p>
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {list.users.map((user) => (
                <Dropdown.Item style={{ fontSize: ".75em" }}>
                  {user.firstName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col style={{ display: "flex" }}>
          <i class="bi bi-person-plus-fill"></i>
          <p style={{ marginLeft: "10px" }}>add collaborator</p>
        </Col>
      </Row>
      <Row className="RestaurantList">
        {list.restaurants.map((res) => (
<<<<<<< Updated upstream
          <Row className="RestaurantDetails">
=======
          <Row className="RestaurantDetails" key={res.id}>
            <Col className="RestCheck" xs={1}>
              <button onClick={() => clickVisited(res.id)}>
                {res.listRest.visited === true ? (
                  <i class="bi bi-check-circle"></i>
                ) : (
                  <i class="bi bi-circle"></i>
                )}
              </button>
            </Col>
>>>>>>> Stashed changes
            <Col>
              <Link to={`/restaurant/${res.placeId}`}>
                <Image
                  style={{ borderRadius: "10px" }}
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${res.photoReference}&key=${apiKey}`}
                />
              </Link>
            </Col>
            <Col className="RestInfo">
              <Link
                to={`/restaurant/${res.placeId}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>
                  <b>{res.name}</b>
                </p>
              </Link>
              <p>{parseFloat(res.rating)}</p>
              {res.priceLevel ? <p>{showEuros(res.priceLevel)}</p> : null}
            </Col>
<<<<<<< Updated upstream
            <Col className="RestCheck">
              <Form>
                <Form.Check
                  type="checkbox"
                  aria-label="checkbox"
                  id="checkbox"
                />
              </Form>
=======
            <Col xs={1} style={{ fontSize: "1em" }}>
              <i class="bi bi-suit-heart"></i>
>>>>>>> Stashed changes
            </Col>
          </Row>
        ))}
      </Row>
      <Link
        className="link"
        to="/restaurant/find"
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="AddRest">
          <i class="bi bi-plus-circle"></i>
          <p>Add a restaurant</p>
        </div>
      </Link>
    </Container>
  );
}

import React, { useEffect } from "react";
import { Container, Row, Col, Dropdown, Image } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListDetails,
  markRestaurantVisited,
} from "../../store/list/actions";
import { selectListDetails } from "../../store/list/selectors";
import Loading from "../../components/Loading";
import moment from "moment";
import "moment/locale/en-gb";
import "./ListDetails.scss";
import { Link } from "react-router-dom";
import { showEuros, showStars } from "../../config/constants";
import {
  getFavorites,
  markFavorite,
  removeFavorite,
} from "../../store/user/actions";
import { selectFavoriteIds } from "../../store/user/selectors";
import { apiKey } from "../../config/constants";

export default function ListDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const list = useSelector(selectListDetails);
  const favIds = useSelector(selectFavoriteIds);
  // console.log("Fav ids??", favIds);
  moment.locale("en-gb"); // european date format
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchListDetails(id));
    dispatch(getFavorites);
  }, [dispatch, id]);

  const clickVisited = (restaurantId) => {
    dispatch(markRestaurantVisited(id, restaurantId));
  };

  if (!list || !favIds) return <Loading />;

  return (
    <Container fluid>
      <Row className="ListDetails-row-1" style={{ marginTop: "10px" }}>
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
          <Link
            to={`/users/add/list/${list.id}`}
            style={{ textDecoration: "none", color: "black", display: "flex" }}
          >
            <i class="bi bi-person-plus-fill"></i>
            <p style={{ marginLeft: "10px" }}>add collaborator</p>
          </Link>
        </Col>
      </Row>
      {list.restaurants.map((res) => (
        <div
          className="RestaurantDetails"
          key={res.id}
          style={{
            backgroundColor: res?.listRest?.visited ? "#A9A9A9" : "white",
          }}
        >
          <div className="col-1">
            <button
              onClick={() => clickVisited(res.id)}
              style={{
                backgroundColor: res?.listRest?.visited ? "#A9A9A9" : "white",
              }}
            >
              {res?.listRest?.visited === true ? (
                <i class="bi bi-check-circle"></i>
              ) : (
                <i class="bi bi-circle"></i>
              )}
            </button>
          </div>
          <div className="col-2">
            <Link to={`/restaurant/${res.placeId}`}>
              <Image
                style={{ borderRadius: "10px" }}
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${res.photoReference}&key=${apiKey}`}
              />
            </Link>
          </div>
          <div className="col-3">
            <Link
              to={`/restaurant/${res.placeId}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <p>
                <b>{res.name}</b>
              </p>
            </Link>
            <p>{showStars(res.rating)}</p>
            {res.priceLevel ? <p>{showEuros(res.priceLevel)}</p> : null}
          </div>
          <div>
            {favIds.includes(res.id) ? (
              <button
                onClick={() => dispatch(removeFavorite(res.id))}
                style={{
                  border: "none",
                  backgroundColor: res?.listRest?.visited ? "#A9A9A9" : "white",
                }}
              >
                <i
                  class="bi bi-suit-heart-fill"
                  style={{
                    color: "#d62828",
                  }}
                ></i>
              </button>
            ) : (
              <button
                onClick={() => dispatch(markFavorite(res.placeId, history))}
                style={{
                  border: "none",
                  backgroundColor: res?.listRest?.visited ? "#A9A9A9" : "white",
                }}
              >
                <i class="bi bi-suit-heart"></i>
              </button>
            )}
          </div>
        </div>
      ))}
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

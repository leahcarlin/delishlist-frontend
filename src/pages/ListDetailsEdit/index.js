import React, { useEffect, useState } from "react";
import { Container, Row, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editListTitle,
  fetchListDetails,
  removeRestaurant,
} from "../../store/list/actions";
import { selectListDetails } from "../../store/list/selectors";
import Loading from "../../components/Loading";
import moment from "moment";
import "moment/locale/en-gb";
import "../ListDetails/ListDetails.scss";
import { Link } from "react-router-dom";
import { showEuros, showStars } from "../../config/constants";
import { apiKey } from "../../config/constants";
import { selectUser } from "../../store/user/selectors";
import { removeCollab } from "../../store/list/actions";

export default function ListDetailsEdit() {
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const list = useSelector(selectListDetails);
  moment.locale("en-gb"); // european date format

  useEffect(() => {
    dispatch(fetchListDetails(id));
  }, [dispatch, id]);

  const submitNewTitle = () => {
    dispatch(editListTitle(list.id, title));
    setTitle("");
  };

  const deleteCollab = (listId, collabId) => {
    dispatch(removeCollab(listId, collabId));
  };

  const deleteRestaurant = (listId, restaurantId) => {
    dispatch(removeRestaurant(listId, restaurantId));
  };

  if (!list) return <Loading />;

  return (
    <Container fluid>
      <Row className="ListDetails-row-1" style={{ marginTop: "10px" }}>
        <h2>{list.title}</h2>
        <p>Created {moment(list.createdAt).format("LL")}</p>
      </Row>
      {user.id === list.ownerId ? (
        <div>
          <div style={{ display: "flex", color: "#d62828" }}>
            <i class="bi bi-pencil-fill"></i>
            <p style={{ marginLeft: "10px" }}>Edit List Title</p>
          </div>
          <form onSubmit={submitNewTitle}>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              id="title"
              placeholder="Enter new list title"
            ></input>
            <button>OK</button>
          </form>
          <div style={{ display: "flex", color: "#d62828", marginTop: "20px" }}>
            <i class="bi bi-person-dash-fill"></i>
            <p style={{ marginLeft: "10px" }}>Remove collaborators</p>
          </div>
          <div>
            <ul>
              {list.users
                ? list.users
                    .filter((collab) => collab.id !== user.id)
                    .map((person) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => deleteCollab(list.id, person.id)}
                          style={{
                            marginLeft: "10px",
                            backgroundColor: "white",
                            border: "none",
                            fontSize: "1.5em",
                          }}
                        >
                          <i class="bi bi-file-x"></i>
                        </button>
                        <li style={{ listStyleType: "none" }}>
                          {person.firstName}
                        </li>
                      </div>
                    ))
                : null}
            </ul>
          </div>
          <div style={{ display: "flex", color: "#d62828" }}>
            <i class="bi bi-trash-fill"></i>
            <p style={{ marginLeft: "10px" }}>Remove Restaurants</p>
          </div>
          {list.restaurants.map((res) => (
            <div className="RestaurantDetails" key={res.id}>
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
                <button
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    fontSize: ".75em",
                  }}
                  onClick={() => deleteRestaurant(list.id, res.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#d62828" }}>Only owners of the list can edit</p>
      )}
      <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
        >
          <i class="bi bi-arrow-left"></i>
          <p style={{ marginLeft: "10px" }}>Back to My Lists</p>
        </div>
      </Link>
    </Container>
  );
}

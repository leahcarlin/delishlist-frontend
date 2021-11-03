import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListDetails } from "../../store/list/actions";
import { selectListDetails } from "../../store/list/selectors";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment/locale/en-gb";
import "./ListDetails.scss";
import { Link } from "react-router-dom";

export default function ListDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const list = useSelector(selectListDetails);
  moment.locale("en-gb"); // european date format
  const [addRest, setAddRest] = useState(false);

  useEffect(() => {
    dispatch(fetchListDetails(id));
  }, [dispatch, id]);

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
          <Link
            to={`/restaurant/${res.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Row style={{ marginBottom: "5px" }}>
              <Col>
                <img
                  src={res.photo}
                  alt={res.name}
                  style={{
                    maxWidth: "140px",
                    borderRadius: "10px",
                  }}
                />
              </Col>
              <Col className="RestInfo">
                <p>
                  <b>{res.name}</b>
                </p>
                <p>{parseFloat(res.rating)}</p>
                {res.priceLevel ? <p>{res.priceLevel}</p> : null}
              </Col>
              <Col className="RestCheck">
                <Form>
                  <Form.Check
                    type="checkbox"
                    aria-label="checkbox"
                    id="checkbox"
                  />
                </Form>
              </Col>
            </Row>
          </Link>
        ))}
        <div className="AddRest">
          <button className="AddButton" onClick={() => setAddRest(!addRest)}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <p>Add a restaurant</p>
          </button>
        </div>
      </Row>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
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
      <Row className="ListDetails" style={{ marginTop: "20px" }}>
        <h2>{list.title}</h2>
        <p>Created {moment(list.createdAt).format("LL")}</p>
      </Row>
      <Row className="RestaurantList">
        {list.restaurants.map((res) => (
          <Row style={{ margin: "5px" }}>
            <Col>
              <img
                src={res.photo}
                alt={res.name}
                style={{
                  width: "200px",
                  borderRadius: "10px",
                }}
              />
            </Col>
            <Col>
              <p>
                <b>{res.name}</b>
              </p>
              <p>{parseFloat(res.rating)}</p>
              {res.priceLevel ? <p>{res.priceLevel}</p> : null}
            </Col>
            <Col>
              <Form>
                <Form.Check
                  type="checkbox"
                  aria-label="checkbox"
                  id="checkbox"
                />
              </Form>
            </Col>
          </Row>
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

import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { selectListDetails } from "../../store/list/selectors";
import { searchUser } from "../../store/user/actions";
import { selectUserSearch } from "../../store/user/selectors";
import {
  AddCollaboratorToList,
  fetchListDetails,
} from "../../store/list/actions";
import "../FindRestaurant/FindRestaurant.scss";
import Loading from "../../components/Loading";

export default function AddCollaborator() {
  const [searchName, setSearchName] = useState("");
  const dispatch = useDispatch();
  const search = useSelector(selectUserSearch);
  const list = useSelector(selectListDetails);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchListDetails(id));
  }, [dispatch, id]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchUser(searchName));
    setSearchName("");
  };

  const addUserToList = (userId) => {
    dispatch(AddCollaboratorToList(id, userId, history));
  };

  if (!list) return <Loading />;

  return (
    <Container style={{ marginTop: "20px" }}>
      <p style={{ marginBottom: "5px" }}>Add a user to your list:</p>
      <h3>
        <b>{list.title}</b>
      </h3>
      <Form style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Form.Group>
          <Form.Label>Search for a user by first or last name</Form.Label>
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
          : search.map((user) => (
              <Row className="results" key={user.id}>
                <Col className="col-img">
                  <Image
                    src={user.profileImg}
                    alt={user.firstName}
                    style={{ maxWidth: "100%" }}
                  />
                </Col>
                <Col className="col-info">
                  <p>
                    <b>
                      {user.firstName} {user.lastName}
                    </b>
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      className="add-btn"
                      onClick={() => addUserToList(user.id)}
                    >
                      Add to List
                    </button>
                  </div>
                </Col>
              </Row>
            ))}
      </Row>
    </Container>
  );
}

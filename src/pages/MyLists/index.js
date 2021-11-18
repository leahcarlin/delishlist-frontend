import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectToken,
  selectMyLists,
} from "../../store/user/selectors";
import Loading from "../../components/Loading";
import UserProfile from "../../components/UserProfile";
import { fetchMyLists } from "../../store/user/actions";
import "./MyLists.scss";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import { newList } from "../../store/user/actions";
import { Link } from "react-router-dom";

export default function MyLists() {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const lists = useSelector(selectMyLists);
  // console.log("lists?", lists);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [addList, setAddList] = useState(false);

  useEffect(() => {
    dispatch(fetchMyLists);
  }, [dispatch]);

  const submitList = () => {
    dispatch(newList(title));
    setTitle("");
    setAddList(false);
  };
  const printCollabs = (users) => {
    let numCollabs = "";
    if (users?.length === 1) {
      numCollabs = "personal list";
    } else {
      numCollabs = `${users?.length} collaborators`;
    }
    return numCollabs;
  };

  if (!token || !lists) return <Loading />;

  return (
    <Container fluid>
      <UserProfile user={user} />
      <Row className="MyLists">
        <h3>
          <b>My Lists</b>
        </h3>
        {lists.length === 0 ? (
          <p>You don't have any lists yet!</p>
        ) : (
          lists.map((list) => (
            <div key={list.id} className="List">
              <Link to={`/list/${list?.id}`} style={{ textDecoration: "none" }}>
                <Col className="ListName">{list?.title}</Col>
              </Link>
              <Col className="ListDetails">
                <Row>
                  <i
                    class="bi bi-people-fill"
                    style={{ textAlign: "center" }}
                  ></i>
                  {list?.users ? <p>{printCollabs(list?.users)}</p> : null}
                </Row>
              </Col>
            </div>
          ))
        )}
      </Row>
      <div className="AddList">
        <button className="AddButton" onClick={() => setAddList(!addList)}>
          <i class="bi bi-plus-circle"></i>
          <p>Create a New List</p>
        </button>
        {!addList ? null : (
          <Form.Group controlId="FormListTitle">
            <Form.Control
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              placeholder="What is the title of your new list?"
              required
            />
            <Button variant="primary" type="submit" onClick={submitList}>
              OK
            </Button>
          </Form.Group>
        )}
      </div>
    </Container>
  );
}

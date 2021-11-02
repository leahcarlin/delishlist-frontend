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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import { newList } from "../../store/user/actions";
import { Link } from "react-router-dom";
import { selectListDetails } from "../../store/list/selectors";
import { selectNumCollabs } from "../../store/user/selectors";
import { fetchListDetails } from "../../store/list/actions";

export default function MyLists() {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const lists = useSelector(selectMyLists);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [addList, setAddList] = useState(false);
  const [collab, setCollab] = useState("");
  console.log("collab", collab);

  useEffect(() => {
    dispatch(fetchMyLists);
  }, [dispatch]);

  const submitList = () => {
    dispatch(newList(title));
    setTitle("");
    setAddList(false);
  };

  if (!token || !lists) return <Loading />;

  return (
    <Container fluid>
      <UserProfile user={user} />
      <Row className="MyLists">
        {lists.map((list) => (
          <li>
            <Link to={`/list/${list.id}`} style={{ textDecoration: "none" }}>
              <Col className="ListName">{list.title}</Col>
            </Link>
            <Col className="ListDetails">
              <FontAwesomeIcon icon={faUserFriends} />
              {list.users.length === 1 ? (
                <p>1 collaborator</p>
              ) : (
                <p>{list.users.length} collaborators</p>
              )}
            </Col>
          </li>
        ))}
      </Row>
      <div className="AddList">
        <button className="AddButton" onClick={() => setAddList(!addList)}>
          <FontAwesomeIcon icon={faPlusCircle} />
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

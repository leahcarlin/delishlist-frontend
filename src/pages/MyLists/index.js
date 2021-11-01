import React, { useEffect } from "react";
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

export default function MyLists() {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const lists = useSelector(selectMyLists);
  const dispatch = useDispatch();
  console.log("my lists", lists);

  useEffect(() => {
    dispatch(fetchMyLists);
  }, [dispatch]);

  if (!token || !lists) return <Loading />;

  return (
    <div className="Container">
      <UserProfile user={user} />
      <div className="MyLists">
        {lists.map((list) => (
          <li>
            <div className="ListName">{list.title}</div>
            <div className="ListDetails">
              <FontAwesomeIcon icon={faUserFriends} />
              <p>with # others</p>
            </div>
          </li>
        ))}
      </div>
      <div className="AddList">
        <FontAwesomeIcon icon={faPlusCircle} /> <p>Create a New List</p>
      </div>
    </div>
  );
}

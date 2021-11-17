import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectUser } from "../user/selectors";

export const LIST_DETAILS_FETCHED = "LIST_DETAILS_FETCHED";
export const ADD_RESTAURANT_SUCCESS = "ADD_RESTAURANT_SUCCESS";
export const COLLABORATOR_ADDED = "COLLABORATOR_ADDED";
export const MARKED_VISITED = "MARKED_VISITED";
export const TITLE_EDIT = "TITLE_EDIT";
export const COLLAB_REMOVED = "COLLAB_REMOVED";
export const REST_REMOVED = "REST_REMOVED";

const listDetailsFetched = (data) => {
  return {
    type: LIST_DETAILS_FETCHED,
    payload: data,
  };
};

const addRestaurantSuccess = (data) => {
  return {
    type: ADD_RESTAURANT_SUCCESS,
    payload: data,
  };
};

const collaboratorAdded = (data) => {
  return {
    type: COLLABORATOR_ADDED,
    payload: data,
  };
};

const markVisitedSuccess = (data) => {
  return {
    type: MARKED_VISITED,
    payload: data,
  };
};

const titleEdited = (data) => {
  return {
    type: TITLE_EDIT,
    payload: data,
  };
};

const collabRemoved = (id) => {
  return {
    type: COLLAB_REMOVED,
    payload: id,
  };
};

const restaurantRemoved = (id) => {
  return {
    type: REST_REMOVED,
    payload: id,
  };
};
// Get my lists details
export const fetchListDetails = (id) => async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const res = await axios.get(`${apiUrl}/mylists/${id}`);
    // console.log("list details", res.data);
    dispatch(listDetailsFetched(res.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
  }
};

//Add a restaurant to a list
export const addRestaurantToList =
  (id, name, photoReference, placeId, priceLevel, rating, history) =>
  async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const { token } = selectUser(getState());
      console.log("list id", id);
      const res = await axios.post(
        `${apiUrl}/mylists/${id}`,
        {
          name,
          photoReference,
          placeId,
          priceLevel,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("new restaurant", res.data);
      dispatch(addRestaurantSuccess(res.data));
      dispatch(
        showMessageWithTimeout("success", true, "Restaurant added!", 1500)
      );
      history.push(`/list/${id}`);
      dispatch(appDoneLoading());
    } catch (e) {
      if (e.response) {
        console.log("error:", e.response.data.message);
        dispatch(setMessage("danger", true, e.response.data.message));
        dispatch(appDoneLoading());
        history.push(`/restaurant/browse`);
      } else {
        console.log("error:", e.message);
        dispatch(setMessage("danger", true, e.message));
        dispatch(appDoneLoading());
        history.push(`/restaurant/browse`);
      }
      dispatch(appDoneLoading());
    }
  };

// Add a collaborator to my list
export const AddCollaboratorToList =
  (listId, userId, history) => async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const { token } = selectUser(getState());
      const res = await axios.get(`${apiUrl}/mylists/${listId}/add/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("which collaborator was added?", res.data);
      dispatch(collaboratorAdded(res.data));
      dispatch(
        showMessageWithTimeout(
          "success",
          true,
          "User added as a collaborator!",
          1500
        )
      );
      history.push(`/list/${listId}`);
      dispatch(appDoneLoading());
    } catch (e) {
      if (e.response) {
        console.log("error:", e.response.data.message);
        dispatch(setMessage("danger", true, e.response.data.message));
      } else {
        console.log("error:", e.message);
        dispatch(setMessage("danger", true, e.message));
      }
    }
  };

// mark a restaurant as visited on my list
export const markRestaurantVisited =
  (listId, restaurantId) => async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const res = await axios.patch(`${apiUrl}/restaurant/visited`, {
        listId,
        restaurantId,
      });
      dispatch(markVisitedSuccess(res.data));
      dispatch(appDoneLoading());
    } catch (e) {
      if (e.response) {
        console.log("error:", e.response.data.message);
        dispatch(setMessage("danger", true, e.response.data.message));
      } else {
        console.log("error:", e.message);
        dispatch(setMessage("danger", true, e.message));
      }
    }
  };

//Edit the title of my list
export const editListTitle = (listId, title) => async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const { token } = selectUser(getState());
    const res = await axios.patch(
      `${apiUrl}/mylists/${listId}`,
      {
        title,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(titleEdited(res.data));
    dispatch(appDoneLoading());
  } catch (e) {
    if (e.response) {
      console.log("error:", e.response.data.message);
      dispatch(setMessage("danger", true, e.response.data.message));
    } else {
      console.log("error:", e.message);
      dispatch(setMessage("danger", true, e.message));
    }
  }
};

//Remove a collaborator from my list
export const removeCollab =
  (listId, collabId) => async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const { token } = selectUser(getState());
      const res = await axios.delete(
        `${apiUrl}/mylists/${listId}/collaborator/${collabId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(collabRemoved(collabId));
      dispatch(appDoneLoading());
    } catch (e) {
      if (e.response) {
        console.log("error:", e.response.data.message);
        dispatch(setMessage("danger", true, e.response.data.message));
      } else {
        console.log("error:", e.message);
        dispatch(setMessage("danger", true, e.message));
      }
    }
  };

//Remove a restaurant from my list
export const removeRestaurant =
  (listId, restaurantId) => async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const { token } = selectUser(getState());
      const res = await axios.delete(
        `${apiUrl}/mylists/${listId}/restaurant/${restaurantId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(restaurantRemoved(restaurantId));
      dispatch(appDoneLoading());
    } catch (e) {
      if (e.response) {
        console.log("error:", e.response.data.message);
        dispatch(setMessage("danger", true, e.response.data.message));
      } else {
        console.log("error:", e.message);
        dispatch(setMessage("danger", true, e.message));
      }
    }
  };

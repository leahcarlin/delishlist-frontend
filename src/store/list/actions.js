import { appLoading, appDoneLoading } from "../appState/actions";
import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectListDetails } from "./selectors";

export const LIST_DETAILS_FETCHED = "LIST_DETAILS_FETCHED";
export const ADD_RESTAURANT_SUCCESS = "ADD_RESTAURANT_SUCCESS";

const listDetailsFetched = (data) => {
  console.log("list details fetched action creator");
  return {
    type: LIST_DETAILS_FETCHED,
    payload: data,
  };
};

const addRestaurantSuccess = (data) => {
  console.log("list add restaurant action creator");
  return {
    type: ADD_RESTAURANT_SUCCESS,
    payload: data,
  };
};

// Get my a lists details
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
  (listId, name, placeId) => async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      console.log("list id", listId);
      const res = await axios.post(`${apiUrl}/mylists/${listId}`, {
        name,
        placeId,
      });
      console.log("new res", res.data);
      dispatch(addRestaurantSuccess(res.data));
    } catch (e) {
      console.log(e.message);
    }
  };

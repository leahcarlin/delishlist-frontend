import { appLoading, appDoneLoading, setMessage } from "../appState/actions";
import { apiUrl } from "../../config/constants";
import axios from "axios";

export const REST_DETAILS_FETCHED = "REST_DETAILS_FETCHED";
export const SEARCH_COMPLETE = "SEARCH_COMPLETE";
export const ALL_RESTAURANTS = "ALL_RESTAURANTS";

const allRestaurantsFetched = (data) => {
  return {
    type: ALL_RESTAURANTS,
    payload: data,
  };
};

const restDetailsFetched = (data) => {
  return {
    type: REST_DETAILS_FETCHED,
    payload: data,
  };
};

const completeSearch = (data) => {
  return {
    type: SEARCH_COMPLETE,
    payload: data,
  };
};

// Get a list of all restaurants on all users lists (for Browse Restaurants Page)
export const fetchAllRestaurants = async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const res = await axios.get(`${apiUrl}/restaurant/browse`);
    dispatch(allRestaurantsFetched(res.data));
    dispatch(appDoneLoading());
  } catch (e) {
    if (e.response) {
      console.log("error:", e.response.data.message);
      dispatch(setMessage("danger", true, e.response.data.message));
    } else {
      console.log("error:", e.message);
      dispatch(setMessage("danger", true, e.message));
    }
    dispatch(appDoneLoading());
  }
};

// Get a restaurant's details by using its google placeId
export const fetchRestaurantDetails =
  (placeId) => async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const res = await axios.get(`${apiUrl}/restaurant/${placeId}`);
      // console.log("rest details", res.data.result);
      dispatch(restDetailsFetched(res.data.result));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };

// Search for a restaurant details by using its google places API
export const searchRestaurant = (name) => async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const res = await axios.post(`${apiUrl}/restaurant/search`, {
      name,
    });
    // console.log("search results", res.data.candidates);
    dispatch(completeSearch(res.data.candidates));
    dispatch(appDoneLoading());
  } catch (e) {
    if (e.response) {
      console.log("error:", e.response.data.message);
      dispatch(setMessage("danger", true, e.response.data.message));
    } else {
      console.log("error:", e.message);
      dispatch(setMessage("danger", true, e.message));
    }
    dispatch(appDoneLoading());
  }
};

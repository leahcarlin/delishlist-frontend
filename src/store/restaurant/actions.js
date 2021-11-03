import { appLoading, appDoneLoading } from "../appState/actions";
import { apiUrl } from "../../config/constants";
import axios from "axios";

export const REST_DETAILS_FETCHED = "LIST_DETAILS_FETCHED";

const restDetailsFetched = (data) => {
  return {
    type: REST_DETAILS_FETCHED,
    payload: data,
  };
};

// Get a restaurant's details by using its google placeId
export const fetchRestaurantDetails =
  (placeId) => async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const res = await axios.get(`${apiUrl}/restaurant/${placeId}`);
      console.log("rest details", res.data.result);
      dispatch(restDetailsFetched(res.data.result));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };

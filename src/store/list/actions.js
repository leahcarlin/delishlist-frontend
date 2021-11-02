import { appLoading, appDoneLoading } from "../appState/actions";
import { selectUser } from "../user/selectors";
import { apiUrl } from "../../config/constants";
import axios from "axios";

export const LIST_DETAILS_FETCHED = "LIST_DETAILS_FETCHED";

const listDetailsFetched = (data) => {
  return {
    type: LIST_DETAILS_FETCHED,
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

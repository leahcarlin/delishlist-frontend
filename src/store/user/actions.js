import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import { Next } from "react-bootstrap/esm/PageItem";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const MY_LISTS_FETCHED = "MY_LISTS_FETCHED";
export const NEW_LIST_SUCCESS = "NEW_LIST_SUCCESS";
export const SEARCH_COMPLETE = "SEARCH_COMPLETE";
export const FAVORITE_MARKED = "FAVORITE_MARKED";
export const FAVORITES_FETCHED = "FAVORITES_FETCHED";
export const DELETE_SUCCESS = "DELETE_SUCCESS";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

const myListsFetched = (data) => {
  return {
    type: MY_LISTS_FETCHED,
    payload: data,
  };
};

const newListSuccess = (data) => {
  return {
    type: NEW_LIST_SUCCESS,
    payload: data,
  };
};

const searchComplete = (data) => {
  return {
    type: SEARCH_COMPLETE,
    payload: data,
  };
};

const favoriteMarked = (data) => {
  return {
    type: FAVORITE_MARKED,
    payload: data,
  };
};

const favoritesFetched = (data) => {
  return {
    type: FAVORITES_FETCHED,
    payload: data,
  };
};

const deleteSuccess = (id) => {
  return {
    type: DELETE_SUCCESS,
    payload: id,
  };
};

export const signUp = (firstName, lastName, email, password, profileImg) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        firstName,
        lastName,
        email,
        password,
        profileImg,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

// Get my lists
export const fetchMyLists = async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const { token } = selectUser(getState());
    // console.log("token", token);
    const res = await axios.get(`${apiUrl}/mylists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("res data", res.data);
    dispatch(myListsFetched(res.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
  }
};

// Create (and be owner of) a new list
export const newList = (title) => async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const { token, id } = selectUser(getState());
    console.log("id", id);
    const res = await axios.post(
      `${apiUrl}/mylists`,
      {
        title,
        ownerId: id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("new list", res.data);
    dispatch(newListSuccess(res.data));
    dispatch(
      showMessageWithTimeout("success", true, "New list created!", 1500)
    );
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

// Search for a user
export const searchUser = (name) => async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const res = await axios.post(`${apiUrl}/user/search`, {
      name,
    });
    console.log("search data", res.data);
    dispatch(searchComplete(res.data));
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

// get my favorite retaurants list
export const getFavorites = async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const { token } = selectUser(getState());
    const res = await axios.get(`${apiUrl}/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(favoritesFetched(res.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
  }
};

// Mark restaurant as a favorite and add to your favorites list
export const markFavorite =
  (placeId, history) => async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const { id } = selectUser(getState());
      const res = await axios.post(`${apiUrl}/restaurant/${placeId}/favorite`, {
        userId: id,
      });
      dispatch(favoriteMarked(res.data));
      history.push(`/restaurant/favorites`);
      dispatch(appDoneLoading());
    } catch (e) {
      if (e.response) {
        console.log("error:", e.response.data.message);
        dispatch(
          showMessageWithTimeout("danger", true, e.response.data.message, 1500)
        );
        history.push(`/restaurant/favorites`);
        dispatch(appDoneLoading());
      } else {
        console.log("error:", e.message);
        dispatch(showMessageWithTimeout("danger", true, e.message, 1500));
        history.push(`/restaurant/${placeId}`);
        dispatch(appDoneLoading());
      }
    }
  };

// Remove restaurant from my favorites list
export const removeFavorite = (restaurantId) => async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const { token } = selectUser(getState());
    const res = await axios.delete(
      `${apiUrl}/restaurant/${restaurantId}/remove`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("fav deleted?", res.data);
    dispatch(deleteSuccess(restaurantId));
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

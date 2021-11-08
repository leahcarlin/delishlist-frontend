import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  MY_LISTS_FETCHED,
  NEW_LIST_SUCCESS,
  SEARCH_COMPLETE,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  email: null,
  myLists: null,
  searchResults: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case MY_LISTS_FETCHED:
      return {
        ...state,
        myLists: [...action.payload.lists],
      };
    case NEW_LIST_SUCCESS:
      return {
        ...state,
        myLists: [...state.myLists, action.payload],
      };
    case SEARCH_COMPLETE:
      return {
        ...state,
        searchResults: action.payload,
      };

    default:
      return state;
  }
}

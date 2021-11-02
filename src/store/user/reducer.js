import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  MY_LISTS_FETCHED,
  NEW_LIST_SUCCESS,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  myLists: null,
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
      console.log("action in reducer", action.payload);
      return {
        ...state,
        myLists: [...state.myLists, action.payload],
      };
    default:
      return state;
  }
}

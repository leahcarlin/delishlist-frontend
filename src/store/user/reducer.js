import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  MY_LISTS_FETCHED,
  NEW_LIST_SUCCESS,
<<<<<<< Updated upstream
=======
  SEARCH_COMPLETE,
  FAVORITE_MARKED,
>>>>>>> Stashed changes
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
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
      return {
        ...state,
        myLists: [...state.myLists, action.payload],
      };

<<<<<<< Updated upstream
=======
    case SEARCH_COMPLETE:
      return {
        ...state,
        searchResults: action.payload,
      };
    // case FAVORITE_MARKED:
    //   console.log("action in restaurant reducer", action.payload);
    //   return {
    //     ...state,
    //   };

>>>>>>> Stashed changes
    default:
      return state;
  }
}

import { REST_DETAILS_FETCHED, SEARCH_COMPLETE } from "./actions";

const initialState = {
  restaurantDetails: null,
  searchResults: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REST_DETAILS_FETCHED:
      return {
        ...state,
        restaurantDetails: action.payload,
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

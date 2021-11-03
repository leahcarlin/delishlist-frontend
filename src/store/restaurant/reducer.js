import { REST_DETAILS_FETCHED } from "./actions";

const initialState = {
  restaurantDetails: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REST_DETAILS_FETCHED:
      return {
        ...state,
        restaurantDetails: action.payload,
      };

    default:
      return state;
  }
}

import {
  ADD_RESTAURANT_SUCCESS,
  LIST_DETAILS_FETCHED,
  COLLABORATOR_ADDED,
} from "./actions";

const initialState = {
  listDetails: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_DETAILS_FETCHED:
      return {
        ...state,
        listDetails: action.payload,
      };

    case ADD_RESTAURANT_SUCCESS:
      return {
        ...state,
        listDetails: {
          ...state.listDetails,
          restaurants: [...state.listDetails.restaurants, action.payload],
        },
      };

    default:
      return state;
  }
}

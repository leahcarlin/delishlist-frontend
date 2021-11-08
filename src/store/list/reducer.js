import {
  ADD_RESTAURANT_SUCCESS,
  LIST_DETAILS_FETCHED,
  MARKED_VISITED,
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

    case MARKED_VISITED:
      // console.log("action in reducer", action.payload);
      return {
        ...state,
        listDetails: {
          ...state.listDetails,
          restaurants: state.listDetails.restaurants.map((res) =>
            res.id === action.payload.restaurantId
              ? {
                  ...res,
                  listRest: {
                    ...res.listRest,
                    visited: action.payload.visited,
                  },
                }
              : res
          ),
        },
      };

    default:
      return state;
  }
}

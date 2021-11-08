<<<<<<< Updated upstream
import { ADD_RESTAURANT_SUCCESS, LIST_DETAILS_FETCHED } from "./actions";
=======
import {
  ADD_RESTAURANT_SUCCESS,
  LIST_DETAILS_FETCHED,
  MARKED_VISITED,
  FAVORITES_FETCHED,
} from "./actions";
>>>>>>> Stashed changes

const initialState = {
  listDetails: null,
  favorites: null,
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

<<<<<<< Updated upstream
=======
    case MARKED_VISITED:
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
    case FAVORITES_FETCHED:
      console.log("action in reducer?", action.payload);
      return {
        ...state,
        favorites: action.payload.restaurants.map((res) => {
          return { ...res.userRests };
        }),
      };

>>>>>>> Stashed changes
    default:
      return state;
  }
}

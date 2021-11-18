import {
  ADD_RESTAURANT_SUCCESS,
  COLLAB_REMOVED,
  LIST_DETAILS_FETCHED,
  MARKED_VISITED,
  REST_REMOVED,
  TITLE_EDIT,
  DELETE_LIST,
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
    case TITLE_EDIT:
      return {
        ...state,
        listDetails: action.payload,
      };

    case COLLAB_REMOVED:
      return {
        ...state,
        listDetails: {
          ...state.listDetails,
          users: state.listDetails.users.filter(
            (user) => user.id !== action.payload
          ),
        },
      };

    case REST_REMOVED:
      return {
        ...state,
        listDetails: {
          ...state.listDetails,
          restaurants: state.listDetails.restaurants.filter(
            (res) => res.id !== action.payload
          ),
        },
      };

    case DELETE_LIST:
      return {
        ...state,
        listDetails: null,
      };
    default:
      return state;
  }
}

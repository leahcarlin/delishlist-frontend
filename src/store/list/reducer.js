import { LIST_DETAILS_FETCHED } from "./actions";

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

    default:
      return state;
  }
}

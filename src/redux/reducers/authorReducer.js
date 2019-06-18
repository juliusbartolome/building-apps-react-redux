import * as authorActionTypes from "../actions/authorActionTypes";

export default function authorReducer(state = [], action) {
  switch (action.type) {
    case authorActionTypes.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}

import * as authorActionTypes from "./authorActionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall } from "../../redux/actions/apiStatusActions";

export function loadAuthorSuccess(authors) {
  return {
    type: authorActionTypes.LOAD_AUTHORS_SUCCESS,
    authors
  };
}

export const loadAuthors = () => dispatch => {
  dispatch(beginApiCall());
  return authorApi
    .getAuthors()
    .then(authors => {
      dispatch(loadAuthorSuccess(authors));
    })
    .catch(error => {
      throw error;
    });
};

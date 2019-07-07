import * as apiStatusActionTypes from "../actions/apiStatusActionTypes";
import initialState from "./initialState";

function actionTypeEndInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === apiStatusActionTypes.BEGIN_API_CALL) {
    return state + 1;
  } else if (actionTypeEndInSuccess(action.type)) {
    return state - 1;
  }

  return state;
}

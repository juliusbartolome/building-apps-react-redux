import * as apiStatusActionTypes from "./apiStatusActionTypes";

export function beginApiCall() {
  return { type: apiStatusActionTypes.BEGIN_API_CALL };
}

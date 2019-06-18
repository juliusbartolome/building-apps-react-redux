import * as courseActionTypes from "../actions/courseActionTypes";
import initialState from "./initialState";

export default function createCourse(state = initialState.courses, action) {
  switch (action.type) {
    case courseActionTypes.CREATE_COURSE:
      return [...state, { ...action.course }];
    case courseActionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}

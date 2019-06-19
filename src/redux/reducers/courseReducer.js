import * as courseActionTypes from "../actions/courseActionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case courseActionTypes.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case courseActionTypes.UPDATE_COURSE_SUCCESS:
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );
    case courseActionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}

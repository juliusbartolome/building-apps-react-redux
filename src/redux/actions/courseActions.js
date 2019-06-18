import * as courseActionTypes from "./courseActionTypes";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  return {
    type: courseActionTypes.CREATE_COURSE,
    course
  };
}

export function loadCoursesSuccess(courses) {
  return {
    type: courseActionTypes.LOAD_COURSES_SUCCESS,
    courses
  };
}

export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

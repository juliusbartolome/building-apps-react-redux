import * as courseActionTypes from "./courseActionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall } from "../actions/apiStatusActions";

export const loadCoursesSuccess = courses => ({
  type: courseActionTypes.LOAD_COURSES_SUCCESS,
  courses
});

export const createCourseSuccess = course => ({
  type: courseActionTypes.CREATE_COURSE_SUCCESS,
  course
});

export const updateCourseSuccess = course => ({
  type: courseActionTypes.UPDATE_COURSE_SUCCESS,
  course
});

export const loadCourses = () => dispatch => {
  dispatch(beginApiCall());
  return courseApi
    .getCourses()
    .then(courses => {
      setTimeout(() => {
        dispatch(loadCoursesSuccess(courses));
      }, 1000);
    })
    .catch(error => {
      throw error;
    });
};

export const saveCourse = course => dispatch => {
  dispatch(beginApiCall());
  return courseApi.saveCourse(course).then(savedCourse => {
    setTimeout(() => {
      course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    }, 1000);
  });
};

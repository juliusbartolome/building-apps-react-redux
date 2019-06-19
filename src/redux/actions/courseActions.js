import * as courseActionTypes from "./courseActionTypes";
import * as courseApi from "../../api/courseApi";

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

export const loadCourses = () => dispatch =>
  courseApi
    .getCourses()
    .then(courses => {
      dispatch(loadCoursesSuccess(courses));
    })
    .catch(error => {
      throw error;
    });

export const saveCourse = course => dispatch =>
  courseApi.saveCourse(course).then(savedCourse => {
    course.id
      ? dispatch(updateCourseSuccess(savedCourse))
      : dispatch(createCourseSuccess(savedCourse));
  });

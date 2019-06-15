import { CREATE_COURSE } from "./courseActionTypes";

export function createCourse(course) {
  return {
    type: CREATE_COURSE,
    course
  };
}

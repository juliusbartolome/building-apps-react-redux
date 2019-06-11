import { CREATE_COURSE } from "../actions/actionTypes";

export default function createCourse(state = [], action) {
  switch (action.type) {
    case CREATE_COURSE:
      return [...state, { ...action.course }];
    default:
      return state;
  }
}

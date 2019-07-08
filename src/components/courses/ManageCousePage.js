import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { newCourse } from "../../../tools/mockData";
import { loadAuthors } from "../../redux/actions/authorActions";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";

const ManageCousePage = ({
  authors,
  courses,
  loadAuthors,
  loadCourses,
  saveCourse,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors] = useState();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert(`Loading courses failed ${error}`);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert(`Loading authors failed ${error}`);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();

    setSaving(true);
    saveCourse(course).then(() => props.history.push("/courses"));
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

ManageCousePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    course,
    authors: state.authors,
    courses: state.courses
  };
};

const mapDispatchToProps = {
  loadAuthors,
  loadCourses,
  saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCousePage);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { newCourse } from "../../../tools/mockData";
import { loadAuthors } from "../../redux/actions/authorActions";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import CourseForm from "./CourseForm";

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

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert(`Loading courses failed ${error}`);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert(`Loading authors failed ${error}`);
      });
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log("handleSave", course);
    saveCourse(course);
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
};

ManageCousePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authors: state.authors,
  courses: state.courses,
  course: newCourse
});

const mapDispatchToProps = {
  loadAuthors,
  loadCourses,
  saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCousePage);

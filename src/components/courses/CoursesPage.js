import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import Spinner from "../common/Spinner";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed " + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed " + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        {this.props.apiCallsInProgress > 0 && <Spinner />}
        {this.props.apiCallsInProgress === 0 && (
          <Link
            style={{ marginBottom: "20px" }}
            to={`/course/`}
            className="btn btn-primary float-right add-course"
          >
            Add Course
          </Link>
        )}
        {this.props.apiCallsInProgress === 0 && (
          <CourseList courses={this.props.courses} />
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  apiCallsInProgress: PropTypes.number.isRequired
};

function mapsStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              author: state.authors.find(a => a.id === course.authorId)
            };
          }),
    authors: state.authors,
    apiCallsInProgress: state.apiCallsInProgress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(CoursesPage);

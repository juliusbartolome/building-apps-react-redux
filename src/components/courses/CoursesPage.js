import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as courseActions from "../../redux/actions/courseActions";
import { bindActionCreators } from "redux";
class CoursesPage extends React.Component {
  render() {
    return (
      <>
        <h2>Courses</h2>

        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

function mapsStateToProps(state) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(CoursesPage);

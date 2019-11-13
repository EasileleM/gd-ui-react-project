import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ErrorPage.scss"

class ErrorPage extends Component {
  render() {
    console.log(this.props.error,'errpage')
    return (
      <div className="error-page">
        <h1 className="error-page__header">{this.props.error}</h1>
        <p className="error-page__paragraph">Page you're looking for is nowhere to be found.</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.errorHandler.errorCode,
  }
};
export default connect(mapStateToProps)(ErrorPage);
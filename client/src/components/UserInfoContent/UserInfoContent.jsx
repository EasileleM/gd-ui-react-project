import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { logout } from '../../redux/action-creators/user/logout';

import './UserInfoContent.scss';

export class UserInfoContent extends React.Component {
  handleOnLogout() {
    this.props.logout();
  }

  render() {
    return (
      <div className="user-info-content">
        <button onClick={() => this.handleOnLogout()} className="user-info-content__logout-button">{this.props.t('logout')}</button>
        <p className="user-info-content__greetings">{`${this.props.t('welcome')}, ${this.props.firstName}!`}</p>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    firstName: state.userController.firstName
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserInfoContent));

import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { closeModalWindow } from '../../redux/action-creators/modalWindow-action-creator';

import notificationSuccess from '../../utils/notificationSuccess';

import { logout as logoutThunk} from '../../redux/thunks/logout';

import { logout } from '../../utils/logout';

import './UserInfoContent.scss';

export class UserInfoContent extends React.Component {
  handleOnLogout() {
    logout()
      .then(() => {
        this.props.logout();
        this.props.close();
        notificationSuccess('Вы успешно вышли со своего профиля!', 'Logout successfully', '');
      })
      .catch(() => {
        notificationSuccess('Упс!', 'Woops!', '');
      });
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
    logout: () => dispatch(logoutThunk()),
    close: () => dispatch(closeModalWindow())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserInfoContent));

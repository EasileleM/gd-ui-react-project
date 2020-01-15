import React from 'react';
import { connect } from 'react-redux';
import UserIcon  from "../../../assets/user.svg";
import { changeModalWindowContent } from '../../../redux/action-creators/modalWindow/actions';

export class UserButton extends React.Component {
  render() {
    let currentWindow = this.props.isAuthorized ? 'userInfo' : 'loginWindowContent';
    return (
      <div>
        <UserIcon onClick={() => this.props.openUserWindow(currentWindow)} className="header__icon header__icon_big header__icon_user" tabIndex="8" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.userController.isAuthorized
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openUserWindow: (currentWindow) => dispatch(changeModalWindowContent(currentWindow))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserButton);

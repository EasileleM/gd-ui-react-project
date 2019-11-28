import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as UserIcon } from "../../../assets/user.svg";
import store from '../../../redux/store';
import { changeModalWindowContent } from '../../../redux/action-creators/modalWindow-action-creator';

export class UserButton extends React.Component {
  render() {
    let currentWindow = this.props.isAuthorized ? 'userInfo' : 'loginWindowContent';
    return (
      <div>
        <UserIcon onClick={() => store.dispatch(changeModalWindowContent(currentWindow))} className="header__icon header__icon_big header__icon_user" tabIndex="8" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.userController.isAuthorized
  }
};

export default connect(mapStateToProps)(UserButton);

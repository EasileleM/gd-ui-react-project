import React from 'react';
import './main.scss';
import '../../style/main.scss';

class Popups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      popupsArr: [],
    };
  }

  addPopUp(text = 'Success', errorCode = 0) {
    let color = {backgroundColor: "#ff5912"};

    if (errorCode >= 200 && errorCode < 300) {
      color = {backgroundColor: "#2fd967"};
    }

    if (errorCode >= 500 && errorCode < 600) {
      color = {backgroundColor: "#ff0000"};
    }

    const popup = (
      <div className="popup__item popup__item_animation" style={color} key={errorCode}>
        <span className="popup__text">
          {text}
        </span>
      </div>
    );

    this.setState({
      popupsArr: [...this.state.popupsArr, popup],
    });

    setTimeout(() => {
      this.state.popupsArr.shift();
      this.setState({
        popupsArr: [...this.state.popupsArr],
      });
    }, 10000);
  }

  render() {
    return (
      <div className="popup">
        {this.state.popupsArr}
      </div>
    );
  }
};

export default Popups;
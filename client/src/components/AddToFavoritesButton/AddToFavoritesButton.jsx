import React from 'react';
import FavoritesIcon from "../../assets/likeDisabled.svg";
import FavoritesIconEnabled from "../../assets/likeEnabled.svg";

import './AddToFavoritesButton.scss';

import {addItem} from '../../redux/action-creators/favorites/addItem';
import {removeItem} from '../../redux/action-creators/favorites/removeItem';
import {changeModalWindowContent} from '../../redux/action-creators/modalWindow/actions';
import {connect} from "react-redux";


export class AddToFavoritesButton extends React.Component {
  state = {
    enabled: this.props.enabled || false
  };

  componentDidUpdate(props, state) {
    if (this.props.enabled !== state.enabled) {
      this.setState({enabled: this.props.enabled});
    }
  }

  handleOnClick() {
    if (this.props.openFavorites) {
      this.props.changeModalWindowContent('favorites');
      return;
    }
    if (this.state.enabled) {
      this.props.removeItem(this.props.data);
    } else {
      this.props.addItem(this.props.data);
    }
    this.setState({enabled: !this.state.enabled});
  }

  render() {
    return (
        <button
            onClick={() => this.handleOnClick()}
            className={"addToFavoritesButton" + (this.props.paddings ? ` addToFavoritesButton_paddings` : ``)}>
          {
            this.state.enabled ?
                <FavoritesIconEnabled className={"addToFavoritesButton"}/> :
                <FavoritesIcon
                    className={"addToFavoritesButton" + (this.props.small ? ` addToFavoritesButton_small` : ``)}/>
          }
        </button>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeModalWindowContent: (content) => dispatch(changeModalWindowContent(content)),
    removeItem: (item) => dispatch(removeItem(item)),
    addItem: (item) => dispatch(addItem(item))
  }
};
export default connect(null, mapDispatchToProps)(AddToFavoritesButton);

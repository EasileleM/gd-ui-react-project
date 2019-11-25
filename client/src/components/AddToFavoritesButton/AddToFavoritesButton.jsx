import React from 'react';

import './AddToFavoritesButton.scss';
import {connect} from 'react-redux';
import store from '../../redux/store';
import addItem from '../../redux/thunks/favorites/addItem';
import removeItem from '../../redux/thunks/favorites/removeItem';
import {openFavorites} from '../../redux/action-creators/favorites-action-creator';
import {ReactComponent as FavoritesIcon} from "../../assets/likeDisabled.svg";
import {ReactComponent as FavoritesIconEnabled} from "../../assets/likeEnabled.svg";

export class AddToFavoritesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: props.enabled || false
    }
  }

  componentDidMount() {}

  componentDidUpdate(props, state) {
    if (this.props.enabled !== state.enabled) {
      this.setState({enabled: this.props.enabled});
    }
  }

  handleOnClick() {
    if (this.props.openFavorites) {
      store.dispatch(openFavorites());
      return;
    }
    if (this.state.enabled) {
      store.dispatch(removeItem(this.props.data));
    } else {
      store.dispatch(addItem(this.props.data));
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
                <FavoritesIcon className={"addToFavoritesButton" + (this.props.small ? ` addToFavoritesButton_small` : ``)}/>
          }
        </button>
    )
  }
}

export default AddToFavoritesButton;

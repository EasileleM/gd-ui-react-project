import React from 'react';

import './AddToFavoritesButton.scss';
import {connect} from 'react-redux';
import store from '../../store';
import addItem from '../../utils/favorites/addItem';
import removeItem from '../../utils/favorites/removeItem';
import {openFavorites} from '../../store/favourites/favourites-actions/favorites-action-creator';
import {ReactComponent as FavoritesIcon} from "../../assets/likeDisabled.svg"
import {ReactComponent as FavoritesIconEnabled} from "../../assets/likeEnabled.svg"

export class AddToFavoritesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: props.enabled || false
    }
  }

  componentDidMount() {}

  handleOnClick() {
    if (this.props.openFavorites) {
      store.dispatch(openFavorites());
      return;
    }
    if (this.state.enabled) {
      store.dispatch(removeItem(store.getState(), this.props.data));
    } else {
      store.dispatch(addItem(store.getState(), this.props.data));
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

const mapStateToProps = (state) => {
  return {
    items: state.favoritesController.items
  }
};
export default connect(mapStateToProps)(AddToFavoritesButton);

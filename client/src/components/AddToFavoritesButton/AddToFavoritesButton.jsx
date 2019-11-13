import React from 'react';

import './AddToFavoritesButton.scss';
import { connect } from 'react-redux';
import store from '../../store';
import addItem from '../../utils/favorites/addItem';
import removeItem from '../../utils/favorites/removeItem';
import { openFavorites } from '../../action-creators/favorites-action-creator';

class AddToFavoritesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false
    }
  }

  handleOnClick() {
    if (this.props.openFavorites) {
      store.dispatch(openFavorites());
      return;
    }
    if (this.state.enabled) {
      store.dispatch(removeItem(store.getState(), this.props.data));
    }
    else {
      store.dispatch(addItem(store.getState(), this.props.data));
    }
    this.setState({ enabled: !this.state.enabled });
  }

  render() {
    return (
      <button
        onClick={() => this.handleOnClick()}
        className={`addToFavoritesButton`
          + ((this.props.openFavorites || this.state.enabled) ? ` addToFavoritesButton_enabled` :
            ` addToFavoritesButton_disabled`)
          + (this.props.paddings ? ` addToFavoritesButton_paddings` : ``)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.favoritesController.items
  }
};
export default connect(mapStateToProps)(AddToFavoritesButton);

import { favoritesReducer, initialState } from '../favoritesReducer';
import * as favoritesActionCreators from '../action-creators/favorites-action-creator';

describe('Favorites reducer', () => {
  describe('FAVORITES_ACTION.OPEN', () => {
    it('FAVORITES_ACTION.OPEN should not open favorites in initial state', () => {
      expect(favoritesReducer(initialState, favoritesActionCreators.openFavorites())).toEqual({
        ...initialState,
        opened: false
      });
    });
    it('FAVORITES_ACTION.OPEN should open favorites after successful loading more that 0 item', () => {
      const previousState = {
        ...initialState,
        loading: false,
        size: 1
      };
      expect(favoritesReducer(previousState, favoritesActionCreators.openFavorites())).toEqual({
        ...previousState,
        opened: true
      });
    });
    it('FAVORITES_ACTION.OPEN should not open favorites after failed loading', () => {
      const previousState = {
        ...initialState,
        failure: true,
      };
      expect(favoritesReducer(previousState, favoritesActionCreators.openFavorites())).toEqual({
        ...previousState,
        opened: false
      });
    });
    it('FAVORITES_ACTION.OPEN should not open favorites while loading', () => {
      const previousState = {
        ...initialState,
        loading: true
      };
      expect(favoritesReducer(previousState, favoritesActionCreators.openFavorites())).toEqual({
        ...previousState,
        opened: false
      });
    });
  });

  describe('FAVORITES_ACTION.CLOSE', () => {
    it('FAVORITES_ACTION.CLOSE should close favorites', () => {
      const previousState = {
        ...initialState,
        opened: true
      };
      expect(favoritesReducer(previousState, favoritesActionCreators.closeFavorites())).toEqual({
        ...previousState,
        opened: false
      });
    });
  });

  describe('FAVORITES_ACTION.UPDATE_ITEMS', () => {
    it('FAVORITES_ACTION.UPDATE_ITEMS should update items', () => {
      const mockItems = [1, 2, 3];
      const previousState = {
        ...initialState,
        items: [4, 1],
        size: 2,
        opened: true
      };
      expect(favoritesReducer(previousState, favoritesActionCreators.updateItems(mockItems))).toEqual({
        ...previousState,
        items: mockItems,
        size: mockItems.length,
        opened: true
      });
    });

    it('FAVORITES_ACTION.UPDATE_ITEMS should update favorites opened state', () => {
      const mockItems = [];
      const previousState = {
        ...initialState,
        items: [1, 2],
        size: 2,
        opened: true
      };
      expect(favoritesReducer(previousState, favoritesActionCreators.updateItems(mockItems))).toEqual({
        ...previousState,
        items: mockItems,
        size: mockItems.length,
        opened: false
      });
    });
  });

  describe('FAVORITES_ACTION.FETCH_BEGIN', () => {
    it('FAVORITES_ACTION.FETCH_BEGIN should start loading', () => {
      expect(favoritesReducer(initialState, favoritesActionCreators.fetchItemsBegin())).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe('FAVORITES_ACTION.FETCH_SUCCESS', () => {
    it('FAVORITES_ACTION.FETCH_SUCCESS should set loaded items', () => {
      const mockItems = [1, 2, 3]
      expect(favoritesReducer(initialState, favoritesActionCreators.fetchItemsSuccess(mockItems, mockItems.length, 650))).toEqual({
        ...initialState,
        items: mockItems,
        size: mockItems.length
      });
    });
  });

  describe('FAVORITES_ACTION.FETCH_FAILURE', () => {
    it('FAVORITES_ACTION.FETCH_FAILURE should set up error flag', () => {
      expect(favoritesReducer(initialState, favoritesActionCreators.fetchItemsFailure())).toEqual({
        ...initialState,
        failure: true
      });
    });
  });

  describe('Unknown action', () => {
    it('Unknown action should do nothing', () => {
      expect(favoritesReducer(initialState, { type: 'weird' })).toEqual({
        ...initialState
      });
    });
  });
});
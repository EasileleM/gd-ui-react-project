import { filterReducer, initialState } from './filterReducer';
import * as filterActionCreator from '../action-creators/filter-action-creator';

describe('Filter reducer', () => {
  it('FILTER_ACTIONS.BRANDS should add brands', () => {
    const items = [1, 2, 4];
    expect(filterReducer(initialState, filterActionCreator.changeBrandsFilter(items))).toEqual({
      ...initialState,
      brands: items
    })
  });

  it('FILTER_ACTIONS.CATEGORY should change category', () => {
    const item = 'Yes';
    expect(filterReducer(initialState, filterActionCreator.changeCategoryFilter(item))).toEqual({
      ...initialState,
      category: item
    })
  });

  it('FILTER_ACTIONS.SIZES should add brands', () => {
    const items = [1, 2, 4];
    expect(filterReducer(initialState, filterActionCreator.changeSizeFilter(items))).toEqual({
      ...initialState,
      sizes: items
    })
  });

  it('FILTER_ACTIONS.MAXPRICE should change maxprice', () => {
    const item = 'Yes';
    expect(filterReducer(initialState, filterActionCreator.changeMaxPriceFilter(item))).toEqual({
      ...initialState,
      maxPrice: item
    })
  });

  it('FILTER_ACTIONS.MINPRICE should change minPrice', () => {
    const item = 'Yes';
    expect(filterReducer(initialState, filterActionCreator.changeMinPriceFilter(item))).toEqual({
      ...initialState,
      minPrice: item
    })
  });

  describe('Unknown action', () => {
    it('Unknown action should do nothing', () => {
      expect(filterReducer(initialState, { type: 'weird' })).toEqual({
        ...initialState
      });
    });
  });
});

import * as errorActionCreators from '../action-creators/error-action-creator';
import { errorReducer, initialState } from '../errorReducer';

describe('Error reducer', () => {
  describe('ERROR_ACTIONS', () => {
    it('Any ERROR_ACTIONS should set an errorCode', () => {
      expect(errorReducer(initialState, errorActionCreators.error400())).toEqual({
        ...initialState,
        errorCode: 400
      });
      expect(errorReducer(initialState, errorActionCreators.error404())).toEqual({
        ...initialState,
        errorCode: 404
      });
      expect(errorReducer(initialState, errorActionCreators.error500())).toEqual({
        ...initialState,
        errorCode: 500
      });
    });
  });
  describe('Unknown action', () => {
    it('Unknown action should do nothing', () => {
      expect(errorReducer(initialState, { type: 'weird' })).toEqual({
        ...initialState
      });
    });
  });
});

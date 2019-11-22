import React from 'react';
import { mount } from 'enzyme';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Item } from '../Item.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { closeFavorites } from '../../../../store/favourites/favourites-actions/favorites-action-creator';
import store from '../../../../store';
import * as removeItem from '../../../../utils/favorites/removeItem';

configure({ adapter: new Adapter() });

describe('<Item />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    const data = { color: 1, images: 1, sizes: 1 };
    sandbox.spy(Item.prototype, 'componentDidMount');
    const wrapper = mount(<Router><Item data={data} t={key => key} /></Router>);
    expect(Item.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('onClick dispatch works correctly', () => {
    const data = { _id: 1, color: 1, images: 1, sizes: 1 };
    const wrapper = mount(<Router><Item data={data} t={key => key} /></Router>);
    const spyDispatch = sandbox.spy(store, 'dispatch');
    wrapper.find('.favorites-window-item__image').simulate('click');
    assert(spyDispatch.calledWith(closeFavorites()));
    wrapper.find('.favorites-window-item__name').simulate('click');
    assert(spyDispatch.calledWith(closeFavorites()));
    wrapper.find('.favorites-window-item__description').simulate('click');
    assert(spyDispatch.calledWith(closeFavorites()));
  });
}); 

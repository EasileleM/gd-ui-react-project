import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Item } from '../Item.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../../../store';
import { closeCart } from '../../../../store/cart/cart-actions/cart-action-creator';


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
    const data = { generalData: { color: 1, images: 1, sizes: 1 } };
    sandbox.spy(Item.prototype, 'componentDidMount');
    const wrapper = mount(<Router><Item data={data} t={key => key} /></Router>);
    expect(Item.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('onClick dispatch works correctly', () => {
    const data = { generalData: { color: 1, images: 1, sizes: 1 } };
    const wrapper = mount(<Router><Item data={data} t={key => key} /></Router>);
    const spyDispatch = sandbox.spy(store, 'dispatch');
    wrapper.find('.cart-window-item__image').simulate('click');
    assert(spyDispatch.calledWith(closeCart()));
    wrapper.find('.cart-window-item__name').simulate('click');
    assert(spyDispatch.calledWith(closeCart()));
    wrapper.find('.cart-window-item__description').simulate('click');
    assert(spyDispatch.calledWith(closeCart()));
  });

  it('onClick dispatch works correctly', () => {
    const data = { generalData: { color: 1, images: 1, sizes: 1 } };
    const wrapper = mount(<Router><Item data={data} t={key => key} /></Router>);
    const spyDispatch = sandbox.spy(store, 'dispatch');
    wrapper.find('.cart-window-item__image').simulate('click');
    assert(spyDispatch.calledWith(closeCart()));
  });

  it('increment amount of items if it is < 99', () => {
    sandbox.spy(Item.prototype, 'handleOnClickIncrement');
    const data = { generalData: { color: 1, images: 1, sizes: 1 }, amount: 1 };
    const wrapper = mount(<Router><Item data={data} t={key => key} /></Router>);
    const spyDispatch = sandbox.spy(store, 'dispatch');
    wrapper.find('.cart-window-item__item-controls-amount-button').at(0).simulate('click');
    expect(Item.prototype.handleOnClickIncrement).to.have.property('callCount', 1);
  });

  it('doesn\'t increment amount of items if it is >= 99', () => {
    sandbox.spy(Item.prototype, 'handleOnClickIncrement');
    const data = { generalData: { color: 1, images: 1, sizes: 1 }, amount: 99};
    const wrapper = mount(<Router><Item data={data} t={key => key} /></Router>);
    const spyDispatch = sandbox.spy(store, 'dispatch');
    wrapper.find('.cart-window-item__item-controls-amount-button').at(0).simulate('click');
    expect(Item.prototype.handleOnClickIncrement).to.have.property('callCount', 1);
  });

  it('decrement amount of items if it is > 1', () => {
    sandbox.spy(Item.prototype, 'handleOnClickDecrement');
    const data = { generalData: { color: 1, images: 1, sizes: 1 }, amount: 2 };
    const wrapper = mount(<Router><Item data={data} t={key => key} /></Router>);
    const spyDispatch = sandbox.spy(store, 'dispatch');
    wrapper.find('.cart-window-item__item-controls-amount-button').at(1).simulate('click');
    expect(Item.prototype.handleOnClickDecrement).to.have.property('callCount', 1);
  });

  it('doesn\'t decrement amount of items if it is <= 1', () => {
    sandbox.spy(Item.prototype, 'handleOnClickDecrement');
    const data = { generalData: { color: 1, images: 1, sizes: 1 }, amount: 1};
    const wrapper = mount(<Router><Item data={data} t={key => key} /></Router>);
    const spyDispatch = sandbox.spy(store, 'dispatch');
    wrapper.find('.cart-window-item__item-controls-amount-button').at(1).simulate('click');
    expect(Item.prototype.handleOnClickDecrement).to.have.property('callCount', 1);
  });
}); 

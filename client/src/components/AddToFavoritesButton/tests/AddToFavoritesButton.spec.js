import React from 'react';
import { mount, simulate, setProps } from 'enzyme';
import store from '../../../store';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AddToFavoritesButton } from '../AddToFavoritesButton.jsx';
import {openFavorites} from '../../../action-creators/favorites-action-creator';

configure({ adapter: new Adapter() });

describe('<AddToFavoritesButton />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(AddToFavoritesButton.prototype, 'componentDidMount');
    const wrapper = mount(<AddToFavoritesButton t={key => key} />);
    expect(AddToFavoritesButton.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('set default prop and change it onclick', () => {
    const data = { _id: 1 };
    const wrapper = mount(<AddToFavoritesButton data={data} t={key => key} />);
    sandbox.stub(store, 'dispatch').callsFake(() => {});
    wrapper.simulate('click');
    expect(wrapper.state().enabled).to.be.true;
  });

  it('set passed prop and change it onclick', () => {
    const data = { _id: 1 };
    const wrapper = mount(<AddToFavoritesButton enabled={true} data={data} t={key => key} />);
    sandbox.stub(store, 'dispatch').callsFake(() => {});
    wrapper.simulate('click');
    expect(wrapper.state().enabled).to.be.false;
  });

  it('implements openFavorites logic correctly', () => {
    const data = { _id: 1 };
    const wrapper = mount(<AddToFavoritesButton openFavorites={true} enabled={true} data={data} t={key => key} />);
    const spy = sandbox.spy(store, 'dispatch');
    wrapper.simulate('click');
    assert(spy.calledWith(openFavorites()))
  });
}); 

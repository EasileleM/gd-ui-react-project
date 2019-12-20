import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AddToFavoritesButton } from './AddToFavoritesButton.jsx';

configure({ adapter: new Adapter() });

describe('<AddToFavoritesButton />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should add item', () => {
    const data = { _id: 1 };
    const spy = sinon.spy();
    const wrapper = mount(<AddToFavoritesButton addItem={spy} data={data} t={key => key} />);
    wrapper.simulate('click');
    expect(spy).to.have.property('callCount', 1);
  });

  it('should remove item', () => {
    const data = { _id: 1 };
    const spy = sinon.spy();
    const wrapper = mount(<AddToFavoritesButton enabled={true} removeItem={spy} data={data} t={key => key} />);
    wrapper.simulate('click');
    expect(spy).to.have.property('callCount', 1);
  });

  it('should open favorites', () => {
    const data = { _id: 1 };
    const spy = sinon.spy();
    const wrapper = mount(<AddToFavoritesButton openFavorites={true} changeModalWindowContent={spy} data={data} t={key => key} />);
    wrapper.simulate('click');
    expect(spy).to.have.property('callCount', 1);
  });
}); 

import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddToCartButton from './AddToCartButton';
import store from "../../redux/store";
import {Chooser} from "../Product/ProductInfo/Chooser/Chooser";

configure({adapter: new Adapter()});

describe('<AddToCartButton />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should call store', () => {
    sandbox.stub(store, 'dispatch');
    const wrapper = shallow(<AddToCartButton  />);
    wrapper.find('button').simulate('click');
    expect(store.dispatch).to.have.property('callCount', 1);
  });

});

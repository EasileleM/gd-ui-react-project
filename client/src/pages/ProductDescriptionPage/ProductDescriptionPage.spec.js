import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import ProductDescriptionPage from './ProductDescriptionPage';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";


configure({adapter: new Adapter()});


describe('<ProductDescriptionPage />', () => {
  const flushPromises = () => new Promise(setImmediate);
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(ProductDescriptionPage.prototype, 'componentDidMount');
    const wrapper = shallow(<ProductDescriptionPage match={{params: {id: 1}}} t={key => key}/>);
    expect(ProductDescriptionPage.prototype.componentDidMount).to.have.property('callCount', 1);
  });

});
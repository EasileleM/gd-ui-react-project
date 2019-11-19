import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {RelatedProductsBlock} from './RelatedProductsBlock';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";


configure({adapter: new Adapter()});


describe('<RelatedProductsBlock />', () => {
  const flushPromises = () => new Promise(setImmediate);
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(RelatedProductsBlock.prototype, 'componentDidMount');
    const wrapper = shallow(<RelatedProductsBlock id={1} t={key => key}/>);
    expect(RelatedProductsBlock.prototype.componentDidMount).to.have.property('callCount', 1);
  });

});
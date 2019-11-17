import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {ProductImages} from './ProductImages';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});


describe('<ProductImages />', () => {

  const fakeItemImages = ["https://i.imgur.com/ZAyNrLX.jpg","https://i.imgur.com/6wisujq.png","https://i.imgur.com/tRw6xJj.jpg"];
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(ProductImages.prototype, 'componentDidMount');
    const wrapper = shallow(<ProductImages images={fakeItemImages} t={key => key}/>);
    expect(ProductImages.prototype.componentDidMount).to.have.property('callCount', 1);
  });
});
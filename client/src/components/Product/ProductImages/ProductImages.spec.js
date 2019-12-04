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

  it('should not change index', () => {
    sandbox.spy(ProductImages.prototype, 'componentDidMount');
    const wrapper = shallow(<ProductImages images={fakeItemImages} t={key => key}/>);
    const initialIndex = wrapper.state().currentIndex;
    wrapper.instance().setIndex(4);
    expect(wrapper.state().currentIndex).to.equal(initialIndex);
  });

  it('should change index', () => {
    sandbox.spy(ProductImages.prototype, 'componentDidMount');
    const wrapper = shallow(<ProductImages images={fakeItemImages} t={key => key}/>);
    const newIndex = 2;
    wrapper.instance().setIndex(newIndex);
    expect(wrapper.state().currentIndex).to.equal(newIndex);
  });

  it('should reset index', () => {
    sandbox.spy(ProductImages.prototype, 'componentDidMount');
    const wrapper = shallow(<ProductImages images={fakeItemImages} t={key => key}/>);
    const newFakeItemImages = [...fakeItemImages, fakeItemImages[0]];
    wrapper.instance().setIndex(2);
    wrapper.setProps({images: newFakeItemImages});
    expect(wrapper.state().currentIndex).to.equal(0);
  });
});
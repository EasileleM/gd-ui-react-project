import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {ProductInfo} from './ProductInfo';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});


describe('<ProductInfo />', () => {

  const fakeItem = {"_id":"5db895dc5ebc0ec021d6d683","name":"Abibas Kid Boots","bundleInfo":"Casual kit","description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry","price":"750","sizes":["S","M","L","XL"],"colors":["#4287f5","#f54242","#400a2d"],"images":["https://i.imgur.com/ZAyNrLX.jpg","https://i.imgur.com/6wisujq.png","https://i.imgur.com/tRw6xJj.jpg"],"sale":"45","rating":"3","categories":["Shoes","kids"],"brand":"Abibas","creationDate":"2018-10-21T20:00:00.000Z"}

  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(ProductInfo.prototype, 'componentDidMount');
    const wrapper = shallow(<ProductInfo favoritesItems={[]} item={fakeItem} t={key => key}/>);
    expect(ProductInfo.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('calls componentDidUpdate', () => {
    sandbox.spy(ProductInfo.prototype, 'componentDidUpdate');
    const wrapper = shallow(<ProductInfo favoritesItems={[]} item={fakeItem} t={key => key}/>);
    wrapper.setProps({item: fakeItem});
    expect(ProductInfo.prototype.componentDidUpdate).to.have.property('callCount', 1);
  });

  it('should increase quantity', () => {
    const wrapper = shallow(<ProductInfo favoritesItems={[]} item={fakeItem} t={key => key}/>);
    const initialQuantity = wrapper.state().chosenQuantity;
    wrapper.instance().handleQuantity(true);
    expect(wrapper.state().chosenQuantity).to.equal(initialQuantity + 1);
  });

  it('should decrease quantity', () => {
    const wrapper = shallow(<ProductInfo favoritesItems={[]} item={fakeItem} t={key => key}/>);
    wrapper.instance().handleQuantity(true);
    wrapper.instance().handleQuantity(true);
    const initialQuantity = wrapper.state().chosenQuantity;
    wrapper.instance().handleQuantity(false);
    expect(wrapper.state().chosenQuantity).to.equal(initialQuantity - 1);
  });
});
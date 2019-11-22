import React, {Component} from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {ProductCatalog} from './ProductCatalog';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as LoadCard from "../../utils/loadCard";
import * as NotificationError from '../../utils/notificationError.js';



configure({adapter: new Adapter()});


describe('<ProductCatalog />', () => {
  const flushPromises = () => new Promise(setImmediate);
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', async () => {
    sandbox.spy(ProductCatalog.prototype, 'componentDidMount');
    sandbox.stub(LoadCard, "default").callsFake(() => {
      return new Promise(resolve => resolve({data:{items: [1,2,3]}}));
    });
    const wrapper = shallow(<ProductCatalog t={key => key}/>);
    expect(ProductCatalog.prototype.componentDidMount).to.have.property('callCount', 1);
    await flushPromises();
    expect(wrapper.state().notFound).to.equal(false);
  });

 it('should load more cards', async () => {
    sandbox.spy(ProductCatalog.prototype, 'componentDidMount');
    sandbox.stub(LoadCard, "default").callsFake(() => {
      return new Promise(resolve => resolve({data:{items: [1,2,3]}, nextPage: true}));
    });
    const wrapper = shallow(<ProductCatalog t={key => key}/>);
   const initialPage = wrapper.state().page;
   sandbox.spy(wrapper.instance(), "loadItems");
   wrapper.instance().handleOnClick();
   expect(ProductCatalog.prototype.componentDidMount).to.have.property('callCount', 1);
    await flushPromises();
    expect(wrapper.state().page).to.equal(initialPage + 1);
  });

  it('calls componentDidMount with filters', async () => {
    sandbox.spy(ProductCatalog.prototype, 'componentDidMount');
    sandbox.stub(LoadCard, "default").callsFake(() => {
      return new Promise(resolve => resolve({data:{items: [1,2,3]}}));
    });
    const wrapper = shallow(<ProductCatalog filters={{}}  filtered={true} t={key => key}/>);
    expect(ProductCatalog.prototype.componentDidMount).to.have.property('callCount', 1);
    await flushPromises();
    expect(wrapper.state().notFound).to.equal(false);
  });

  it('should set notFound to true', async () => {
    sandbox.stub(LoadCard, "default").callsFake(() => {
      return new Promise(resolve => resolve({data:{items:[]}}));
    });
    const wrapper = shallow(<ProductCatalog t={key => key}/>);
    await flushPromises();
    expect(wrapper.state().notFound).to.equal(true);
  });

  it('should send notification of an error', async () => {
    sandbox.stub(LoadCard, "default").callsFake(() => {
      return new Promise((resolve, reject) => reject("error"));
    });
    const wrapper = shallow(<ProductCatalog t={key => key}/>);
    sandbox.stub(NotificationError, 'default');
    await flushPromises();
    expect(NotificationError.default).to.have.property('callCount', 1);
  });

  it('should update component accordingly to filters',  () => {
    const wrapper = shallow(<ProductCatalog t={key => key}/>);
    sandbox.spy(wrapper.instance(), "loadItems");
    wrapper.setProps({filters: {name: "something new"}, filtered: true});
    expect(wrapper.instance().loadItems).to.have.property('callCount', 1)
    expect(wrapper.state().cards.length).to.equal(0);
  });
});
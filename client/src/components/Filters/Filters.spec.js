import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Filters} from './Filters';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as LoadFilters from "../../utils/loadFilters";
import * as NotificationError from "../../utils/notificationError";

configure({adapter: new Adapter()});


describe('<Filters />', () => {
  const flushPromises = () => new Promise(setImmediate);
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Filters.prototype, 'componentDidMount');
    const wrapper = shallow(<Filters slideIn={true} t={key => key}/>);
    expect(Filters.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('should load filters', async () => {
    sandbox.stub(LoadFilters, "loadFilters").callsFake(() => {
      return new Promise((resolve, reject) => reject({message:"test"}))
    });
    sandbox.spy(NotificationError, "default");
    const wrapper = shallow(<Filters slideIn={true} t={key => key}/>);
    await flushPromises();
    expect(NotificationError.default).to.have.property('callCount', 1);
  });
});
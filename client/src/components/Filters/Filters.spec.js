import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Filters} from './Filters';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});


describe('<Filters />', () => {

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
});
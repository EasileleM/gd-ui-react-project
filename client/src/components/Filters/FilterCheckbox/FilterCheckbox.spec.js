import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FilterCheckbox} from './FilterCheckbox';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});


describe('<FilterCheckbox />', () => {

  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(FilterCheckbox.prototype, 'componentDidMount');
    const wrapper = shallow(<FilterCheckbox options={[1,2,3,4]}/>);
    expect(FilterCheckbox.prototype.componentDidMount).to.have.property('callCount', 1);
  });
});
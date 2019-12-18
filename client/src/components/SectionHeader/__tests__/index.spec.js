import React from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SectionHeader } from "../SectionHeader";

configure({adapter: new Adapter()});

describe('<SectionHeader />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(SectionHeader.prototype, 'componentDidMount');
    const wrapper = mount(<SectionHeader t={key => key}/>);
    expect(SectionHeader.prototype.componentDidMount).to.have.property('callCount', 1);
  });

}); 

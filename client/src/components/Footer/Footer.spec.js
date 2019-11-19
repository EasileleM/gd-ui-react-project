import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Footer} from './Footer';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Links from './links';
import Banking from './banking';

configure({adapter: new Adapter()});

describe('<Footer />', () => {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Footer.prototype, 'componentDidMount');
    const wrapper = shallow(<Footer t={key => key}/>);
    expect(Footer.prototype.componentDidMount).to.have.property('callCount', 1);
  });
});
import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ModalWindow} from '../ModalWindow.jsx';

configure({adapter: new Adapter()});

describe('<ModalWindow />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(ModalWindow.prototype, 'componentDidMount');
    const wrapper = mount(<ModalWindow t={key => key}/>);
    expect(ModalWindow.prototype.componentDidMount).to.have.property('callCount', 1);
  });
}); 

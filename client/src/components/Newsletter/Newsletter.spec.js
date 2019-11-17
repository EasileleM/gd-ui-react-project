import React, {Component} from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Newsletter} from './Newsletter';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as SendEmail from "../../utils/sendEmail";
import * as Toastify from 'react-toastify';

configure({adapter: new Adapter()});


describe('<Newsletter />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Newsletter.prototype, 'componentDidMount');
    const wrapper = mount(<Newsletter t={key => key}/>);
    expect(Newsletter.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('submits form (no errors)', () => {
    sandbox.spy(Newsletter.prototype, 'handleSubmit');
    sandbox.stub(SendEmail, 'default').callsFake(() => {
      return new Promise(resolve => resolve({status: 201}))
    });
    let typeResult;
    sandbox.stub(Toastify, 'toast').callsFake((mes, type) => {
      typeResult = type.type;
    });
    const wrapper = mount((<Newsletter t={key => key}/>));
    wrapper.setState({value: "validemail@mail.com"});
    wrapper.find('.Newsletter__form').simulate('submit');
    return SendEmail.default().finally(() => {
      expect(typeResult).to.equal('info')
    })
  });

  it('submits form (bad response)', () => {
    sandbox.spy(Newsletter.prototype, 'handleSubmit');
    sandbox.stub(SendEmail, 'default').callsFake(() => {
      return new Promise(resolve => resolve({status: 400}))
    });
    let typeResult;
    sandbox.stub(Toastify, 'toast').callsFake((mes, type) => {
      typeResult = type.type;
    });
    const wrapper = mount((<Newsletter t={key => key}/>));
    wrapper.setState({value: "validemail@mail.com"});
    wrapper.find('.Newsletter__form').simulate('submit');
    return SendEmail.default().finally(() => {
      expect(typeResult).to.equal('error')
    })
  });

  it('handles changes in input', () => {
    sandbox.spy(Newsletter.prototype, 'handleChange');
    const wrapper = mount((<Newsletter t={key => key}/>));
    wrapper.find("input.Newsletter__input").simulate('change', {target: {value: 'My new value'}});
    expect(Newsletter.prototype.handleChange).to.have.property('callCount', 1);
  });
});
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
  const flushPromises = () => new Promise(setImmediate);
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

  it('submits form (no errors)', async () => {
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
    await flushPromises();
    expect(typeResult).to.equal('info')
  });

  it('submits form (bad response)', async () => {
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
    await flushPromises();
    expect(typeResult).to.equal('error')
  });

  it('submits form (error)', async () => {
    sandbox.spy(Newsletter.prototype, 'handleSubmit');
    sandbox.stub(SendEmail, 'default').callsFake(() => {
      return new Promise((resolve, reject) => reject({status: 400}))
    });
    let typeResult;
    sandbox.stub(Toastify, 'toast').callsFake((mes, type) => {
      typeResult = type.type;
    });
    const wrapper = mount((<Newsletter t={key => key}/>));
    wrapper.setState({value: "validemail@mail.com"});
    wrapper.find('.Newsletter__form').simulate('submit');
    await flushPromises();
    expect(typeResult).to.equal('error')
  });

  it('submits form (invalid)', async () => {
    sandbox.spy(Newsletter.prototype, 'handleSubmit');
    sandbox.stub(SendEmail, 'default').callsFake(() => {
      return new Promise((resolve, reject) => reject({status: 400}))
    });
    sandbox.spy(Toastify, 'toast');
    const wrapper = mount((<Newsletter t={key => key}/>));
    wrapper.instance().handleSubmit({
      preventDefault: () => {},
      target: {
        checkValidity: () => {return false},
        validate: () => {},
      }});
    expect(Toastify.toast).to.have.property('callCount', 0);
  });

  it('handles changes in input', () => {
    sandbox.spy(Newsletter.prototype, 'handleChange');
    const wrapper = mount((<Newsletter t={key => key}/>));
    wrapper.find("input.Newsletter__input").simulate('change', {target: {value: 'My new value'}});
    expect(Newsletter.prototype.handleChange).to.have.property('callCount', 1);
  });
});
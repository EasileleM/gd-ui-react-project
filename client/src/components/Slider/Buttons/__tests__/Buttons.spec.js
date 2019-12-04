import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Buttons} from '../Buttons';
import {Button} from '../Buttons';

configure({adapter: new Adapter()});

describe('<Buttons />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Buttons.prototype, 'componentDidMount');
    const wrapper = shallow(<Buttons currentSlide={1} t={key => key}/>);
    expect(Buttons.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('calls renderButton', () => {
    sandbox.spy(Buttons.prototype, 'renderButton');
    const wrapper = shallow(<Buttons currentSlide={1} t={key => key}/>);
    expect(Buttons.prototype.renderButton).to.have.property('callCount', 3);
  });

  it('renders button and set correct classes by given prop', () => {
    const wrapper = mount(<Button additionalClass="yes" t={key => key}/>);
    expect(wrapper.props().additionalClass).to.be.equal('yes');
    expect(wrapper.childAt(0).hasClass('yes')).to.be.true;
  });
}); 

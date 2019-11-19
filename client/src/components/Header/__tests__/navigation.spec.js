import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Navigation} from '../navigation';
import {BrowserRouter as Router} from "react-router-dom";

configure({adapter: new Adapter()});

describe('<Navigation />', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('calls componentDidMount', () => {
    sandbox.spy(Navigation.prototype, 'componentDidMount');
    const wrapper = shallow(<Navigation location={1} t={key => key}/>);
    expect(Navigation.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('should change searchValue', () => {
    const wrapper = shallow(<Navigation history={[]} location={1} t={key => key}/>);
    wrapper.instance().handleChange({target: {value: "test searchValue"}});
    expect(wrapper.state().searchValue).to.equal("test searchValue")
  });


  it('should remove params from url', () => {
    const testHistory = [];
    const wrapper = shallow(<Navigation history={testHistory} location={1} t={key => key}/>);
    wrapper.setState({seatchValue: "", searchInputIsFocused: true});
    wrapper.instance().handleSearch({
      preventDefault: () => {
      }, target: {value: "test searchValue"}
    });
    expect(testHistory.length).to.equal(1);
    expect(testHistory[testHistory.length - 1]).to.equal(`/search`)
  });

  it('should focus on search', () => {
    const searchInput = {
      current: {
        focus: () => {
        }
      }
    };
    sandbox.spy(searchInput.current, "focus");
    const wrapper = shallow(<Navigation history={[]} location={1} t={key => key}/>);
    wrapper.setState({searchInput, seatchValue: "", searchInputIsFocused: false});
    wrapper.instance().handleSearch({
      preventDefault: () => {
      }, target: {value: "test searchValue"}
    });
    expect(searchInput.current.focus).to.have.property('callCount', 1);
  });

  it('should change url', () => {
    const testHistory = [];
    const wrapper = shallow(<Navigation history={testHistory} location={1} t={key => key}/>);
    wrapper.setState({searchValue: "test value", searchInputIsFocused: true});
    wrapper.instance().handleSearch({
      preventDefault: () => {
      }, target: {value: "test searchValue"}
    });
    expect(testHistory.length).to.equal(1);
  });

  it('should clear searchValue', () => {
    const wrapper = shallow(<Navigation history={[]} location={1} t={key => key}/>);
    wrapper.instance().clearSearch();
    expect(wrapper.state().searchValue).to.equal("");
  });

  it('should change searchInputIsFocused to false', () => {
    const wrapper = shallow(<Navigation history={[]} location={1} t={key => key}/>);
    wrapper.instance().handleBlur();
    expect(wrapper.state().searchInputIsFocused).to.equal(false);
  });

  it('should change searchInputIsFocused to true', () => {
    const wrapper = shallow(<Navigation history={[]} location={1} t={key => key}/>);
    wrapper.instance().handleFocus();
    expect(wrapper.state().searchInputIsFocused).to.equal(true);
  });

  it('should toggle menuExpanded', () => {
    const wrapper = shallow(<Navigation history={[]} location={1} t={key => key}/>);
    const initialValueMenuExpanded = wrapper.state().menuExpanded;
    wrapper.instance().toggleMenu();
    expect(wrapper.state().menuExpanded).to.equal(!initialValueMenuExpanded);
  });

}); 

import {Newsletter} from './Newsletter';
import React, {Suspense} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import sendEmail from "../../utils/sendEmail";
import {LoadingSpinner} from '../LoadingSpinner/index';
import Enzyme, {shallow} from "enzyme";
import ScrollToTop from "../SectionHeader/ScrollOnTop";

jest.mock('../../utils/sendEmail', () => jest.fn());

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  const resp = {status: 200};
  sendEmail.mockImplementation(() => resp);
  act(() => {
    render(
        <Suspense fallback={<div className="spinner-wrapper"><LoadingSpinner/></div>}>
          <Newsletter/>
        </Suspense>, container
    );
  });

  const button = document.querySelector(".Newsletter__button");
  console.log(container)
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container.querySelector('.Newsletter__input')).toBe('f');
});
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { SizesSelector } from "./index";

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

it("renders with passed props", () => {
  const fakeProps = ["S", "M", "L", "XL"];
  act(() => {
    render(<SizesSelector sizes={fakeProps} />, container);
  })
  for (let i = 0; i < fakeProps.length; i++) {
    expect(container.textContent).toContain(fakeProps[i]);
  }
});
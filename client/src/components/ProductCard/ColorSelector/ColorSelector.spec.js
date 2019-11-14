import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { ColorSelector } from "./index";

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
  const fakeProps = ["#4287f5","#f54242","#400a2d"];
  act(() => {
    render(<ColorSelector colors={fakeProps}  handleOptionChange={()=>{}}/>, container);
  })
  const backgroundColor = "background-color";
  expect(container.querySelector('.color-selector__container').style._values[backgroundColor]).toBe(hexToRgb(fakeProps[0]));
});

function hexToRgb(hex) {
  const clearedHex = hex.slice(1);
  const bigint = parseInt(clearedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return 'rgb(' + [r, g, b].join(', ') + ')';
}
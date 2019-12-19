import React from 'react';

import './TextAreaInput.scss';

export function TextAreaInput(props) {
  let additionalClasses = '';
  if (props.valid === true) {
    additionalClasses = 'test-area-input_valid';
  }
  else if (props.valid === false) {
    additionalClasses = 'test-area-input_invalid';
  }
  return <textarea
    className={`test-area-input ${additionalClasses}`}
    placeholder={props.placeholder}
    onChange={props.handleOnChange ? (e) => props.handleOnChange(e) : (() => { })}
    name={props.name}
    value={props.value}
    onBlur={props.handleOnBlur ? (e) => props.handleOnBlur(e) : (() => { })}
  />
}

export default TextAreaInput;
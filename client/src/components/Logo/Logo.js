import React from 'react';
import { Link } from "react-router-dom";

import './main.scss';

export class Logo extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Link className="logo" to="/">
        <div className="logo__title">
          sh
          <div className="logo__image"></div>
          py
        </div>
        <div className="logo__text">
          shope any where
        </div>
      </Link>
    );
  }
}

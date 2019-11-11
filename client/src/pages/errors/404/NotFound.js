import React, {Component} from 'react';
import "./NotFound.scss"

class NotFound extends Component {
  render() {
    return (
        <div className="not-found">
          <h1 className="not-found__header">404</h1>
          <p className="not-found__paragraph">Page you're looking for is nowhere to be found.</p>
        </div>
    );
  }
}

export default NotFound;
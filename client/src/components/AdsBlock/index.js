import React from 'react';
import './main.scss';

export class AdsBlock extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="empty-ads-block">
        <p className="empty-ads-block__description">
          adv <span className="empty-ads-block__description_labeled">area</span>
        </p>
        <p className="empty-ads-block__resolution">470 x 100</p>
      </div>
    )
  }
}
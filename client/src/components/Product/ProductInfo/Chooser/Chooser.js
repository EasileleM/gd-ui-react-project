import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import "./Chooser.scss"

export class Chooser extends Component {
    componentDidMount() {
    }

    render() {
    return (

        <div className="chooser">
          <div className="chooser__container">
            <h2 className="chooser__heading_secondary">{this.props.t('productChooser.size')}:</h2>
            <div className="chooser__buttons">
              {this.props.sizes.map(size => {
                return <span key={size} onClick={() => {
                  this.props.handleSize(size)
                }}
                             className={`chooser__size-value ${size === this.props.chosenSize ? "chooser__size-value_chosen" : ""}`}>
                                        {size}
                                    </span>
              })}
            </div>
          </div>
          <div className="chooser__container chooser__container_margined">
            <h2 className="chooser__heading_secondary">{this.props.t('productChooser.quantity')}:</h2>
            <div className="chooser__buttons">
              <div className="chooser__quantity-button"
                   onClick={() => this.props.handleQuantity(true)}>+
              </div>
              <span className="chooser__quantity-number">{this.props.chosenQuantity}</span>
              <div className="chooser__quantity-button"
                   onClick={() => this.props.handleQuantity(false)}>-
              </div>
            </div>
          </div>
        </div>

    );
  }
}

export default withTranslation()(Chooser);
import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import "./main.scss"

class Chooser extends Component {
    render() {
        return (
            <Translation>
                { t =>
                    <div className="chooser">
                        <div className="chooser__size">
                            <h2 className="chooser__heading_secondary">{t('productChooser.size')}:</h2>
                            <div className="chooser__sizes">
                                {this.props.sizes.map(size => {
                                    return <span onClick={() => {
                                        this.props.handleSize(size)
                                    }} className={`chooser__size-value ${size === this.props.chosenSize ? "chooser__size-value_chosen" : ""}`}>
                                        {size}
                                    </span>
                                })}
                            </div>
                        </div>
                        <div className="chooser__quantity">
                            <h2 className="chooser__heading_secondary">{t('productChooser.quantity')}:</h2>
                            <div className="chooser__quantity-button" onClick={() => this.handleQuantity(true)}>+</div>
                            <span className="chooser__quantity-number">{this.props.chosenQuantity}</span>
                            <div className="chooser__quantity-button" onClick={() => this.handleQuantity(false)}>-</div>
                        </div>
                    </div>
                }
            </Translation>
        );
    }
}

export default Chooser;
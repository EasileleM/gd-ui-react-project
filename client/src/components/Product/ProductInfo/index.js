import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import "./main.scss"
import cartIcon from "./assets/cart.png"
import shareIcon from "./assets/share.png"
import likeIcon from "./assets/like.png"
import Chooser from "./Chooser";

class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemInfo: {
                title: props.item.name,
                bundleInfo: props.item.bundleInfo,
                description: props.item.description,
                sizes: props.item.sizes,
                price: props.item.price
            },
            chosenSize: null,
            chosenQuantity: 1,
        };

        this.handleSize = this.handleSize.bind(this);
    };

    handleSize(size) {
        this.setState({ chosenSize: size });
    }

    handleQuantity(more) {
        const currentQuantity = this.state.chosenQuantity;
        if (more) {
            this.setState({ chosenQuantity: currentQuantity + 1 });
        } else {
            if (this.state.chosenQuantity > 1) {
                this.setState({ chosenQuantity: currentQuantity - 1 });
            }
        }
    }

    render() {
        return (
            <Translation>
                {t =>
                    <div className="product-info">
                        <h1 className="product-info__heading">{this.state.itemInfo.title}</h1>
                        <h2 className="product-info__heading_secondary">{this.state.itemInfo.bundleInfo}</h2>
                        <p className="product-info__paragraph">{this.state.itemInfo.description}</p>

                        <Chooser sizes={this.state.itemInfo.sizes}
                            handleSize={this.handleSize}
                            chosenSize={this.state.chosenSize}
                            chosenQuantity={this.state.chosenQuantity} />

                        <div className="product-info__order">
                            <h3 className="product-info__price">{t('price')}: {this.state.itemInfo.price * this.state.chosenQuantity + t('currency')}</h3>
                            <div className="product-info__order-buttons">
                                <img className="product-info__button-icon" src={shareIcon} alt="Share icon" />
                                <img className="product-info__button-icon" src={cartIcon} alt="Add to cart icon" />
                                <img className="product-info__button-icon" src={likeIcon} alt="Add to favorites icon" />
                                <button className="product-info__order-now-button">{t('order')}</button>
                            </div>
                        </div>
                    </div>
                }
            </Translation>
        );
    }
}


export default ProductInfo;
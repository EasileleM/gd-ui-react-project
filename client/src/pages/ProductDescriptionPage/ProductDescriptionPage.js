import React, {Component} from 'react';
import Product from "../../components/Product";
import {RelatedProductsBlock} from "../../components/RelatedProductsBlock/RelatedProductsBlock";
import {Newsletter} from "../../components/Newsletter";

import "./ProductDescriptionPage.scss";

class ProductDescriptionPage extends Component {
    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="container">
                        <Product
                            id={this.props.match.params.id}
                            addToCard={(item, size, color, amount) => this.props.addToCard(item, size, color, amount)}
                        />
                    </div>
                </div>
                <div className="wrapper wrapper_secondary-color">
                    <div className="container">
                        <RelatedProductsBlock
                            id={this.props.match.params.id}
                            addToCard={(item, size, color, amount) => this.props.addToCard(item, size, color, amount)}
                        />
                        <Newsletter/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDescriptionPage;
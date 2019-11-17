import React, {Component} from 'react';
import Product from "../../components/Product/Product";
import {RelatedProductsBlock} from "../../components/RelatedProductsBlock/RelatedProductsBlock";
import Newsletter from "../../components/Newsletter/Newsletter";

import "./ProductDescriptionPage.scss";

class ProductDescriptionPage extends Component {
    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="container">
                        <Product
                            id={this.props.match.params.id}
                        />
                    </div>
                </div>
                <div className="wrapper wrapper_secondary-color">
                    <div className="container">
                        <RelatedProductsBlock
                            id={this.props.match.params.id}
                        />
                        <Newsletter/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDescriptionPage;
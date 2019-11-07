import React, { Component } from 'react';
import Product from "../../components/Product";
import { RelatedProductsBlock } from "../../components/RelatedProductsBlock/RelatedProductsBlock";
import { Newsletter } from "../../components/Newsletter";

import loadItem from "./../../utils/loadItem_new";
import { sendEmail } from "../../utils/sendEmail";
import "./ProductDescriptionPage.scss";

class ProductDescriptionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    render() {
        return (
            <div className="main">
                <div className="main__content main__content_secondary-color">
                    <Product id={this.props.match.params.id} />
                </div>
                <div className="main__content main__content_row">
                <RelatedProductsBlock id={this.props.match.params.id} />
                <Newsletter sendData={sendEmail} />
                </div>
            </div>
        );
    }
}

export default ProductDescriptionPage;
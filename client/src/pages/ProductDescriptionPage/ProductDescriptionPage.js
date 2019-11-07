import React, {Component} from 'react';
import Product from "../../components/Product";
import "./ProductDescriptionPage.scss"
import loadItem from "./../../utils/loadItem_new"

class ProductDescriptionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    render() {
        return (
            <div>
                <Product id={this.props.match.params.id}/>
            </div>
        );
    }
}

export default ProductDescriptionPage;
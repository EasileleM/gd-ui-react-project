import React, {Component} from 'react';
import Product from "../../components/Product";
import "./ProductDescriptionPage.scss"

class ProductDescriptionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    render() {
        return (
            <div class="main__content">
                <Product id={this.props.match.params.id}/>
            </div>
        );
    }
}

export default ProductDescriptionPage;
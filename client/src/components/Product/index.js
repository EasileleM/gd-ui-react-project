import React, {Component} from 'react';
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import "./main.scss"
import {LoadingSpinner} from "../LoadingSpinner";
import loadItem from "../../utils/loadItem_new";


class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false
        }
    }

    componentDidMount() {
        loadItem(this.props.id).then(res => {
            this.setState({
                item: res.data,
                ready: true,
            })
        })
    }


    render() {
        if (!this.state.ready) {
            return (<div className="product">
                <div className="product__loading">
                    <LoadingSpinner/>
                </div>
            </div>);
        }
        if (this.state.ready) {
            return (
                <div className="product">
                    <ProductImages
                        images={this.state.item.images}/>
                    <ProductInfo item={this.state.item}/>
                </div>
            );
        }
    }
}

export default Product;

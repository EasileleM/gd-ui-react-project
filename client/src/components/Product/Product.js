import React, {Component} from 'react';
import ProductImages from "./ProductImages/ProductImages";
import ProductInfo from "./ProductInfo/ProductInfo";
import "./Product.scss"
import {LoadingSpinner} from "../LoadingSpinner";
import loadItem from "../../utils/loadItem";
import i18n from "../../i18n";
import {toast} from "react-toastify";


export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            ready: false
        }
    }

    componentDidMount() {
        loadItem(this.props.id).then(res => {
            this.setState({
                item: res.data,
                ready: true,
            })
        }).catch(err => {
            (() => toast(err, {type: toast.TYPE.ERROR}))();
        });
    }

     componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            loadItem(this.props.id).then(res => {
                this.setState({
                    item: res.data,
                    ready: true,
                })
            }).catch(err => {
                (() => toast(err, {type: toast.TYPE.ERROR}))();
            });
        }
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

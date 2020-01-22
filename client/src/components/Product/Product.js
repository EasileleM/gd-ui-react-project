import React, {Component} from 'react';
import ProductImages from "./ProductImages/ProductImages";
import ProductInfo from "./ProductInfo/ProductInfo";
import "./Product.scss"
import {LoadingSpinner} from "../LoadingSpinner";
import {loadItemAction} from "../../redux/action-creators/items/loadItem";
import {toast} from "react-toastify";
import { connect } from 'react-redux';


export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            ready: !!props.item
        }
    }

    componentDidMount() {
        this.props.loadItem(this.props.id);
    }

     componentDidUpdate(prevProps) {
        if(!prevProps.item || this.props.item.id !== prevProps.item.id) {
            this.setState({
                item: this.props.item,
                ready: true
            })
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

const mapStateToProps = (state) => {
    return {
        item: state.itemLoader.item
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadItem: (id) => dispatch(loadItemAction(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

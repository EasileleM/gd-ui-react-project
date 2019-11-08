import React, { Component, Suspense } from 'react';
import { Header } from "../../components/Header";
import Home from "../Home/Home";
import ProductDescriptionPage from "../ProductDescriptionPage/ProductDescriptionPage";
import { Footer } from "../../components/Footer";
import { LoadingSpinner } from '../../components//LoadingSpinner/index';
import "./Layout.scss";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import { CartWindow } from '../../components/CartWindow/CartWindow';
import { loadIdArray } from '../../utils/loadIdArray';

import { changeBodyScrollState } from '../../utils/changeBodyScrollState';
import ScrollToTop from "../../components/SectionHeader/ScrollOnTop";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartOpened: false,
            cartItems: [],
            cartReady: false,
            cartSize: 0
        }
    }

    componentDidMount() {
        this.loadCartResources()
    }

    updateCartItemAmount(id, amount) {
        if (!this.validLocalStorage()) {
            this.setState({ cartItems: [] });
            return;
        }
        const cartArrayCopy = this.state.cartItems.slice();
        const item = this.state.cartItems.find((item) => item.item._id === id);
        if (item.amount === amount) {
            return;
        }
        item.amount = amount;
        this.setState({ cartItems: cartArrayCopy });
        const storage = JSON.parse(localStorage.getItem('productCart'));
        storage[id] = item;
        localStorage.setItem('productCart', JSON.stringify(storage));
    }

    deleteCartItemAmount(id) {
        if (!this.validLocalStorage()) {
            this.setState({ cartItems: [] });
            return;
        }
        const item = this.state.cartItems.find((item) => item.item._id === id);
        const cartArrayCopy = this.state.cartItems.slice();
        cartArrayCopy.splice(cartArrayCopy.indexOf(item), 1);
        if (!cartArrayCopy.length) {
            this.changeCartState();
        }
        this.setState({ cartItems: cartArrayCopy, cartSize: this.state.cartSize - 1 });
        const storage = JSON.parse(localStorage.getItem('productCart'));
        delete storage[id];
        localStorage.setItem('productCart', JSON.stringify(storage));
    }

    validLocalStorage() {
        if (!localStorage.getItem('productCart')) {
            localStorage.setItem('productCart', JSON.stringify(Object.create(null)));
            return false;
        }
        return true;
    }

    async loadCartResources() {
        this.validLocalStorage();
        let storage = JSON.parse(localStorage.getItem('productCart'));
        let idArray = Object.keys(storage);
        if (!idArray.length) {
            this.setState({ cartReady: true });
            return;
        }
        let data;
        await loadIdArray(idArray)
            .then((res) => {
                storage = Object
                    .entries(storage)
                    .filter((item) => !res.data.rejectedId.includes(item.id));
                data = res.data.items;
            })
            .catch(err => { throw err });
        const newStorage = {};
        const filteredData = [];
        for (const [key, value] of storage) {
            newStorage[key] = value;
            let item = data.find((item) => item._id === key);
            if (item) {
                filteredData.push({ item, size: value.size, color: value.color, amount: value.amount });
            }
        }
        localStorage.setItem('productCart', JSON.stringify(newStorage));
        this.setState({ cartItems: filteredData, cartReady: true, cartSize: storage.length });
    }

    changeCartState() {
        if (!this.state.cartReady || !this.state.cartSize) {
            return;
        }
        this.setState({ cartOpened: !this.state.cartOpened });
    }

    addToCard(item, size, color, amount = 1) {
        if (!this.state.cartReady) {
            return;
        }
        let cardItemsArray = this.state.cartItems;
        if (!this.validLocalStorage()) {
            cardItemsArray = [];
        }
        const storage = JSON.parse(localStorage.getItem('productCart'));
        if (storage[item._id]) {
            return;
        }
        storage[item._id] = { size, color, amount };
        localStorage.setItem('productCart', JSON.stringify(storage));
        this.setState({ cartItems: [...cardItemsArray, { item, size, color, amount }], cartSize: this.state.cartSize + 1 });
    }
    render() {
        changeBodyScrollState(this.state.cartOpened);
        return (
            <Router>
                <ScrollToTop>
                <Suspense fallback={<div className="spinner-wrapper"><LoadingSpinner /></div>}>
                    {
                        this.state.cartOpened &&
                        <CartWindow
                            size={this.state.cartSize}
                            data={this.state.cartItems}
                            handleOnClickClose={() => this.changeCartState()}
                            itemAmountChange={(id, amount) => this.updateCartItemAmount(id, amount)}
                            deleteItem={(id) => this.deleteCartItemAmount(id)}
                        />
                    }
                    <Header cartSize={this.state.cartSize} handleOnClickOpenCart={() => this.changeCartState()}/>
                    <Switch>
                        <Route path="/" exact render={() => <Home addToCard={(item, size, color, amount) => this.addToCard(item, size, color, amount)}/>} />
                        <Route path="/item/:id" render={(props) => <ProductDescriptionPage {...props} addToCard={(item, size, color, amount) => this.addToCard(item, size, color, amount)}/>} />
                        <Redirect to="/" />
                    </Switch>
                    <Footer />
                </Suspense>
                </ScrollToTop>
            </Router>
        );
    }
}

export default Layout;
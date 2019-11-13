import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import "./Layout.scss";

import Home from "../Home/Home";
import NotFound from "../errors/404/NotFound";
import ProductDescriptionPage from "../ProductDescriptionPage/ProductDescriptionPage";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { LoadingSpinner } from '../../components//LoadingSpinner/index';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import CartItems from '../../components/CartItems/CartItems';
import FavoritesItems from '../../components/FavoritesItems/FavoritesItems.jsx';
import OrderBlock from '../../components/OrderBlock/OrderBlock';

import interceptor from '../../utils/interceptorResponse';
import ScrollToTop from "../../components/SectionHeader/ScrollOnTop";
import { changeBodyScrollState } from '../../utils/changeBodyScrollState';
import {default as fetchCart} from '../../utils/cart/fetchItems';
import {default as fetchFavorites} from '../../utils/favorites/fetchItems';

import store from '../../store';
import { closeCart } from '../../action-creators/cart-action-creator';
import { closeFavorites } from '../../action-creators/favorites-action-creator';

class Layout extends Component {
    componentDidMount() {
        store.dispatch(fetchCart());
        store.dispatch(fetchFavorites());
    }

    componentDidUpdate() {
        changeBodyScrollState(this.props.cartOpened);
    }

    render() {
        return (
            <Router>
                <ScrollToTop>
                    <Suspense fallback={<div className="spinner-wrapper"><LoadingSpinner /></div>}>
                        {
                            (this.props.cartOpened) ? <ModalWindow content={<><CartItems /><OrderBlock /></>} onClick={() => store.dispatch(closeCart())} /> : null
                        }
                        {
                            (this.props.favoritesOpened) ? <ModalWindow content={<><FavoritesItems /></>} onClick={() => store.dispatch(closeFavorites())} /> : null
                        }
                        {
                            (this.props.error === 404) ? <Redirect to="/404" /> : null
                        }

                        <Header />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/item/:id" component={ProductDescriptionPage} />
                            <Route path="/404" component={NotFound} />
                            <Redirect to="/" />
                        </Switch>
                        <Footer />
                    </Suspense >
                </ScrollToTop>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.errorHandler.errorCode,
        cartOpened: state.cartController.opened,
        favoritesOpened: state.favoritesController.opened
    }
};
export default connect(mapStateToProps)(Layout);
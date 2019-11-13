import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import "./Layout.scss";

import ErrorPage from "../errors/ErrorPage";
import ProductDescriptionPage from "../ProductDescriptionPage/ProductDescriptionPage";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { LoadingSpinner } from '../../components//LoadingSpinner/index';
import { CartWindow } from '../../components/CartWindow/CartWindow';

import interceptor from '../../utils/interceptorResponse';
import ScrollToTop from "../../components/SectionHeader/ScrollOnTop";
import { changeBodyScrollState } from '../../utils/changeBodyScrollState';
import fetchItems from '../../utils/cart/fetchItems';

import store from '../../store';
import Search from "../Search/Search";
import Home from "../Home/Home";

class Layout extends Component {
    componentDidMount() {
        store.dispatch(fetchItems());
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
                            (this.props.cartOpened) ? <CartWindow /> : null
                        }
                        {
                            (this.props.error >= 400) ? <Redirect to={`/${this.props.error}`} /> : null
                        }
                        <Header />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/item/:id" component={ProductDescriptionPage} />
                            <Route path="/search" component={Search} />
                            <Route path="/400" component={ErrorPage} />
                            <Route path="/404" component={ErrorPage} />
                            <Route path="/500" component={ErrorPage} />
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
        cartOpened: state.cartController.opened
    }
};
export default connect(mapStateToProps)(Layout);
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom";

import "./Layout.scss";

import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer";
import { LoadingSpinner } from '../../components//LoadingSpinner/index';
import ModalWindowWrapper from '../../components/ModalWindowWrapper/ModalWindowWrapper';

import interceptor from '../../utils/interceptorResponse';
import { isAuth } from '../../utils/isAuth';
import ScrollToTop from "../../components/SectionHeader/ScrollOnTop";

import Search from "../Search/Search";
import Home from "../Home/Home";
import ErrorPage from "../errors/ErrorPage";
import ProductDescriptionPage from "../ProductDescriptionPage/ProductDescriptionPage";
import store from '../../redux/store';
import { setInitState } from '../../redux/action-creators/filter-action-creator';

import { userAuthorize } from '../../redux/action-creators/user-action-creator';

export class Layout extends Component {
    componentDidMount() {
        store.dispatch(setInitState(this.props.location.search));
    }

    componentDidUpdate(prevProps) {
        if (this.props.URI !== prevProps.URI && this.props.location.pathname === '/search') {
            this.props.history.push(this.props.URI);
        }
        isAuth()
            .then((res) => {
                this.props.authorize(res);
            });
    }

    render() {
        return (
            <ScrollToTop>
                <Suspense fallback={<div className="spinner-wrapper"><LoadingSpinner /></div>}>
                    <ModalWindowWrapper />
                    <RedirectWrapper error={this.props.error} />
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/item/:id" component={ProductDescriptionPage} />
                        <Route path="/search" component={Search} />
                        <Route path="/400" component={() => <ErrorPage error={400} />} />
                        <Route path="/404" component={() => <ErrorPage error={404} />} />
                        <Route path="/500" component={() => <ErrorPage error={500} />} />
                        <Redirect to="/" />
                    </Switch>
                    <Footer />
                </Suspense >
            </ScrollToTop>
        );
    }
}

function RedirectWrapper({ error }) {
    switch (error) {
        case 400: return <Redirect to='/400' />;
        case 404: return <Redirect to='/404' />;
        case 500: return <Redirect to='/500' />;
        default: return null;
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.errorHandler.errorCode,
        URI: state.filterController.URI,
        authorized: true,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authorize: (data) => dispatch(userAuthorize(data))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));

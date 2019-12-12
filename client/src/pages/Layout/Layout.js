import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import store from '../../redux/store';

import "./Layout.scss";

import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer";
import { LoadingSpinner } from '../../components/LoadingSpinner/index';
import ModalWindowWrapper from '../../components/ModalWindowWrapper/ModalWindowWrapper';
import { RedirectWrapper } from '../../components/RedirectWrapper/RedirectWrapper';

import ScrollToTop from "../../components/SectionHeader/ScrollOnTop";
import { setInitSearchState } from '../../redux/action-creators/filter/actions';

import Search from "../Search/Search";
import Home from "../Home/Home";
import ErrorPage from "../errors/ErrorPage";
import ProductDescriptionPage from "../ProductDescriptionPage/ProductDescriptionPage";

export class Layout extends Component {
    componentDidMount() {
        store.dispatch(setInitSearchState(this.props.location.search))
    }

    componentDidUpdate(prevProps) {
        if (this.props.URI !== prevProps.URI && this.props.URI) {
            this.props.history.push(this.props.URI);
        }
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

const mapStateToProps = (state) => {
    return {
        error: state.errorHandler.errorCode,
        URI: state.filterController.URI,
        authorized: true,
    }
};

export default withRouter(connect(mapStateToProps)(Layout));

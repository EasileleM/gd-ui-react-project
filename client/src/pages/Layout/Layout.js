import React, { Component } from 'react';
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

import SearchPage from "../SearchPage/SearchPage";
import HomePage from "../HomePage/HomePage";
import ErrorPage from "../ErrorPage/ErrorPage";
import ProductDescriptionPage from "../ProductDescriptionPage/ProductDescriptionPage";
import HotDealsPage from "../HotDealsPage/HotDealsPage";
import ContactPage from '../ContactPage/ContactPage';
import AboutPage from '../AboutPage/AboutPage';

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
                    <ModalWindowWrapper />
                    <RedirectWrapper error={this.props.error} />
                    <Header />
                    <Switch>
                        {console.log("1")}
                        <Route path="/" exact component={HomePage} />
                        {console.log("2")}
                        <Route path="/item/:id" component={ProductDescriptionPage} />
                        {console.log("3")}
                        <Route path="/search" component={SearchPage} />
                        {console.log("4")}
                        <Route path="/hot-deals" component={HotDealsPage} />
                        {console.log("5")}
                        <Route path="/about" component={AboutPage} />
                        {console.log("6")}
                        <Route path="/contact" component={ContactPage} />
                        {console.log("7")}
                        <Route path="/400" component={() => <ErrorPage error={400} />} />
                        {console.log("8")}
                        <Route path="/404" component={() => <ErrorPage error={404} />} />
                        {console.log("9")}
                        <Route path="/500" component={() => <ErrorPage error={500} />} />
                        <Redirect to="/" />
                    </Switch>
                    <Footer />
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

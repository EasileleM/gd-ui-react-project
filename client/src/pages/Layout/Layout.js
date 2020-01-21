import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import store from '../../redux/store';

import "./Layout.scss";

import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer";
import ModalWindowWrapper from '../../components/ModalWindowWrapper/ModalWindowWrapper';
import { RedirectWrapper } from '../../components/RedirectWrapper/RedirectWrapper';

import ScrollToTop from "../../components/SectionHeader/ScrollOnTop";
import { setInitSearchState } from '../../redux/action-creators/filter/actions';
import Routes from "../../Routes";

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
                        {Routes.map((route) => (
                            <Route
                                exact={route.exact}
                                key={route.path}
                                path={route.path}
                                component={route.component}
                            />
                        ))}
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

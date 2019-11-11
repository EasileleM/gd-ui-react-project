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
import interceptor from '../../utils/interceptorResponse';
import ScrollToTop from "../../components/SectionHeader/ScrollOnTop";
import NotFound from "../errors/404/NotFound";
import { connect } from 'react-redux';
import { changeBodyScrollState } from '../../utils/changeBodyScrollState';
class Layout extends Component {
    componentDidUpdate() {
        changeBodyScrollState(this.props.cartOpened && !this.props.cartLoading);
    }

    render() {
        return (
            <Router>
                <ScrollToTop>
                    <Suspense fallback={<div className="spinner-wrapper"><LoadingSpinner /></div>}>
                        {
                            (this.props.cartOpened && !this.props.cartLoading) ? <CartWindow /> : null
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
        cartLoading: state.cartController.loading
    }
};
export default connect(mapStateToProps)(Layout);
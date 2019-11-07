import React, { Component, Suspense } from 'react';
import { Header } from "../../components/Header";
import Home from "../Home/Home";
import ProductDescriptionPage from "../ProductDescriptionPage/ProductDescriptionPage";
import { Footer } from "../../components/Footer";
import { LoadingSpinner } from '../../components//LoadingSpinner/index';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

class Layout extends Component {
    render() {
        return (
            <Router>
                <Suspense fallback={<LoadingSpinner />}>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/item/:id" component={ProductDescriptionPage} />
                        <Redirect to="/" />
                    </Switch>
                    <Footer />
                </Suspense>
            </Router>
        );
    }
}

export default Layout;
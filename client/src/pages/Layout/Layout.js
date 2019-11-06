import React, {Component} from 'react';
import {Header} from "../../components/Header";
import Home from "../Home/Home";
import ProductDescriptionPage from "../ProductDescriptionPage/ProductDescriptionPage";
import {Footer} from "../../components/Footer";
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
                <Header/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/item/:id" component={ProductDescriptionPage}/>
                    <Redirect to="/"/>
                </Switch>
                <Footer/>
            </Router>
        );
    }
}

export default Layout;
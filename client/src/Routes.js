import React from 'react'

import HomePage from "./pages/HomePage/HomePage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage/ProductDescriptionPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import HotDealsPage from "./pages/HotDealsPage/HotDealsPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import {loadItemAction} from "./redux/action-creators/items/loadItem";
const Routes = [
    {
        path: '/',
        component: HomePage,
        exact: true
    },
    {
        path: '/item/:id',
        component: ProductDescriptionPage,
        loadData: (store, url, language) => {
            const itemId = url.substr(url.lastIndexOf('/'), url.length);
            return store.dispatch(loadItemAction(itemId, language))
        }
    },
    {
        path: '/search',
        component: SearchPage,
    },
    {
        path: '/hot-deals',
        component: HotDealsPage
    },
    {
        path: 'about',
        component: AboutPage
    },
    {
        path: '/contact',
        component: ContactPage
    },
    {
        path: '/400',
        component: () => <ErrorPage error={400} />
    },
    {
        path: '/404',
        component: () => <ErrorPage error={404} />
    },
    {
        path: '/500',
        component: () => <ErrorPage error={500} />
    },
];
export default Routes;

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Layout from "./pages/Layout/Layout";
import store from './store'
import {Provider} from 'react-redux'


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Layout />
        <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;

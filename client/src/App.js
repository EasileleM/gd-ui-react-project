import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Layout from "./pages/Layout/Layout";
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Layout />
        </Router>
        <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;

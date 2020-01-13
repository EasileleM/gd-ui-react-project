import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Layout from "./pages/Layout/Layout";
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();


function App() {
  return (
    <div className="App">
        <Router history={history}>
          <Layout />
        </Router>
        <ToastContainer 
        toastClassName='notification-info'
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        closeButton={false}
        pauseOnHover={false}/>
    </div>
  );
}

export default App;

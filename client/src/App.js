import React from 'react';
import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';//todo get toasts back!
import './App.scss';
import Layout from "./pages/Layout/Layout";


function App(props) {
    return (
    <div className="App">
          <Layout />
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

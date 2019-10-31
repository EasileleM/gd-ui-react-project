import React from 'react';
import './App.scss';

import {Header} from './components/index';
import {Footer} from './components/index';
import {Home} from './pages/home/index';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;

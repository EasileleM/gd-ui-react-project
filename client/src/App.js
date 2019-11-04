import React from 'react';
import './App.scss';

import {Layout, Home} from './pages/index';

function App() {
  return (
    <div className="App">
      <Layout page={<Home />} />
    </div>
  );
}

export default App;

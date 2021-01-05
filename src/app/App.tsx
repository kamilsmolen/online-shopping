import './App.css';

import React from 'react';

import { Details } from '../features/shop/Details';
import { ShopList } from '../features/shop/ShopList';

function App() {
  return (
    <div className="App">
      <Details />
      <ShopList />
    </div>
  );
}

export default App;

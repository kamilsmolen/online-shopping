import './App.css';

import React from 'react';

import { Cart } from '../features/cart/Cart';
import { Details } from '../features/shop/Details';
import { ShopList } from '../features/shop/ShopList';

function App() {
  return (
    <div className="App">
      <Cart />
      <Details />
      <ShopList />
    </div>
  );
}

export default App;

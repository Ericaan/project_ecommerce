import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import Bag from './Components/Bag';
import Category from './Components/Category';
import Product from './Components/Product';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element ={<Home/>}/>
        <Route exact path="/category" element={<Category/>}/>
        <Route exact path="/product/:id" element={<Product/>}/>
        <Route exact path="/bag/:id" element={<Bag/>}/>
        <Route element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

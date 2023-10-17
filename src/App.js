import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Customer from './pages/Customer';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/customer" element={<Customer />} />
    </Routes>
  </Router>
  );
}

export default App;


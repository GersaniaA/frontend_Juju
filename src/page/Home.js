import React from 'react';
import Header from '../components/Header';
import '../styles/App.css';

function Home({ rol }) {
  return(
    <div>
      <Header rol={ rol } />
      <h1>{ rol }</h1>
    </div>
  );
}

export default Home;
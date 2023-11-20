import React from 'react';
import Header from '../components/Header';
import '../styles/App.css';

function Home({ rol }) {
  alert(rol);
  return(
    <div>
      <Header rol={ rol } />
    </div>
  );
}

export default Home;
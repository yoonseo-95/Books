import React from 'react';
import Header from './pages/Header/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <Header />
    <Outlet />
  </>
  );
}

export default App;

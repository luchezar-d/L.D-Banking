import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Applications from './pages/Applications';
import Offer from './pages/Offer';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" 
            element={
              localStorage.getItem('isLoggedIn') === 'true' 
                ? <Apply /> 
                : <Login />
            }
          />
          <Route 
            path="/applications" 
            element={
              localStorage.getItem('isLoggedIn') === 'true' 
                ? <Applications /> 
                : <Login />
            }
          />
          <Route 
            path="/offer/:id" 
            element={
              localStorage.getItem('isLoggedIn') === 'true' 
                ? <Offer /> 
                : <Login />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

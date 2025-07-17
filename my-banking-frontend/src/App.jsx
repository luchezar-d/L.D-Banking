import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Applications from './pages/Applications';
import Offer from './pages/Offer';
import Login from './pages/Login';
import KycPage from './pages/KycPage';
import ThankYou from './pages/ThankYou';
import Register from './pages/Register';

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
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/offer/:id/kyc" element={<KycPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

import React from 'react';
import Footer from '../components/Footer';

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f9f9ff] to-[#f3e8ff] font-sans">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10">
        <div className="flex flex-col items-center w-full max-w-2xl rounded-2xl shadow-lg bg-white/80 p-8">
          <div className="text-6xl mb-4">💜</div>
          <h2 className="text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Thank You!</h2>
          <p className="text-lg text-gray-700 mb-8 text-center">Your KYC information has been submitted successfully.<br />We appreciate your trust in L.D Banking.<br />You will receive a confirmation email shortly.</p>
          <a href="/applications" className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500 text-white font-bold text-lg shadow hover:from-purple-400 hover:to-purple-600 transition">View Applications</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import React from 'react';
import Footer from '../components/Footer';

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f9f9ff] font-inter">
      <div className="flex flex-1 items-center justify-center pt-20 pb-10">
        <div className="w-full max-w-xl px-4 flex flex-col items-center">
          <h2 className="text-5xl font-extrabold text-purple-500 mb-6 text-center">Thank You!</h2>
          <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">Your KYC information has been submitted successfully.<br />We appreciate your trust in L.D Banking.<br />You will receive a confirmation email shortly.</p>
          <a href="/applications" className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-purple-300 to-purple-500 text-white font-bold text-lg shadow hover:from-purple-400 hover:to-purple-600 transition">View Applications</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

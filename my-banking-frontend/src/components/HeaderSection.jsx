import React from 'react';
import headerImage from '../assets/1.jpg';

export default function HeaderSection() {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-purple-100 to-purple-200">
      <div className="flex-1 flex items-center justify-center">
        <img
          src={headerImage}
          alt="Banking"
          className="rounded-full w-80 h-80 object-cover border-4 border-[#a78bfa] bg-white"
        />
      </div>
      <div className="flex-1 flex flex-col items-start justify-center py-12">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 leading-tight">
          Modern Banking for a Digital World
        </h1>
        <p className="text-2xl md:text-3xl mb-10 max-w-2xl text-gray-700">
          Experience secure, fast, and flexible financial products designed for you. Open an account or explore our products today.
        </p>
        <div className="flex gap-6">
          <button className="bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#a78bfa] text-white font-semibold py-4 px-10 rounded-xl text-lg transition">
            Open Account
          </button>
          <button className="border-2 border-[#a78bfa] text-[#7c3aed] font-semibold py-4 px-10 rounded-xl text-lg hover:bg-[#ede9fe] transition">
            Explore Products
          </button>
        </div>
      </div>
    </section>
  );
}

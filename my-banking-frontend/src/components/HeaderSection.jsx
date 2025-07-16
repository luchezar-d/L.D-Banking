import React from 'react';
import headerImage from '../assets/1.jpg';

export default function HeaderSection() {
  return (
    <section
      className="w-full flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-purple-100 to-purple-200"
      style={{ minHeight: 'calc(100vh - 5.5rem)', marginTop: '5.5rem' }}
    >
      <div className="flex-1 flex items-center justify-center">
        <img
          src={headerImage}
          alt="Banking"
          className="rounded-full w-56 h-56 md:w-80 md:h-80 object-cover border-4 border-[#a78bfa] bg-white mt-6 md:mt-10"
        />
      </div>
      <div className="flex-1 flex flex-col items-start justify-center py-8 md:py-12 px-4">
        <h1 className="text-3xl md:text-6xl font-semibold mb-4 md:mb-6 text-gray-900 leading-tight">
          Modern Banking for a Digital World
        </h1>
        <p className="text-lg md:text-2xl mb-6 md:mb-10 max-w-2xl text-gray-700">
          Experience secure, fast, and flexible financial products designed for you. Open an account or explore our products today.
        </p>
        <div className="flex gap-4 md:gap-6">
          <button className="bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#a78bfa] text-white font-medium py-3 px-8 rounded-lg text-base md:text-lg transition shadow-md md:shadow-lg">
            Open Account
          </button>
          <button className="border-2 border-[#a78bfa] text-[#7c3aed] font-medium py-3 px-8 rounded-lg text-base md:text-lg hover:bg-[#ede9fe] transition shadow-md md:shadow-lg">
            Explore Products
          </button>
        </div>
      </div>
    </section>
  );
}

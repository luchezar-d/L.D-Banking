import React from 'react';
import headerImage from '../assets/1.jpg';

export default function HeaderSection() {
  return (
    <section className="bg-gradient-to-r from-purple-700 to-purple-500 text-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Left side image */}
        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img 
            src={headerImage} 
            alt="Happy Customer" 
            className="rounded-full w-80 h-80 object-cover border-4 border-white shadow-lg"
          />
        </div>

        {/* Right side text */}
        <div className="md:w-1/2 md:pl-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Secure finance that grows with you
          </h1>
          <p className="mb-8 text-lg">
            Whether you're managing cash flow, funding opportunities, or expanding operations, our banking platform has you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded">
              Open Account
            </button>
            <button className="border border-white text-white py-3 px-6 rounded hover:bg-white hover:text-purple-700 transition">
              Explore Products
            </button>
          </div>
          <div className="mt-6 flex items-center text-sm">
            <span className="mr-2 text-green-300">✔</span>
            No impact on your credit score to check eligibility
          </div>
        </div>
      </div>
    </section>
  );
}

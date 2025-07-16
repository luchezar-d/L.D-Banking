import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductParallax({ img, title, desc, link }) {
  return (
    <section
      className="relative min-h-[400px] flex flex-col justify-center items-center bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#18122b]/80 to-black/80 backdrop-blur-sm" />
      <div className="relative z-10 text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">{title}</h2>
        <p className="text-lg md:text-xl text-white/90 drop-shadow mb-6 max-w-2xl mx-auto">{desc}</p>
        <Link
          to={link}
          className="inline-block px-8 py-3 rounded-full text-lg font-semibold text-white bg-[#a259ff] shadow-[0_0_16px_2px_#a259ff99] hover:bg-[#b47aff] hover:shadow-[0_0_24px_4px_#a259ffcc] transition"
        >
          Apply Now
        </Link>
      </div>
    </section>
  );
}

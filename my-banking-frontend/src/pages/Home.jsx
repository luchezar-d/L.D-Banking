import React from 'react';
import HeaderSection from '../components/HeaderSection';
import ProductsSection from '../components/ProductsSection';
import ParallaxSections from '../components/ParallaxSections';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f8ff] flex flex-col w-full">
      <main className="w-full flex-1 flex flex-col space-y-12">
        <HeaderSection />
        <ProductsSection />
        <ParallaxSections />
      </main>
      <Footer />
    </div>
  );
}

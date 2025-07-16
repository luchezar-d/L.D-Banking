import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#f8f8ff] text-gray-700 py-8 mt-auto border-t border-gray-100">
      <div className="container mx-auto text-center">
        <div className="mb-2">
          Contact us: <a href="mailto:contact@ldbanking.com" className="text-[#7c3aed] hover:underline">contact@ldbanking.com</a> | +1 234 567 890
        </div>
        <div className="text-xs text-gray-400">
          © 2025 L.D Banking. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-100 via-purple-50 to-purple-100 w-full py-10 mt-auto border-t border-gray-100 font-sans">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center md:items-start text-center md:text-left gap-10 md:gap-8">
        {/* Contact Us */}
        <div className="flex-1 flex flex-col gap-2 items-center md:items-center">
          <h3 className="font-bold text-2xl mb-2 text-black tracking-tight">Contact Us</h3>
          <a href="mailto:contact@ldbanking.com" className="text-[#7c3aed] hover:underline text-base font-semibold">contact@ldbanking.com</a>
          <span className="text-base text-black font-medium">+1 234 567 890</span>
          <span className="text-sm text-black font-normal">Mon-Fri: 9am - 6pm</span>
        </div>
        {/* Follow Us */}
        <div className="flex-1 flex flex-col gap-2 items-center">
          <h3 className="font-bold text-2xl mb-2 text-black tracking-tight">Follow Us</h3>
          <div className="flex gap-5 justify-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#7c3aed] hover:text-[#a78bfa] transition">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#7c3aed] hover:text-[#a78bfa] transition">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#7c3aed] hover:text-[#a78bfa] transition">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </div>
        {/* Location */}
        <div className="flex-1 flex flex-col gap-2 items-center">
          <h3 className="font-bold text-2xl mb-2 text-black tracking-tight">Our Location</h3>
          <iframe
            title="L.D Banking Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363155047!3d-37.81627974202198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1623123123123!5m2!1sen!2sau"
            width="100%"
            height="120"
            style={{ border: 0, borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(124,58,237,0.12)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <span className="text-sm text-black font-normal">123 Main St, Melbourne, Australia</span>
        </div>
      </div>
      <div className="text-center text-black text-base font-medium mt-8 tracking-tight">
        © 2025 <span className="text-[#7c3aed] font-bold">L.D Banking</span>. All rights reserved.
      </div>
    </footer>
  );
}

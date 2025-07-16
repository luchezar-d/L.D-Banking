import React from 'react';
import { Link } from 'react-router-dom';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';

const sections = [
	{
		img: img2,
		title: 'Loan',
		desc: 'Flexible personal and business loans with fast approval and competitive rates.',
		btn: 'Apply Now',
		link: '/apply',
	},
	{
		img: img3,
		title: 'Flash Credit',
		desc: 'Instant short-term credit for your urgent needs. Get funds in minutes.',
		btn: 'Apply Now',
		link: '/apply',
	},
	{
		img: img4,
		title: 'Credit Card',
		desc: 'Modern credit cards with rewards, no hidden fees, and global acceptance.',
		btn: 'Apply Now',
		link: '/apply',
	},
];

export default function ParallaxSections() {
  return (
	<>
	  {sections.map((s, i) => (
		<section
		  key={i}
		  className="relative min-h-[400px] flex flex-col justify-center items-center bg-fixed bg-center bg-cover m-0 p-0"
		  style={{ backgroundImage: `url(${s.img})` }}
		>
		  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/70 to-[#ede9fe]/80 backdrop-blur-sm" />
		  <div className="relative z-10 text-center px-4">
			<h2 className="text-4xl md:text-5xl font-bold text-gray-900 drop-shadow-lg mb-4">
			  {s.title}
			</h2>
			<p className="text-lg md:text-xl text-gray-700 drop-shadow mb-6 max-w-2xl mx-auto">
			  {s.desc}
			</p>
			<Link
			  to={s.link}
			  className="inline-block px-8 py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] shadow hover:from-[#7c3aed] hover:to-[#a78bfa] transition"
			>
			  {s.btn}
			</Link>
		  </div>
		</section>
	  ))}
	</>
  );
}

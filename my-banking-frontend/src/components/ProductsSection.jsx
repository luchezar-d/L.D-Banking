import React from 'react';

const products = [
	{
		title: 'Fast Loans',
		desc: 'Get approved for personal or business loans in minutes.',
		icon: (
			<svg
				className="w-10 h-10 text-[#7c3aed] mb-2"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M13 16h-1v-4h-1m4 4h1a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2h1"
				/>
			</svg>
		),
	},
	{
		title: 'Secure Savings',
		desc: 'Grow your savings with top-tier security and great rates.',
		icon: (
			<svg
				className="w-10 h-10 text-[#9f7aea] mb-2"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m0 0h4m-4 0H8"
				/>
			</svg>
		),
	},
	{
		title: 'Credit Cards',
		desc: 'Flexible credit cards with rewards and no hidden fees.',
		icon: (
			<svg
				className="w-10 h-10 text-[#f472b6] mb-2"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<rect width="20" height="14" x="2" y="5" rx="2" />
				<path d="M2 10h20" />
			</svg>
		),
	},
];

export default function ProductsSection() {
	return (
		<section className="py-16 bg-[#f8f8ff]">
			<div className="max-w-5xl mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
					Our Products & Features
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{products.map((p, i) => (
						<div
							key={i}
							className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-all duration-200 border border-gray-100"
						>
							{p.icon}
							<h3 className="text-xl font-semibold mb-2 text-gray-900">
								{p.title}
							</h3>
							<p className="text-gray-600 text-center">{p.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-32 font-sans">
      
      {/* Intro */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-5xl mb-32 mt-12">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-12 leading-tight">
          We believe commerce should be <br className="hidden md:block"/> invisible, effortless, and beautiful.
        </h1>
        <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1 text-sm uppercase tracking-widest text-gray-500 font-medium">The Vision</div>
          <div className="md:col-span-2 text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            Founded in 2026, UrbanEdge Mart was created to strip away the noise of modern online shopping. We provide a highly curated selection of premium goods backed by an immense, global logistics network. It's boutique quality with enterprise scale.
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden mb-32 bg-gray-100 dark:bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" 
          alt="Aesthetic workspace" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* The Scale */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-5xl mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="md:col-span-1 text-sm uppercase tracking-widest text-gray-500 font-medium">By the Numbers</div>
          <div className="md:col-span-2 grid grid-cols-2 gap-12">
            <div>
              <div className="text-5xl md:text-7xl font-light tracking-tight mb-2">5M+</div>
              <div className="text-sm text-gray-500">Customers Worldwide</div>
            </div>
            <div>
              <div className="text-5xl md:text-7xl font-light tracking-tight mb-2">120</div>
              <div className="text-sm text-gray-500">Countries Served</div>
            </div>
            <div>
              <div className="text-5xl md:text-7xl font-light tracking-tight mb-2">24h</div>
              <div className="text-sm text-gray-500">Average Fulfillment</div>
            </div>
            <div>
              <div className="text-5xl md:text-7xl font-light tracking-tight mb-2">0</div>
              <div className="text-sm text-gray-500">Compromises</div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gray-50 dark:bg-[#0a0a0a] py-32">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <h3 className="text-2xl font-light tracking-tight mb-4">Precision Logistics.</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Our infrastructure is built for speed. Fully automated fulfillment centers mean your order is processed, packed, and shipped within hours, not days. We integrate directly with top-tier global couriers.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light tracking-tight mb-4">Absolute Security.</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Your data is sacred. We utilize end-to-end enterprise encryption and never store your payment information. Shop with the peace of mind you deserve.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light tracking-tight mb-4">Curated Excellence.</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                We don't sell everything, we only sell the best. Every brand on UrbanEdge Mart passes a rigorous 50-point quality inspection before reaching our platform.
              </p>
            </div>
            <div className="flex items-center">
               <Link to="/shop" className="inline-flex items-center gap-3 uppercase tracking-widest text-sm font-medium hover:opacity-50 transition-opacity text-black dark:text-white">
                  Experience UrbanEdge Mart <FiArrowRight size={18} />
                </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
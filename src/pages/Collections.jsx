import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const collectionsData = [
  {
    id: 1,
    title: 'The Tech Minimalist',
    description: 'Elevate your daily workflow with our premium, understated tech accessories.',
    image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2000&auto=format&fit=crop',
    link: '/shop?category=Tech',
    featured: true,
  },
  {
    id: 2,
    title: 'Curated Living',
    description: 'Objects that bring peace to your space.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop',
    link: '/shop?category=Home',
    featured: false,
  },
  {
    id: 3,
    title: 'Daily Carry',
    description: 'Bags built for the modern commute.',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop',
    link: '/shop?category=Bags',
    featured: false,
  },
  {
    id: 4,
    title: 'Vision',
    description: 'Frames crafted for unparalleled clarity.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000&auto=format&fit=crop',
    link: '/shop?category=Eyewear',
    featured: true,
  }
];

export default function Collections() {
  return (
    <div className="min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        
        {/* Header */}
        <div className="max-w-3xl mb-24 mt-12">
          <h1 className="text-5xl md:text-7xl font-sans font-light tracking-tight mb-6">Collections.</h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Discover our meticulously organized categories. Everything you need, nothing you don't.
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="flex flex-col gap-24 md:gap-32">
          {collectionsData.map((collection, index) => (
            <div key={collection.id} className={`flex flex-col ${collection.featured ? 'md:flex-col' : (index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')} gap-8 md:gap-16 items-center`}>
              
              {/* Image Box */}
              <div className={`w-full overflow-hidden bg-gray-50 dark:bg-gray-900 ${collection.featured ? 'aspect-[21/9]' : 'aspect-[4/5] md:w-1/2'}`}>
                <Link to={collection.link}>
                  <img 
                    src={collection.image} 
                    alt={collection.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out cursor-pointer"
                  />
                </Link>
              </div>
              
              {/* Text Box */}
              <div className={`flex flex-col justify-center ${collection.featured ? 'w-full max-w-3xl mx-auto text-center mt-4' : 'w-full md:w-1/2 md:p-8'}`}>
                <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight mb-4">{collection.title}</h2>
                <p className="text-lg text-gray-500 mb-8 font-light leading-relaxed">{collection.description}</p>
                <Link to={collection.link} className={`inline-flex items-center gap-3 uppercase tracking-widest text-sm font-medium hover:opacity-50 transition-opacity ${collection.featured ? 'justify-center' : ''}`}>
                  Explore <FiArrowRight size={18} />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

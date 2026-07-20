import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import Button from '../ui/Button';

const slides = [
  {
    title: 'Elevate Your Everyday',
    subtitle: 'Discover premium essentials crafted for the modern lifestyle',
    cta: 'Shop Collection',
    link: '/shop',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&auto=format&fit=crop',
  },
  {
    title: 'Flash Sale — Up to 40% Off',
    subtitle: 'Limited time offers on trending products. Don\'t miss out!',
    cta: 'Shop Flash Sale',
    link: '/shop?filter=flash-sale',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&auto=format&fit=crop',
  },
  {
    title: 'New Arrivals 2026',
    subtitle: 'Fresh styles and cutting-edge tech just dropped',
    cta: 'Explore New',
    link: '/shop?sort=newest',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&auto=format&fit=crop',
  },
];

export default function HeroBanner() {
  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      <Swiper modules={[Autoplay, EffectFade, Pagination]} effect="fade" autoplay={{ delay: 5000 }} pagination={{ clickable: true }} loop className="h-full">
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="max-w-xl text-white"
                  >
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">{slide.title}</h1>
                    <p className="mt-4 text-lg md:text-xl text-white/80">{slide.subtitle}</p>
                    <Link to={slide.link} className="inline-block mt-8">
                      <Button className="!bg-white !text-gray-900 hover:!bg-gray-100">
                        {slide.cta} <HiArrowRight size={18} />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
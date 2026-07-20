import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { brands } from '../../data/brands';

export default function BrandLogos() {
  return (
    <section className="py-12 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <Swiper modules={[Autoplay]} autoplay={{ delay: 2000 }} spaceBetween={40} slidesPerView={3} breakpoints={{ 640: { slidesPerView: 4 }, 1024: { slidesPerView: 7 } }} loop>
          {brands.slice(0, 14).map((brand) => (
            <SwiperSlide key={brand}>
              <div className="flex items-center justify-center h-12 opacity-50 hover:opacity-100 transition-opacity">
                <span className="text-lg font-bold tracking-wider text-gray-400 dark:text-gray-500">{brand}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

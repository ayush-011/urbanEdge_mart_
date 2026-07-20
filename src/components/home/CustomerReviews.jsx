import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Rating from '../ui/Rating';

const reviews = [
  { id: 1, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop', rating: 5, text: 'Absolutely love the quality! Fast shipping and beautiful packaging. NEXUS is my go-to now.', product: 'Classic Watch' },
  { id: 2, name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop', rating: 5, text: 'Best online shopping experience I\'ve had. The product filters and search are incredibly smooth.', product: 'Wireless Earbuds' },
  { id: 3, name: 'Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop', rating: 4, text: 'Great selection and competitive prices. The wishlist feature makes it easy to save favorites.', product: 'Leather Bag' },
  { id: 4, name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop', rating: 5, text: 'Premium feel from start to finish. Checkout was seamless and delivery was right on time.', product: 'Running Shoes' },
];

export default function CustomerReviews() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl md:text-4xl font-bold text-center mb-10">What Our Customers Say</h2>
        <Swiper modules={[Autoplay]} autoplay={{ delay: 4000 }} spaceBetween={24} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 h-full">
                <Rating value={review.rating} showCount={false} />
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-6">
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-sm">{review.name}</p>
                    <p className="text-xs text-gray-500">Purchased {review.product}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

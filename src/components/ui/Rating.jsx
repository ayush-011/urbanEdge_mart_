import { HiStar } from 'react-icons/hi2';
import { cn } from '../../utils/helpers';

export default function Rating({ value, count, size = 'sm', showCount = true }) {
  const sizes = { sm: 14, md: 18, lg: 22 };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <HiStar
            key={star}
            size={s}
            className={cn(star <= Math.round(value) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600')}
          />
        ))}
      </div>
      {showCount && count != null && (
        <span className="text-xs text-gray-500 dark:text-gray-400">({count})</span>
      )}
    </div>
  );
}

import { cn } from '../../utils/helpers';

export default function Input({ label, error, className, focusColor = 'indigo', ...props }) {
  const focusRing = focusColor === 'teal' ? 'focus:ring-teal-500' : 'focus:ring-indigo-500';
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{label}</label>}
      <input
        className={cn(
          'w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700',
          'bg-white dark:bg-gray-900 text-gray-900 dark:text-white',
          'focus:outline-none focus:ring-2 focus:border-transparent',
          focusRing,
          'placeholder:text-gray-400 transition-all duration-200',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

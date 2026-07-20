import { Link } from 'react-router-dom';
import { HiChevronRight, HiHome } from 'react-icons/hi2';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-6 isolate">
      <Link to="/" className="shrink-0 p-1 -m-1 rounded hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Home">
        <HiHome size={16} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1 min-w-0">
          <HiChevronRight size={14} className="shrink-0 text-gray-400 dark:text-gray-500" />
          {item.href ? (
            <Link to={item.href} className="hover:text-gray-900 dark:hover:text-white transition-colors truncate max-w-[160px] md:max-w-[240px]">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px] md:max-w-[320px]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthLayout({ heading, subtitle, children, footer }) {
  return (
    <div className="relative min-h-[88vh] overflow-hidden flex items-center justify-center px-4 py-12 md:py-16">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[40rem] h-80 rounded-full bg-teal-100/70 dark:bg-teal-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-emerald-100/60 dark:bg-emerald-500/5 blur-3xl" />
        <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-cyan-100/50 dark:bg-cyan-500/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-950/5 dark:shadow-black/40 p-8 md:p-10">
          <div className="flex flex-col items-center text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white font-serif text-2xl font-bold shadow-lg shadow-teal-500/30"
            >
              U
            </Link>
            <p className="mt-4 font-serif text-lg tracking-tight text-gray-900 dark:text-white">
              UrbanEdge <span className="text-teal-600 dark:text-teal-400">Mart</span>
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{heading}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
          </div>

          <div className="mt-7">{children}</div>

          {footer && (
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">{footer}</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
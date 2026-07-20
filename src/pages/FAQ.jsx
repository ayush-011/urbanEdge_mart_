import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiMagnifyingGlass, HiEnvelope, HiPhone, HiChatBubbleLeftEllipsis, HiCheckCircle, HiQuestionMarkCircle, HiTruck, HiArrowPath, HiCreditCard, HiUserCircle, HiShieldCheck } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
const categories = [
  { id: 'all', label: 'All Questions', icon: HiQuestionMarkCircle, count: 12 },
  { id: 'shipping', label: 'Shipping & Delivery', icon: HiTruck, count: 3 },
  { id: 'returns', label: 'Returns & Refunds', icon: HiArrowPath, count: 3 },
  { id: 'payments', label: 'Payments & Pricing', icon: HiCreditCard, count: 3 },
  { id: 'account', label: 'Account & Orders', icon: HiUserCircle, count: 2 },
  { id: 'security', label: 'Security & Privacy', icon: HiShieldCheck, count: 1 },
];

const faqs = [
  { cat: 'shipping', q: 'How long does shipping take?', a: 'Standard shipping takes 3–5 business days for domestic orders. Express (1–2 day) and Next-Day delivery options are available at checkout. International orders typically arrive within 7–14 business days. During holiday or sale events, please allow an extra 1–2 business days for fulfillment.' },
  { cat: 'shipping', q: 'Do you offer free shipping?', a: 'Yes! We offer free standard shipping on all domestic orders over $100. For orders under $100, a flat-rate shipping fee of $5.99 applies. Express and Next-Day shipping are available as paid upgrades at checkout.' },
  { cat: 'shipping', q: 'Do you ship internationally?', a: 'Yes! We ship to over 50 countries worldwide. International shipping rates and delivery estimates are calculated at checkout based on your location. Import duties, taxes, and customs fees are the responsibility of the recipient and may be charged upon delivery.' },
  { cat: 'returns', q: 'What is your return policy?', a: 'We offer a 30-day, hassle-free return policy on all non-sale items. Products must be unused, in original packaging, and in resellable condition. Initiate a return directly from your Order History page or contact support. We cover return shipping for defective or incorrect items.' },
  { cat: 'returns', q: 'How long until I get my refund?', a: 'Once we receive and inspect your returned item (usually 2–5 business days after we receive it), refunds are processed within 3 business days. Refunds are issued to your original payment method. Please allow up to 7–10 business days for the refund to appear on your bank or card statement, depending on your financial institution.' },
  { cat: 'returns', q: 'Can I exchange an item instead?', a: 'Absolutely! We offer free size and style exchanges within 30 days of delivery for most products. Start an exchange request from your Order History or email support@urbanedgemart.com with your order number and preferred replacement. If the new item costs less, we\'ll refund the difference; if more, you\'ll be asked to pay the additional amount.' },
  { cat: 'payments', q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover), PayPal, Apple Pay, Google Pay, Shop Pay, and Cash on Delivery (select regions only). For bulk or corporate orders, we also accept bank transfers. All payments are processed securely via industry-leading payment gateways.' },
  { cat: 'payments', q: 'How do I apply a coupon or discount code?', a: 'Enter your coupon or discount code in the "Promo Code" field on the Cart page or during checkout and click Apply. You can use one code per order. Valid codes include: WELCOME10 (10% off first order), SAVE20 (20% off $200+), FLAT15 ($15 off $150+), and NEXUS25 (25% off on account anniversary).' },
  { cat: 'payments', q: 'Are the prices on your site inclusive of taxes?', a: 'Prices displayed on product pages are exclusive of taxes. Applicable sales tax, VAT, or GST will be calculated automatically during checkout based on your shipping address and the tax rules in your jurisdiction. Tax-exempt organizations can email support with a valid certificate before placing an order.' },
  { cat: 'account', q: 'How do I check the status of my order?', a: 'Once your order is placed, you can view its status and delivery estimate anytime from your Order History page in your account. We also send email confirmations at each major step — order received, payment confirmed, and dispatch.' },
  { cat: 'account', q: 'Can I modify or cancel an order after placing it?', a: 'Orders can be modified (size, color, address) or cancelled in full within 1 hour of placement, free of charge, if they haven\'t entered the fulfillment process yet. After that window, please contact support at support@urbanedgemart.com or call +1 (800) 555-URBAN and we\'ll do our best to accommodate.' },
  { cat: 'security', q: 'Is my payment and personal information secure?', a: 'Absolutely. We use bank-level 256-bit SSL encryption on every page that handles personal or payment data. We never store full credit or debit card numbers on our servers — all card processing is handled by PCI-DSS Level 1 compliant payment processors. You can read more in our Privacy Policy.' },
];

export default function FAQ() {
  const [open, setOpen] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchesCat = activeCat === 'all' || f.cat === activeCat;
      const matchesQuery = !query.trim() || (
        f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
      );
      return matchesCat && matchesQuery;
    });
  }, [activeCat, query]);

  const heroStatChips = [
    { label: 'Instant refunds', icon: HiCheckCircle },
    { label: '24/7 support', icon: HiChatBubbleLeftEllipsis },
    { label: 'Free 30-day returns', icon: HiArrowPath },
    { label: 'Secure checkout', icon: HiShieldCheck },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20 md:pb-28">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-gray-950 dark:to-purple-950/30" />
        <div className="absolute -top-24 -right-24 -z-10 h-80 w-80 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-700/20" />
        <div className="absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-700/20" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 md:py-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide uppercase">
            <HiQuestionMarkCircle size={14} /> Help Center
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mt-4 text-gray-900 dark:text-white leading-tight">
            Got Questions? We&apos;ve Got Answers.
          </h1>
          <p className="mt-5 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about shopping, shipping, returns, payments, and more — curated in one place.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <HiMagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setOpen(''); }}
              placeholder="Search help topics (e.g. shipping, refunds, coupon code)..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg shadow-gray-900/5 dark:shadow-black/20 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Hero stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
            {heroStatChips.map(({ label, icon: Icon }) => (
              <span key={label} className="inline-flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/60 backdrop-blur border border-gray-100 dark:border-gray-800 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                <Icon size={16} className="text-indigo-600 dark:text-indigo-400" /> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
          {categories.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => { setActiveCat(id); setOpen(''); }}
              className={`group inline-flex items-center gap-1.5 md:gap-2 px-3.5 py-2 md:px-4 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all border ${activeCat === id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              <Icon size={15} className={activeCat === id ? 'text-white' : 'text-gray-400 group-hover:text-indigo-500'} />
              {label}
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeCat === id ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-300'}`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12">
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((faq, i) => {
              const isOpen = open === `${faq.cat}-${i}`;
              return (
                <div
                  key={`${faq.cat}-${i}`}
                  className={`group rounded-2xl border transition-all overflow-hidden ${isOpen
                    ? 'border-indigo-200 dark:border-indigo-800/60 bg-white dark:bg-gray-900/70 shadow-md shadow-gray-900/5 dark:shadow-black/20 ring-1 ring-indigo-100 dark:ring-indigo-900/40'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/30 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? '' : `${faq.cat}-${i}`)}
                    className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <span className={`mt-0.5 shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-lg text-xs md:text-sm font-bold flex items-center justify-center transition-all ${isOpen
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/50'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-300'
                      }`}>
                        Q
                      </span>
                      <span className={`font-semibold text-sm md:text-base transition-colors ${isOpen ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white'}`}>
                        {faq.q}
                      </span>
                    </div>
                    <HiChevronDown size={20} className={`shrink-0 transition-transform duration-300 text-gray-400 group-hover:text-indigo-500 ${isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 md:pb-6 pl-[68px] md:pl-[76px]">
                          <p className="text-sm md:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-6 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30">
            <div className="text-5xl mb-4 opacity-50">🔍</div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">No matching questions found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
              Try different keywords or browse another category. You can also reach out to our support team directly.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <button onClick={() => { setQuery(''); setActiveCat('all'); }} className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
                Reset filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Still need help CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 md:mt-20">
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 dark:from-indigo-700 dark:via-indigo-800 dark:to-purple-800 text-white shadow-xl shadow-indigo-900/30">
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-purple-400/20 blur-2xl" />
          <div className="relative grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="font-serif text-2xl md:text-3xl font-bold">Still need help? We&apos;re just a message away.</h2>
              <p className="mt-3 text-sm md:text-base text-white/85 max-w-xl">
                Our real, friendly support team is available 24/7 to assist with anything. Average response time: under 15 minutes.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-1 gap-3">
              <Link to="/contact" className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-indigo-700 hover:bg-indigo-50 rounded-full text-sm font-semibold transition-all shadow-lg shadow-black/10">
                <HiEnvelope size={18} /> Email Us
              </Link>
              <a href="tel:+18005558722" className="flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-semibold transition-all border border-white/20 backdrop-blur">
                <HiPhone size={18} /> Call Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

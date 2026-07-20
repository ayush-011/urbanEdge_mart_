import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiTruck,
  HiArrowPath,
  HiCheckCircle,
  HiClock,
  HiGlobeAlt,
  HiReceiptPercent,
  HiShieldCheck,
  HiQuestionMarkCircle,
  HiChatBubbleLeftEllipsis,
  HiMapPin,
  HiEnvelope,
  HiCube,
} from 'react-icons/hi2';
import Button from '../components/ui/Button';

const TABS = [
  { id: 'shipping', label: 'Shipping Policy', icon: HiTruck },
  { id: 'returns', label: 'Returns & Refunds', icon: HiArrowPath },
  { id: 'international', label: 'International', icon: HiGlobeAlt },
];

const shippingSpeeds = [
  {
    name: 'Standard',
    icon: HiTruck,
    speed: '3 – 5 business days',
    fee: 'Free on orders $100+',
    altFee: '$5.99 flat',
    tagline: 'Great for most orders',
    popular: false,
  },
  {
    name: 'Express',
    icon: HiClock,
    speed: '1 – 2 business days',
    fee: '$12.99',
    altFee: 'Free on orders $300+',
    tagline: 'When you need it fast',
    popular: true,
  },
  {
    name: 'Next Day',
    icon: HiReceiptPercent,
    speed: 'Overnight (by 12 PM)',
    fee: '$29.99',
    altFee: 'Order by 2 PM EST',
    tagline: 'For absolute urgency',
    popular: false,
  },
  {
    name: 'Store Pickup',
    icon: HiMapPin,
    speed: 'Same day (2 – 4 hours)',
    fee: 'Free',
    altFee: 'Any order amount',
    tagline: 'Skip the wait entirely',
    popular: false,
  },
];

const shippingTimeline = [
  { step: 'Order Placed', time: 'Day 0', detail: 'Instant email confirmation + order receipt.' },
  { step: 'Processing', time: 'Day 0 – 1', detail: 'Picked & packed at our fulfillment center.' },
  { step: 'Shipped', time: 'Day 1 – 2', detail: 'Dispatched via carrier. Delivery updates sent by email.' },
  { step: 'Out for Delivery', time: 'Final day', detail: 'Carrier delivers to your door.' },
  { step: 'Delivered 🎉', time: 'Arrival day', detail: 'Delivered! Leave us a review if you love it.' },
];

const returnsSteps = [
  {
    icon: HiCheckCircle,
    title: '1. Initiate',
    desc: 'Go to Orders in your account, click Start Return, and tell us why you\'re returning the item.',
    sub: 'Takes less than 60 seconds',
  },
  {
    icon: HiReceiptPercent,
    title: '2. Pack & Ship',
    desc: 'Print the pre-paid return label we email you, stick it on the package, and drop it off at any carrier location.',
    sub: 'Return shipping is free for U.S. orders',
  },
  {
    icon: HiShieldCheck,
    title: '3. Inspection',
    desc: 'Once received at our returns center (2 – 5 business days), our team will inspect your return.',
    sub: 'Items must be unused & in original packaging',
  },
  {
    icon: HiShieldCheck,
    title: '4. Refund or Exchange',
    desc: 'Choose a refund to original payment (3 – 10 business days to process) or a free exchange for a different size or color.',
    sub: 'Exchanges ship in 48 hours at no extra cost',
  },
];

const eligibleReturnRows = [
  { product: 'Apparel (shirts, dresses, tops)', eligible: '✅ Yes', time: '30 days', notes: 'Unworn, tags attached' },
  { product: 'Shoes & Accessories', eligible: '✅ Yes', time: '30 days', notes: 'In original shoe box, unscuffed' },
  { product: 'Beauty & Fragrances', eligible: '⚠️ Limited', time: '14 days', notes: 'Only sealed & unused' },
  { product: 'Electronics', eligible: '✅ Yes', time: '15 days', notes: 'Factory box + all accessories' },
  { product: 'Final Sale items', eligible: '❌ No', time: '—', notes: 'Cannot be returned or exchanged' },
  { product: 'Custom / Personalized', eligible: '❌ No', time: '—', notes: 'Only if defective on arrival' },
];

const internationalZones = [
  { zone: 'Canada & Mexico', time: '5 – 8 days', rate: '$8.99', threshold: 'Free over $150', flag: '🇨🇦🇲🇽' },
  { zone: 'United Kingdom & EU', time: '7 – 10 days', rate: '$14.99', threshold: 'Free over $250', flag: '🇬🇧🇪🇺' },
  { zone: 'Asia-Pacific', time: '10 – 14 days', rate: '$19.99', threshold: 'Free over $300', flag: '🇯🇵🇦🇺🇸🇬' },
  { zone: 'Middle East & Africa', time: '12 – 18 days', rate: '$24.99', threshold: 'Free over $400', flag: '🇦🇪🇿🇦' },
  { zone: 'Latin America', time: '10 – 15 days', rate: '$21.99', threshold: 'Free over $300', flag: '🇧🇷🇦🇷🇨🇱' },
];

export default function ShippingReturns() {
  const [tab, setTab] = useState('shipping');

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20 md:pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-indigo-50 dark:from-emerald-950/30 dark:via-gray-950 dark:to-indigo-950/30" />
        <div className="absolute -top-16 right-0 -z-10 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-700/20" />
        <div className="absolute -bottom-20 -left-10 -z-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-700/20" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 md:py-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-wide uppercase">
            <HiShieldCheck size={14} /> Happiness Guaranteed
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mt-4 text-gray-900 dark:text-white leading-tight">
            Shipping & Returns
          </h1>
          <p className="mt-5 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fast, affordable shipping worldwide. Simple 30-day returns on almost everything — you&apos;re covered, always.
          </p>

          {/* Stat pills */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
            {[
              { icon: HiTruck, label: 'Free Shipping', value: '$100+' },
              { icon: HiArrowPath, label: 'Return Window', value: '30 days' },
              { icon: HiClock, label: 'Refund Time', value: '3–10 days' },
              { icon: HiGlobeAlt, label: 'Countries', value: '50+' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl p-4 bg-white/80 dark:bg-gray-900/60 backdrop-blur border border-gray-100 dark:border-gray-800 shadow-sm">
                <Icon size={24} className="text-emerald-600 dark:text-emerald-400 mx-auto" />
                <div className="text-2xl md:text-3xl font-bold mt-2 text-gray-900 dark:text-white">{value}</div>
                <div className="text-[11px] md:text-xs mt-0.5 text-gray-500 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="p-1.5 rounded-2xl bg-gray-100 dark:bg-gray-800/50 flex flex-col sm:flex-row gap-1.5 border border-gray-200 dark:border-gray-800">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm md:text-base font-semibold transition-all ${tab === id
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md shadow-gray-900/5 dark:shadow-black/20 ring-1 ring-gray-200 dark:ring-gray-700'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/40 dark:hover:bg-gray-800/40'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* SHIPPING TAB */}
      {tab === 'shipping' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
          {/* Speed cards */}
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="inline-flex w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 items-center justify-center">
                <HiTruck size={20} />
              </span>
              Choose your shipping speed
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
              Domestic (USA) shipping options, processed Mon–Sat (excluding US holidays).
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-6">
              {shippingSpeeds.map(({ name, icon: Icon, speed, fee, altFee, tagline, popular }) => (
                <div
                  key={name}
                  className={`relative rounded-2xl p-5 md:p-6 border transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gray-900/5 dark:hover:shadow-black/30 ${popular
                    ? 'border-indigo-200 dark:border-indigo-800/60 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/50 dark:to-gray-900 ring-1 ring-indigo-100 dark:ring-indigo-900/40'
                    : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50'
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                      Most Popular
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${popular
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-indigo-600/30'
                    : 'bg-gradient-to-br from-gray-700 to-gray-900 shadow-gray-900/20'
                  }`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tagline}</p>
                  <div className="mt-4 space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Delivery</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{speed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Fee</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Also</span>
                      <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{altFee}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order timeline */}
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="inline-flex w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 items-center justify-center">
                <HiClock size={20} />
              </span>
              From click to doorstep
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
              Here&apos;s what happens after you place an order.
            </p>
            <div className="mt-8 relative">
              <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-emerald-200 to-transparent dark:from-indigo-800 dark:via-emerald-800 md:-translate-x-1/2" />
              <div className="space-y-8">
                {shippingTimeline.map((item, idx) => (
                  <div
                    key={item.step}
                    className={`relative flex items-start gap-5 md:gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse md:text-right' : ''}`}
                  >
                    <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-900 border-4 border-indigo-500 dark:border-indigo-500 flex items-center justify-center text-xs md:text-sm font-bold text-indigo-600 dark:text-white z-10 shadow-lg shadow-indigo-500/20">
                      {idx + 1}
                    </div>
                    <div className={`flex-1 ml-20 md:ml-0 ${idx % 2 === 1 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'}`}>
                      <div className="rounded-2xl p-4 md:p-5 bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{item.step}</h3>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                            {item.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RETURNS TAB */}
      {tab === 'returns' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
          {/* Steps */}
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="inline-flex w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 items-center justify-center">
                <HiArrowPath size={20} />
              </span>
              The 4-step return process
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
              Simple, transparent, and stress-free.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-6">
              {returnsSteps.map(({ icon: Icon, title, desc, sub }, idx) => (
                <div
                  key={title}
                  className="relative rounded-2xl p-5 md:p-6 bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:shadow-gray-900/5 dark:hover:shadow-black/20 transition-all"
                >
                  <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-indigo-600/30 ring-4 ring-white dark:ring-gray-900">
                    {idx + 1}
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900 dark:text-white text-lg">{title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
                  <div className="mt-4 flex items-start gap-1.5 text-xs font-medium text-purple-600 dark:text-purple-400">
                    <HiCheckCircle size={14} className="mt-0.5 shrink-0" />
                    {sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility table */}
          <div className="rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-xl shadow-gray-900/5 dark:shadow-black/10">
            <div className="p-6 md:p-7 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <HiCube size={22} className="text-indigo-500" /> Return eligibility at a glance
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">See what can (and can&apos;t) be returned.</p>
              </div>
              <Link to="/faq" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 w-fit">
                <HiQuestionMarkCircle size={14} /> See full FAQ
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <th className="px-6 md:px-7 py-4 font-semibold">Product Category</th>
                    <th className="px-4 md:px-6 py-4 font-semibold">Returnable?</th>
                    <th className="px-4 md:px-6 py-4 font-semibold">Window</th>
                    <th className="px-4 md:px-6 py-4 font-semibold">Conditions</th>
                  </tr>
                </thead>
                <tbody>
                  {eligibleReturnRows.map((row, i) => (
                    <tr
                      key={row.product}
                      className={`border-b border-gray-50 dark:border-gray-800/70 ${i % 2 === 1 ? 'bg-gray-50/50 dark:bg-gray-900/30' : ''} hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-colors`}
                    >
                      <td className="px-6 md:px-7 py-4 font-medium text-gray-900 dark:text-white">{row.product}</td>
                      <td className="px-4 md:px-6 py-4 font-semibold whitespace-nowrap">{row.eligible}</td>
                      <td className="px-4 md:px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{row.time}</td>
                      <td className="px-4 md:px-6 py-4 text-gray-500 dark:text-gray-400">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* INTERNATIONAL TAB */}
      {tab === 'international' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
          <div className="rounded-3xl p-7 md:p-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-gray-950 dark:to-purple-950/40 border border-indigo-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <span className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white items-center justify-center shadow-lg shadow-indigo-600/30">
                <HiGlobeAlt size={24} />
              </span>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white">Shipping Worldwide 🌎</h2>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">Delivery estimates, rates & free-shipping thresholds by region.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {internationalZones.map((z) => (
                <div key={z.zone} className="group rounded-2xl p-5 bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-900/5 dark:hover:shadow-black/20 transition-all">
                  <div className="text-3xl">{z.flag}</div>
                  <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">{z.zone}</h3>
                  <div className="mt-4 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Arrival</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{z.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Base Rate</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{z.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Free Shipping</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{z.threshold}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl p-5 bg-white/70 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <HiShieldCheck size={18} className="text-indigo-600" /> Duties & Import Taxes
                </h4>
                <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                  Orders shipped outside the U.S. may be subject to import duties, VAT, or customs fees once the shipment reaches your destination country. These fees are determined by your local authorities and are the responsibility of the recipient.
                </p>
              </div>
              <div className="rounded-2xl p-5 bg-white/70 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <HiChatBubbleLeftEllipsis size={18} className="text-indigo-600" /> Need help?
                </h4>
                <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                  For questions about a specific country not listed, or to get a precise shipping quote, message our international team at <a href="mailto:intl@urbanedgemart.com" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">intl@urbanedgemart.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br from-emerald-600 via-teal-600 to-indigo-700 text-white shadow-xl shadow-emerald-900/30">
          <div className="absolute -top-12 -right-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid md:grid-cols-3 gap-6 md:gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="font-serif text-2xl md:text-3xl font-bold">Still unsure about something?</h2>
              <p className="mt-3 text-white/85 text-sm md:text-base max-w-xl">
                Our support team knows shipping and returns inside and out. Reach out — we usually reply in under 15 minutes.
              </p>
            </div>
            <div className="flex flex-wrap md:flex-col gap-3">
              <Link to="/contact" className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-emerald-700 hover:bg-emerald-50 rounded-full text-sm font-semibold transition-all shadow-lg shadow-black/10">
                <HiEnvelope size={18} /> Email Support
              </Link>
              <Link to="/orders" className="flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-semibold transition-all border border-white/20 backdrop-blur">
                <HiTruck size={18} /> Order History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

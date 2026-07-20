import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiClock,
  HiChatBubbleLeftEllipsis,
  HiShoppingBag,
  HiArrowPath,
  HiQuestionMarkCircle,
  HiPaperAirplane,
  HiCheckCircle,
  HiSparkles,
} from 'react-icons/hi2';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

const contactInfoCards = [
  {
    icon: HiEnvelope,
    title: 'Email Support',
    description: 'We reply to emails within 4 hours',
    value: 'support@urbanedgemart.com',
    href: 'mailto:support@urbanedgemart.com',
    gradient: 'from-indigo-500 to-blue-500',
    ring: 'ring-indigo-500/20',
  },
  {
    icon: HiPhone,
    title: 'Phone Support',
    description: 'Mon–Sat, 24/7 phone assistance',
    value: '+1 (800) 555-URBAN',
    href: 'tel:+18005558722',
    gradient: 'from-purple-500 to-pink-500',
    ring: 'ring-purple-500/20',
  },
  {
    icon: HiMapPin,
    title: 'Headquarters',
    description: 'Mon–Fri, 9:00 AM – 6:00 PM EST',
    value: '100 Commerce Street, New York, NY 10001',
    gradient: 'from-rose-500 to-orange-500',
    ring: 'ring-rose-500/20',
  },
  {
    icon: HiClock,
    title: 'Working Hours',
    description: 'Store & fulfillment hours',
    value: 'Mon–Sat · 9:00 AM – 10:00 PM',
    gradient: 'from-emerald-500 to-teal-500',
    ring: 'ring-emerald-500/20',
  },
];

const quickLinks = [
  { label: 'Order History', icon: HiShoppingBag, to: '/orders', desc: 'View your past purchases' },
  { label: 'Shipping & Returns', icon: HiArrowPath, to: '/shipping-returns', desc: 'Policies & timelines' },
  { label: 'FAQ & Help Center', icon: HiQuestionMarkCircle, to: '/faq', desc: 'Instant answers to common questions' },
  { label: 'Live Chat', icon: HiChatBubbleLeftEllipsis, to: '#', desc: 'Available 24/7 (coming soon)', soon: true },
];

const socialProof = [
  { label: 'Average response time', value: '< 15 min', light: 'text-emerald-600', dark: 'dark:text-emerald-400' },
  { label: 'Satisfied customers', value: '98.6%', light: 'text-indigo-600', dark: 'dark:text-indigo-400' },
  { label: 'Support team size', value: '120+ agents', light: 'text-purple-600', dark: 'dark:text-purple-400' },
  { label: 'Countries covered', value: '50+', light: 'text-rose-600', dark: 'dark:text-rose-400' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', category: 'general', message: '' });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const categories = [
    { id: 'general', label: 'General Inquiry' },
    { id: 'order', label: 'Order Help' },
    { id: 'return', label: 'Return / Exchange' },
    { id: 'billing', label: 'Billing Issue' },
    { id: 'business', label: 'Bulk / Business' },
    { id: 'other', label: 'Something Else' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    addToast('Message sent successfully! We will get back to you soon.', 'success');
    setForm({ name: '', email: '', subject: '', category: 'general', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20 md:pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/80 via-white to-white dark:from-indigo-950/40 dark:via-gray-950 dark:to-gray-950" />
        <div className="absolute top-10 left-1/4 -z-10 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-700/20" />
        <div className="absolute top-40 right-1/4 -z-10 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-700/20" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400 shadow-sm">
            <HiSparkles size={14} /> Get in Touch
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mt-4 text-gray-900 dark:text-white leading-tight">
            We&apos;d Love to Hear From You
          </h1>
          <p className="mt-5 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question, feedback, or need help with an order? Fill out the form below or reach out using any of our contact channels.
          </p>

          {/* Social proof strip */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
            {socialProof.map((stat) => (
              <div key={stat.label} className="rounded-2xl px-4 py-4 md:px-6 md:py-5 bg-white/80 dark:bg-gray-900/60 backdrop-blur border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className={`text-2xl md:text-3xl font-bold ${stat.light} ${stat.dark}`}>
                  {stat.value}
                </div>
                <div className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-2">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {contactInfoCards.map(({ icon: Icon, title, description, value, href, gradient, ring }) => (
            <a
              key={title}
              href={href || undefined}
              className="group relative rounded-2xl p-5 md:p-6 bg-white dark:bg-gray-900/70 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-900/5 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg ring-8 ${ring} text-white flex items-center justify-center transition-transform group-hover:scale-105`}>
                <Icon size={24} className="md:w-6 md:h-6" />
              </div>
              <h3 className="mt-4 md:mt-5 font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-1 text-xs md:text-sm text-gray-500 dark:text-gray-400">{description}</p>
              <p className="mt-3 text-sm md:text-[15px] font-semibold text-indigo-600 dark:text-indigo-400 break-words leading-snug group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                {value}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Form + Side Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-white dark:bg-gray-900/70 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-900/5 dark:shadow-black/20 overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-indigo-100 dark:bg-indigo-900/30 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <HiPaperAirplane size={22} className="-rotate-45" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white">Send us a message</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">We&apos;ll respond within 24 hours, usually faster.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          type="button"
                          key={cat.id}
                          onClick={() => setForm({ ...form, category: cat.id })}
                          className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border transition-all ${form.category === cat.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30'
                            : 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Input
                    label="Subject"
                    placeholder="How can we help you?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                      Your Message
                      <span className={`float-right text-xs ${form.message.length >= 50 ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500'}`}>
                        {form.message.length} / 2000
                      </span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value.slice(0, 2000) })}
                      required
                      rows={6}
                      placeholder="Please include as many details as possible (order number, product name, etc.)..."
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <label className="inline-flex items-start gap-2 cursor-pointer select-none">
                      <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                      <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        I agree to the <Link to="/privacy" className="font-medium text-indigo-600 dark:text-indigo-400 underline-offset-2 hover:underline">Privacy Policy</Link> and consent to being contacted.
                      </span>
                    </label>
                    <Button type="submit" loading={loading} size="lg" className="w-full sm:w-auto shadow-lg shadow-indigo-600/25 min-w-[200px]">
                      <HiPaperAirplane size={18} className="-rotate-45" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Side Panel - Quick Links + Map */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Quick links */}
            <div className="rounded-3xl p-6 md:p-7 bg-gradient-to-br from-gray-50 to-indigo-50/60 dark:from-gray-900 dark:to-indigo-950/50 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <HiCheckCircle size={18} className="text-indigo-600" />
                Solve issues instantly
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Try these self-service options for a quicker resolution.</p>
              <div className="mt-5 space-y-2.5">
                {quickLinks.map(({ label, icon: Icon, to, desc, soon }) => (
                  soon ? (
                    <div key={label} className="flex items-center gap-3 p-3 rounded-2xl opacity-60 bg-white/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                      <div className="w-10 h-10 shrink-0 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-600 dark:text-gray-300">{label}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{desc}</div>
                      </div>
                      <span className="shrink-0 text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">Soon</span>
                    </div>
                  ) : (
                    <Link
                      key={label}
                      to={to}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md hover:shadow-gray-900/5 dark:hover:shadow-black/20 transition-all group"
                    >
                      <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</div>
                      </div>
                      <div className="shrink-0 text-gray-400 group-hover:translate-x-1 group-hover:text-indigo-500 transition-all">
                        →
                      </div>
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Map / Location preview */}
            <div className="rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 shadow-lg shadow-gray-900/5 dark:shadow-black/20">
              <div className="relative h-48 md:h-56 bg-gradient-to-br from-indigo-100 via-purple-50 to-rose-50 dark:from-indigo-900/40 dark:via-purple-900/30 dark:to-gray-900 overflow-hidden">
                <div className="absolute inset-0 opacity-40 dark:opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.12) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-indigo-500/20 rounded-full animate-ping" />
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-600/40 flex items-center justify-center ring-8 ring-white dark:ring-gray-900">
                      <HiMapPin size={24} />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-sm">
                  📍 Manhattan, NYC
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur text-[10px] font-bold text-gray-600 dark:text-gray-300 shadow-sm">
                  Open now · Closes 6 PM
                </div>
              </div>
              <div className="p-5 bg-white dark:bg-gray-900/80">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <HiMapPin size={16} className="text-indigo-600" /> UrbanEdge Mart HQ — Flagship Store
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  100 Commerce Street, Suite 200, SoHo District, New York, NY 10001, USA
                </p>
                <div className="mt-4 flex gap-2">
                  <a
                    href="https://maps.google.com/?q=SoHo,NY"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2 text-xs font-semibold rounded-xl bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors"
                  >
                    Get Directions
                  </a>
                  <a
                    href="tel:+18005558722"
                    className="flex-1 text-center py-2 text-xs font-semibold rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition-colors border border-indigo-100 dark:border-indigo-900/50"
                  >
                    Call Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

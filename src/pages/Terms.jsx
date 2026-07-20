export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Last updated: July 28, 2026</p>
      {[
        { title: 'Acceptance of Terms', text: 'By accessing and using UrbanEdge Mart, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.' },
        { title: 'Products & Pricing', text: 'All products are subject to availability. We reserve the right to modify prices at any time. Prices displayed include applicable taxes where noted.' },
        { title: 'Orders & Payment', text: 'Placing an order constitutes an offer to purchase. We may refuse or cancel orders at our discretion. Payment must be received before order processing.' },
        { title: 'Shipping & Delivery', text: 'Delivery times are estimates and not guaranteed. Risk of loss passes to you upon delivery to the carrier.' },
        { title: 'Returns & Refunds', text: 'Returns are accepted within 30 days of delivery for unused items in original packaging. Refunds are processed within 5-10 business days.' },
        { title: 'Limitation of Liability', text: 'UrbanEdge Mart shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.' },
      ].map(({ title, text }) => (
        <section key={title} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
        </section>
      ))}
    </div>
  );
}
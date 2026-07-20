export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose dark:prose-invert">
      <h1 className="font-serif text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Last updated: July 28, 2026</p>
      {[
        { title: 'Information We Collect', text: 'We collect information you provide directly, such as name, email, shipping address, and payment details when you create an account or place an order. We also collect browsing data through cookies to improve your experience.' },
        { title: 'How We Use Your Information', text: 'Your information is used to process orders, provide customer support, send promotional communications (with your consent), and improve our services.' },
        { title: 'Data Security', text: 'We implement industry-standard security measures including SSL encryption to protect your personal and payment information.' },
        { title: 'Your Rights', text: 'You have the right to access, update, or delete your personal data. Contact us at privacy@urbanedgemart.com for any data-related requests.' },
        { title: 'Cookies', text: 'We use cookies to remember your preferences, keep you logged in, and analyze site traffic. You can manage cookie preferences in your browser settings.' },
      ].map(({ title, text }) => (
        <section key={title} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
        </section>
      ))}
    </div>
  );
}
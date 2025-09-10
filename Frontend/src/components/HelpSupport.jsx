import { useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-hot-toast';

export default function HelpSupport() {
  const [openFaq, setOpenFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Support form submitted:', contactForm);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    
    setTimeout(() =>toast.success('Thank you for your message! We\'ll get back to you within 24 hours.'), 1500);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const faqs = [
    {
      question: "How do I search for properties on EstateHub?",
      answer: "Use our search feature to filter properties by location, price range, property type, and amenities. You can also browse our featured listings on the homepage or use advanced filters for more specific results."
    },
    {
      question: "How do I list my property for sale or rent?",
      answer: "Create an account and go to your profile page. Click 'Create Listing' and fill in all the required details including photos, description, price, and property features. Your listing will be reviewed and published within 24 hours."
    },
    {
      question: "How do I contact property owners or agents?",
      answer: "Each property listing has contact information for the owner or agent. You can call, email, or use our built-in messaging system to inquire about properties you're interested in."
    },
    {
      question: "What fees are associated with using EstateHub?",
      answer: "Browsing and searching properties is completely free. Property owners pay a small listing fee when their property is successfully rented or sold. No hidden charges for buyers or renters."
    },
    {
      question: "How do I know if a listing is legitimate?",
      answer: "All listings are verified by our team. Look for the 'Verified' badge on listings. We also provide agent credentials and reviews from previous clients to help you make informed decisions."
    },
    {
      question: "Can I save properties for later viewing?",
      answer: "Yes! Create an account and use the heart icon on any listing to save it to your favorites. You can access all saved properties from your profile dashboard."
    },
    {
      question: "What should I do if I encounter a problem with a listing?",
      answer: "Report any suspicious or problematic listings using the 'Report' button on the property page. Our team investigates all reports within 24 hours and takes appropriate action."
    },
    {
      question: "How do I update or delete my property listing?",
      answer: "Go to your profile dashboard and find your active listings. You can edit details, update photos, change pricing, or delete listings at any time. Changes are reflected immediately on the site."
    }
  ];

  const supportTopics = [
    {
      title: "🏠 Property Listings",
      description: "Learn how to create, manage, and optimize your property listings",
      link: "/profile"
    },
    {
      title: "🔍 Search & Browse",
      description: "Tips for finding the perfect property using our search tools",
      link: "/search"
    },
    {
      title: "💰 Pricing & Fees",
      description: "Understand our pricing structure and payment processes",
      link: "/help/pricing"
    },
    {
      title: "👥 Account Management",
      description: "Manage your profile, settings, and saved properties",
      link: ""
    },
    {
      title: "🛡️ Safety & Security",
      description: "Tips for safe property transactions and avoiding scams",
      link: ""
    },
    {
      title: "📱 Mobile App",
      description: "Get help with our mobile app features and functionality",
      link: ""
    }
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-slate-900 text-white py-16'>
        <div className='max-w-6xl mx-auto px-3'>
          <h1 className='text-4xl lg:text-5xl font-bold mb-4'>
            🆘 Help & Support Center
          </h1>
          <p className='text-gray-300 text-lg max-w-2xl'>
            Get the help you need to make the most of EstateHub. Find answers to common questions or contact our support team.
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-3 py-12'>
        {/* Quick Help Topics */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold text-slate-700 mb-8'>Popular Help Topics</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {supportTopics.map((topic, index) => (
              <Link
                key={index}
                to={topic.link}
                className='bg-slate-900 shadow-slate-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow  hover:border hover:border-white'
              >
                <h3 className='text-xl font-semibold text-white mb-3'>{topic.title}</h3>
                <p className='text-gray-400 text-sm'>{topic.description}</p>
                <span className='text-blue-600 text-sm font-medium mt-4 inline-block hover:underline'>
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold text-slate-700 mb-8'>Frequently Asked Questions</h2>
          <div className='bg-white rounded-lg shadow-md'>
            {faqs.map((faq, index) => (
              <div key={index} className='border-b border-gray-200 last:border-b-0'>
                <button
                  onClick={() => toggleFaq(index)}
                  className='w-full text-left p-6 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50'
                >
                  <div className='flex justify-between items-center'>
                    <h3 className='text-lg font-medium text-slate-700 pr-4'>
                      {faq.question}
                    </h3>
                    <span className={`text-2xl text-blue-600 transition-transform ${openFaq === index ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </div>
                </button>
                {openFaq === index && (
                  <div className='px-6 pb-6'>
                    <p className='text-gray-600 leading-relaxed'>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support Form */}
        <section className='mb-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <div className='bg-slate-900 p-8 rounded-lg shadow-md'>
              <h2 className='text-2xl font-semibold text-white mb-6'>Contact Support</h2>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label htmlFor='name' className='block text-sm font-medium text-white mb-2'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Enter your full name'
                  />
                </div>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-white mb-2'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Enter your email address'
                  />
                </div>
                <div>
                  <label htmlFor='subject' className='block text-sm font-medium text-white mb-2'>
                    Subject
                  </label>
                  <select
                    id='subject'
                    name='subject'
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-slate-700'
                  >
                    <option value=''>Select a topic</option>
                    <option value='listing-help'>Property Listing Help</option>
                    <option value='search-issues'>Search Issues</option>
                    <option value='account-problems'>Account Problems</option>
                    <option value='payment-billing'>Payment & Billing</option>
                    <option value='technical-support'>Technical Support</option>
                    <option value='report-listing'>Report a Listing</option>
                    <option value='other'>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor='message' className='block text-sm font-medium text-white mb-2'>
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Describe your issue or question in detail...'
                  />
                </div>
                <button
                  type='submit'
                  className='w-full bg-slate-700 text-white py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors font-medium'
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className='space-y-8'>
              <div className='bg-white p-8 rounded-lg shadow-md'>
                <h2 className='text-2xl font-semibold text-slate-700 mb-6'>Get In Touch</h2>
                <div className='space-y-4'>
                  <div className='flex items-center'>
                    <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4'>
                      📞
                    </div>
                    <div>
                      <h3 className='font-medium text-slate-700'>Phone Support</h3>
                      <p className='text-gray-600'>+1 (555) 123-4567</p>
                      <p className='text-sm text-gray-500'>Mon-Fri: 9AM-6PM EST</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4'>
                      📧
                    </div>
                    <div>
                      <h3 className='font-medium text-slate-700'>Email Support</h3>
                      <p className='text-gray-600'>support@estatehub.com</p>
                      <p className='text-sm text-gray-500'>Response within 24 hours</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4'>
                      💬
                    </div>
                    <div>
                      <h3 className='font-medium text-slate-700'>Live Chat</h3>
                      <p className='text-gray-600'>Available on website</p>
                      <p className='text-sm text-gray-500'>Mon-Fri: 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
                <h3 className='text-lg font-semibold text-blue-800 mb-3'>💡 Quick Tip</h3>
                <p className='text-blue-700 text-sm'>
                  Before contacting support, try searching our FAQ section above. Most common questions are answered there instantly!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section>
          <h2 className='text-3xl font-semibold text-slate-700 mb-8'>Additional Resources</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-white p-6 rounded-lg shadow-md text-center'>
              <div className='text-4xl mb-4'>📚</div>
              <h3 className='text-xl font-semibold text-slate-700 mb-2'>User Guide</h3>
              <p className='text-gray-600 text-sm mb-4'>
                Comprehensive guide to using all EstateHub features
              </p>
              <Link to='/user-guide' className='text-blue-600 hover:underline font-medium'>
                Read Guide
              </Link>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md text-center'>
              <div className='text-4xl mb-4'>🎥</div>
              <h3 className='text-xl font-semibold text-slate-700 mb-2'>Video Tutorials</h3>
              <p className='text-gray-600 text-sm mb-4'>
                Step-by-step video tutorials for common tasks
              </p>
              <Link to='/tutorials' className='text-blue-600 hover:underline font-medium'>
                Watch Videos
              </Link>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md text-center'>
              <div className='text-4xl mb-4'>💬</div>
              <h3 className='text-xl font-semibold text-slate-700 mb-2'>Community Forum</h3>
              <p className='text-gray-600 text-sm mb-4'>
                Connect with other users and share experiences
              </p>
              <Link to='/community' className='text-blue-600 hover:underline font-medium'>
                Join Discussion
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
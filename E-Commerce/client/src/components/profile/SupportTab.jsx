import { HelpCircle, MessageCircle, FileText, PhoneCall, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openChat } from '../../redux/slices/uiSlice';

const SupportTab = () => {
  const dispatch = useDispatch();

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Chat Support',
      description: 'Chat with our support team for quick resolutions.',
      action: 'Start Chat',
      onClick: () => dispatch(openChat()),
      primary: true
    },
    {
      icon: PhoneCall,
      title: 'Call Us',
      description: 'Available Mon-Fri, 9 AM to 6 PM EST.',
      action: '+1 (800) 123-4567',
      link: 'tel:+18001234567',
      primary: false
    },
    {
      icon: FileText,
      title: 'Raise a Ticket',
      description: 'Submit a detailed query. We reply within 24 hours.',
      action: 'Create Ticket',
      link: '#',
      primary: false
    }
  ];

  const quickLinks = [
    { title: 'Return Policy', path: '/shipping-policy' },
    { title: 'Refund Policy', path: '/terms' },
    { title: 'Terms of Service', path: '/terms' },
    { title: 'Privacy Policy', path: '/privacy-policy' },
    { title: 'Shipping Information', path: '/shipping-policy' },
    { title: 'Size Guide', path: '/faq' },
  ];

  const faqs = [
    { q: 'How do I track my order?', a: 'You can track your order in the "My Orders" tab by clicking on "View Details".' },
    { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for unworn items with tags attached.' },
    { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-black text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold tracking-wide mb-2 flex items-center gap-2">
            <HelpCircle size={24} /> Need Help?
          </h2>
          <p className="text-gray-300 max-w-md">Our customer service team is here to assist you with any questions or concerns.</p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
          <HelpCircle size={150} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportOptions.map((option, idx) => {
          const Icon = option.icon;
          const Component = option.onClick ? 'button' : 'a';
          return (
            <Component 
              key={idx}
              href={option.link}
              onClick={option.onClick}
              className={`p-6 rounded-xl border transition-all duration-300 group ${
                option.primary 
                  ? 'bg-white border-black shadow-md hover:shadow-xl' 
                  : 'bg-white border-gray-100 shadow-sm hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                option.primary ? 'bg-black text-white' : 'bg-gray-100 text-black group-hover:bg-gray-200'
              } transition-colors`}>
                <Icon size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">{option.title}</h3>
              <p className="text-sm text-gray-500 mb-6">{option.description}</p>
              <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${
                option.primary ? 'text-black' : 'text-gray-600'
              }`}>
                {option.action} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* FAQs */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold tracking-wide mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                <h4 className="font-bold text-sm mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
            <Link to="/faq" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:text-gray-500 transition-colors mt-2">
              View All FAQs <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold tracking-wide mb-6">Quick Links</h3>
          <ul className="space-y-4">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <Link to={link.path} className="flex items-center justify-between text-sm text-gray-700 hover:text-black hover:font-semibold transition-all group">
                  {link.title}
                  <ExternalLink size={14} className="text-gray-400 group-hover:text-black opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SupportTab;

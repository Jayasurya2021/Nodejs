import { motion } from 'framer-motion';

const StaticPageTemplate = ({ title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center"
  >
    <div className="w-12 h-1 bg-yellow-400 mb-6" />
    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-6">{title}</h1>
    <p className="text-gray-500 max-w-2xl leading-relaxed text-lg">{description}</p>
  </motion.div>
);

export const Categories = () => <StaticPageTemplate title="Categories" description="Browse our curated collections and product categories." />;
export const Brands = () => <StaticPageTemplate title="Brands" description="Discover products from our premium partner brands." />;
export const Contact = () => <StaticPageTemplate title="Contact Us" description="Get in touch with our customer service team for support and inquiries." />;
export const FAQ = () => <StaticPageTemplate title="FAQ" description="Find answers to frequently asked questions about shipping, returns, and more." />;
export const Reviews = () => <StaticPageTemplate title="Reviews" description="See what our community has to say about our products." />;
export const SellerList = () => <StaticPageTemplate title="Our Sellers" description="Meet the creators and boutiques behind our exclusive items." />;
export const Offers = () => <StaticPageTemplate title="Special Offers" description="Explore current promotions, discounts, and exclusive deals." />;
export const Blogs = () => <StaticPageTemplate title="Blogs" description="Read our latest articles on fashion trends, style guides, and brand news." />;
export const PrivacyPolicy = () => <StaticPageTemplate title="Privacy Policy" description="Learn how we collect, use, and protect your personal information." />;
export const Terms = () => <StaticPageTemplate title="Terms of Service" description="Read the rules and guidelines for using our platform." />;
export const ShippingPolicy = () => <StaticPageTemplate title="Shipping Policy" description="Information regarding domestic and international shipping rates and delivery times." />;

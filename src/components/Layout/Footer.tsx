import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, Facebook, Twitter, Instagram, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {/* Brand Logo Image - Replace src with your logo */}
              <div className="flex-shrink-0">
                <img
                  src="/logo-white.png"
                  alt="CocoManthra Logo"
                  className="h-12 w-12 object-contain"
                  onError={(e) => {
                    // Fallback to icon if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Fallback icon (hidden by default) */}
                <div className="hidden bg-green-100 rounded-full p-3 h-12 w-12 flex items-center justify-center">
                  <div className="h-6 w-6 bg-green-600 rounded-full"></div>
                </div>
              </div>
              
              {/* Brand Name Image - Replace src with your brand name image */}
              <div className="flex flex-col">
                <img
                  src="/brand-name-white.png"
                  alt="CocoManthra"
                  className="h-7 object-contain mb-1"
                  onError={(e) => {
                    // Fallback to text if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Fallback text (hidden by default) */}
                <div className="hidden">
                  <span className="text-xl font-bold">CocoManthra</span>
                </div>
                
                {/* Tagline */}
                <div className="text-sm text-green-400">Sustainable Handmade Coconut Products</div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md">
              We transform discarded coconut shells into beautiful, functional products. 
              Each handcrafted piece supports sustainable living while celebrating the 
              natural beauty of coconut materials. Join us in creating a more sustainable future.
            </p>
            <div className="flex items-center space-x-2 text-green-400 mb-4">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Handmade with love • Sustainably sourced • Eco-friendly</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-300 hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/products?collection=Bowls & Tableware" className="text-gray-300 hover:text-white transition-colors">
                  Coconut Bowls
                </Link>
              </li>
              <li>
                <Link to="/products?collection=Home Decor" className="text-gray-300 hover:text-white transition-colors">
                  Home Decor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-green-400" />
                <a 
                  href="tel:+91-9248788585" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91-9248788585
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-green-400" />
                <a 
                  href="https://wa.me/919248788585" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-green-400" />
                <a 
                  href="mailto:hello@cocomanthra.com" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  hello@cocomanthra.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 CocoManthra. All rights reserved. Crafted with care for a sustainable future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
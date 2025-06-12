import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Job<span className="text-[#6A38C2]">Seek</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Your trusted platform for finding the right jobs and hiring the best talent.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/jobs" className="hover:text-white">Jobs</Link></li>
            <li><Link to="/browse" className="hover:text-white">Browse</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/signup" className="hover:text-white">Sign Up</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p className="text-sm">Email: support@jobseek.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Subscribe</h3>
          <p className="text-sm mb-3">Get job alerts and updates straight to your inbox.</p>
          <form className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm rounded-md sm:rounded-l-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 outline-none"
            />
            <button
              type="submit"
              className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-4 py-2 text-sm font-medium rounded-md sm:rounded-l-none sm:rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 px-6 max-w-7xl mx-auto text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} JobSeek. All rights reserved.
        </p>
        <div className="flex gap-4 justify-center">
          <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
          <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
          <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
          <Linkedin className="w-5 h-5 hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

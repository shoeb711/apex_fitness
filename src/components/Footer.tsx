
import React from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="space-y-4">
          <div className="flex items-center space-x-6">
            <a href="/" className="hover:text-accent">
              Home
            </a>
            <a href="/programs" className="hover:text-accent">
              Programs
            </a>
            <a href="/membership" className="hover:text-accent">
              Membership
            </a>
            <a href="/blog" className="hover:text-accent">
              Blog
            </a>
            <a href="/contact" className="hover:text-accent">
              Contact
            </a>
            <a href="/about" className="hover:text-accent">
              About Us
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {/* Social media icons here */}
            <a href="#" className="hover:text-accent">
              {/* Facebook Icon */}
              Facebook
            </a>
            <a href="#" className="hover:text-accent">
              {/* Twitter Icon */}
              Twitter
            </a>
            <a href="#" className="hover:text-accent">
              {/* Instagram Icon */}
              Instagram
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <Input type="email" placeholder="Enter your email" className="mr-2" />
            <Button>Send</Button>
          </div>
          <div>
            <a href="/terms" className="text-sm hover:text-accent">
              Terms of Service
            </a>
            <a href="/privacy" className="text-sm hover:text-accent">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

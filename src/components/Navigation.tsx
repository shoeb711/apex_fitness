
import React from 'react';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

const Navigation = () => {
  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-bold">
          Apex Fitness
        </a>
        <div className="flex items-center space-x-6">
          <a href="/" className="hover:text-accent">
            Home
          </a>
          <a href="/programs" className="hover:text-accent">
            Programs
          </a>
          <a href="/trainers" className="hover:text-accent">
            Trainers
          </a>
          <a href="/membership" className="hover:text-accent">
            Membership
          </a>
          <a href="/contact" className="hover:text-accent">
            Contact
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Login</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

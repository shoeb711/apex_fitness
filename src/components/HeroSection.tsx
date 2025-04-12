
import React from 'react';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

const HeroSection = () => {
  return (
    <div className="bg-primary text-white py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            For Your <span className="text-accent">Health</span> and{' '}
            <span className="text-accent">Fitness</span> Goals in No Time
          </h1>
          <p className="text-lg">
            Unlock your potential with our expert training and personalized
            fitness programs.
          </p>
          <Button className="bg-accent text-primary hover:bg-green-500">
            Book a Class
          </Button>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1517836357463-dcaaa9c3c578?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fit Man Training"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

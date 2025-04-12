
import React from 'react';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

const CallToAction = () => {
  return (
    <div className="bg-primary text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Discover Your Potential</h2>
        <p className="text-lg mb-8">
          Start your fitness journey today and achieve your goals with us.
        </p>
        <Button className="bg-accent text-primary hover:bg-green-500">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;

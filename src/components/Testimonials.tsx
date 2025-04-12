
import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

const Testimonials = () => {
  return (
    <div className="bg-secondary py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Members Say</h2>
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <p className="text-lg italic">
              "I've never felt better! The personal training and workout
              programs have transformed my life."
            </p>
            <div className="flex items-center justify-center mt-4">
              <Avatar className="mr-4">
                <AvatarImage src="https://images.unsplash.com/photo-1573496879535-11d894f4799a?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-semibold">Jane Doe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

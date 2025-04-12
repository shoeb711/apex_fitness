
import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

const ServiceCards = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Training</CardTitle>
            <CardDescription>
              Get personalized training from certified fitness experts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Achieve your fitness goals with one-on-one attention and tailored
              workout plans.
            </p>
            <Button className="mt-4 bg-primary text-white hover:bg-blue-700">
              Learn More
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-accent text-primary">
          <CardHeader>
            <CardTitle>Workout Programs</CardTitle>
            <CardDescription>
              Discover a variety of workout programs for all fitness levels.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Find the perfect workout routine to reach your specific goals,
              from weight loss to muscle gain.
            </p>
            <Button className="mt-4 bg-primary text-white hover:bg-blue-700">
              Explore Programs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Program &amp; Diet</CardTitle>
            <CardDescription>
              Combine expert workout programs with personalized diet plans.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Optimize your results with comprehensive fitness and nutrition
              guidance.
            </p>
            <Button className="mt-4 bg-primary text-white hover:bg-blue-700">
              View Diet Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceCards;

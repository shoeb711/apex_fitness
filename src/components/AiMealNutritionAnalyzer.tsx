
'use client';

import React, {useState} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {
  AnalyzeMealDescriptionInput,
  AnalyzeMealDescriptionOutput,
  analyzeMealDescription,
} from '@/ai/flows/meal-nutrition-analyzer';

const NutritionItem = ({label, value}: { label: string; value: number }) => (
  <div className="flex justify-between items-center py-2 border-b border-muted">
    <span className="font-medium">{label}</span>
    <span>{value}g</span>
  </div>
);

export const AiMealNutritionAnalyzer = () => {
  const [mealDescription, setMealDescription] = useState('');
  const [nutrition, setNutrition] = useState<AnalyzeMealDescriptionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeMeal = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result: AnalyzeMealDescriptionOutput = await analyzeMealDescription({
        mealDescription,
      } as AnalyzeMealDescriptionInput);
      setNutrition(result);
    } catch (e: any) {
      setError(e.message || 'Failed to analyze meal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        AI Meal Nutrition Analyzer
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Textarea
            placeholder="Enter a detailed meal description..."
            rows={5}
            value={mealDescription}
            onChange={e => setMealDescription(e.target.value)}
          />
          <Button
            className="mt-4 w-full bg-primary text-white hover:bg-blue-700"
            onClick={handleAnalyzeMeal}
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Meal'}
          </Button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Nutrition Breakdown</h3>
          {nutrition ? (
            <div className="space-y-4">
              <NutritionItem label="Calories" value={nutrition.nutrition.calories} />
              <NutritionItem label="Protein" value={nutrition.nutrition.protein} />
              <NutritionItem label="Carbohydrates" value={nutrition.nutrition.carbohydrates} />
              <NutritionItem label="Fat" value={nutrition.nutrition.fat} />
            </div>
          ) : (
            <p>Enter a meal description to see the nutrition breakdown.</p>
          )}
        </div>
      </div>
    </div>
  );
};

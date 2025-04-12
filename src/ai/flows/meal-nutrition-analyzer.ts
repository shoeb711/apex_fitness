'use server';
/**
 * @fileOverview Analyzes a meal description to provide a nutritional breakdown.
 *
 * - analyzeMealDescription - A function that takes a meal description and returns its nutritional analysis.
 * - AnalyzeMealDescriptionInput - The input type for the analyzeMealDescription function.
 * - AnalyzeMealDescriptionOutput - The return type for the analyzeMealDescription function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {analyzeMeal, Nutrition} from '@/services/nutrition-analysis';

const AnalyzeMealDescriptionInputSchema = z.object({
  mealDescription: z.string().describe('A detailed description of the meal.'),
});
export type AnalyzeMealDescriptionInput = z.infer<typeof AnalyzeMealDescriptionInputSchema>;

const AnalyzeMealDescriptionOutputSchema = z.object({
  nutrition: z.object({
    calories: z.number().describe('The number of calories in the meal.'),
    protein: z.number().describe('The amount of protein in grams.'),
    carbohydrates: z.number().describe('The amount of carbohydrates in grams.'),
    fat: z.number().describe('The amount of fat in grams.'),
  }).describe('Nutritional breakdown of the meal.'),
});
export type AnalyzeMealDescriptionOutput = z.infer<typeof AnalyzeMealDescriptionOutputSchema>;

export async function analyzeMealDescription(input: AnalyzeMealDescriptionInput): Promise<AnalyzeMealDescriptionOutput> {
  return analyzeMealDescriptionFlow(input);
}

const analyzeMealDescriptionPrompt = ai.definePrompt({
  name: 'analyzeMealDescriptionPrompt',
  input: {
    schema: z.object({
      mealDescription: z.string().describe('A detailed description of the meal.'),
    }),
  },
  output: {
    schema: z.object({
      calories: z.number().describe('The number of calories in the meal.'),
      protein: z.number().describe('The amount of protein in grams.'),
      carbohydrates: z.number().describe('The amount of carbohydrates in grams.'),
      fat: z.number().describe('The amount of fat in grams.'),
    }),
  },
  prompt: `Analyze the following meal description and provide a nutritional breakdown including calories, protein, carbohydrates, and fat.

Meal Description: {{{mealDescription}}}

Provide the output as a JSON object.
`,
});

const analyzeMealDescriptionFlow = ai.defineFlow<
  typeof AnalyzeMealDescriptionInputSchema,
  typeof AnalyzeMealDescriptionOutputSchema
>({
  name: 'analyzeMealDescriptionFlow',
  inputSchema: AnalyzeMealDescriptionInputSchema,
  outputSchema: AnalyzeMealDescriptionOutputSchema,
}, async (input) => {
  const nutrition: Nutrition = await analyzeMeal(input.mealDescription);

  return {
    nutrition: {
      calories: nutrition.calories,
      protein: nutrition.protein,
      carbohydrates: nutrition.carbohydrates,
      fat: nutrition.fat,
    },
  };
});

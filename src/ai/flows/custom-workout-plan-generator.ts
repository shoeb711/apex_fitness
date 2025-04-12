// The directive tells the Next.js runtime that it should be run on the server.
'use server';

/**
 * @fileOverview Generates a custom workout plan based on user input.
 *
 * - generateCustomWorkoutPlan - A function that generates a custom workout plan.
 * - CustomWorkoutPlanInput - The input type for the generateCustomWorkoutPlan function.
 * - CustomWorkoutPlanOutput - The return type for the generateCustomWorkoutPlan function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const CustomWorkoutPlanInputSchema = z.object({
  weight: z.number().describe('Your current weight in kilograms.'),
  height: z.number().describe('Your height in centimeters.'),
  goals: z
    .string()
    .describe(
      'Your fitness goals (e.g., bodybuilding, recomp, weight loss).  Be specific about the type of body you want to build.'
    ),
  bodyType: z.string().describe('Describe your current body type.'),
  experienceLevel: z
    .string()
    .describe(
      'Your experience level in fitness (e.g., beginner, intermediate, advanced).'
    ),
  additionalDetails: z
    .string()
    .describe('Any additional details about your preferences or limitations.'),
});

export type CustomWorkoutPlanInput = z.infer<typeof CustomWorkoutPlanInputSchema>;

const CustomWorkoutPlanOutputSchema = z.object({
  workoutPlan: z
    .string()
    .describe('A detailed custom workout plan based on the user input.'),
});

export type CustomWorkoutPlanOutput = z.infer<typeof CustomWorkoutPlanOutputSchema>;

export async function generateCustomWorkoutPlan(
  input: CustomWorkoutPlanInput
): Promise<CustomWorkoutPlanOutput> {
  return customWorkoutPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customWorkoutPlanPrompt',
  input: {
    schema: z.object({
      weight: z.number().describe('Your current weight in kilograms.'),
      height: z.number().describe('Your height in centimeters.'),
      goals: z
        .string()
        .describe(
          'Your fitness goals (e.g., bodybuilding, recomp, weight loss). Be specific about the type of body you want to build.'
        ),
      bodyType: z.string().describe('Describe your current body type.'),
      experienceLevel:
        z.string().describe('Your experience level in fitness (e.g., beginner, intermediate, advanced).'),
      additionalDetails:
        z.string().describe('Any additional details about your preferences or limitations.'),
    }),
  },
  output: {
    schema: z.object({
      workoutPlan:
        z.string().describe('A detailed custom workout plan based on the user input.'),
    }),
  },
  prompt: `You are a personal trainer who specializes in creating customized workout plans. Based on the information below, create a detailed workout plan. Be sure to include warm-up exercises, cool downs, and rest days. Mention sets and reps.

Weight: {{{weight}}} kg
Height: {{{height}}} cm
Goals: {{{goals}}}
Body Type: {{{bodyType}}}
Experience Level: {{{experienceLevel}}}
Additional Details: {{{additionalDetails}}}
`,
});

const customWorkoutPlanFlow = ai.defineFlow<
  typeof CustomWorkoutPlanInputSchema,
  typeof CustomWorkoutPlanOutputSchema
>(
  {
    name: 'customWorkoutPlanFlow',
    inputSchema: CustomWorkoutPlanInputSchema,
    outputSchema: CustomWorkoutPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

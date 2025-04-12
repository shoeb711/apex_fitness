'use server';
/**
 * @fileOverview Generates basic workout plans based on user input.
 *
 * - generateBasicWorkoutPlan - A function that generates basic workout plans.
 * - GenerateWorkoutPlanInput - The input type for the generateBasicWorkoutPlan function.
 * - GenerateWorkoutPlanOutput - The return type for the generateBasicWorkoutPlan function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateWorkoutPlanInputSchema = z.object({
  weight: z.number().describe('Your weight in kilograms.'),
  height: z.number().describe('Your height in centimeters.'),
  fitnessGoal: z
    .enum(['bodybuilding', 'recomp', 'weight loss'])
    .describe('Your primary fitness goal.'),
  experienceLevel: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .describe('Your experience level with working out.'),
  availableDays: z
    .number()
    .min(1)
    .max(7)
    .describe('The number of days per week you can workout.'),
  gender: z.enum(['male', 'female', 'other']).describe('Your gender.'),
  equipmentAccess: z.string().describe('The equipment that you have access to.'),
});

export type GenerateWorkoutPlanInput = z.infer<
  typeof GenerateWorkoutPlanInputSchema
>;

const GenerateWorkoutPlanOutputSchema = z.object({
  workoutPlan: z
    .string()
    .describe('A basic workout plan tailored to the user inputs.'),
});

export type GenerateWorkoutPlanOutput = z.infer<
  typeof GenerateWorkoutPlanOutputSchema
>;

export async function generateBasicWorkoutPlan(
  input: GenerateWorkoutPlanInput
): Promise<GenerateWorkoutPlanOutput> {
  return generateBasicWorkoutPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBasicWorkoutPlanPrompt',
  input: {
    schema: z.object({
      weight: z.number().describe('Your weight in kilograms.'),
      height: z.number().describe('Your height in centimeters.'),
      fitnessGoal: z
        .enum(['bodybuilding', 'recomp', 'weight loss'])
        .describe('Your primary fitness goal.'),
      experienceLevel: z
        .enum(['beginner', 'intermediate', 'advanced'])
        .describe('Your experience level with working out.'),
      availableDays: z
        .number()
        .min(1)
        .max(7)
        .describe('The number of days per week you can workout.'),
      gender: z.enum(['male', 'female', 'other']).describe('Your gender.'),
      equipmentAccess: z
        .string()
        .describe('The equipment that you have access to.'),
    }),
  },
  output: {
    schema: z.object({
      workoutPlan: z
        .string()
        .describe('A basic workout plan tailored to the user inputs.'),
    }),
  },
  prompt: `You are a personal trainer. Generate a basic workout plan based on the following information:\n\nWeight: {{weight}} kg\nHeight: {{height}} cm\nFitness Goal: {{fitnessGoal}}\nExperience Level: {{experienceLevel}}\nAvailable Days per Week: {{availableDays}}\nGender: {{gender}}\nEquipment Access: {{equipmentAccess}}\n\nWorkout Plan:`,
});

const generateBasicWorkoutPlanFlow = ai.defineFlow<
  typeof GenerateWorkoutPlanInputSchema,
  typeof GenerateWorkoutPlanOutputSchema
>(
  {
    name: 'generateBasicWorkoutPlanFlow',
    inputSchema: GenerateWorkoutPlanInputSchema,
    outputSchema: GenerateWorkoutPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

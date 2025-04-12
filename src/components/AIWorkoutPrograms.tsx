
'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {
  GenerateWorkoutPlanInput,
  GenerateWorkoutPlanOutput,
  generateBasicWorkoutPlan,
} from '@/ai/flows/ai-powered-workout-programs-flow';
import {
  CustomWorkoutPlanInput,
  CustomWorkoutPlanOutput,
  generateCustomWorkoutPlan,
} from '@/ai/flows/custom-workout-plan-generator';

const AIWorkoutPrograms = () => {
  const [basicWorkoutInput, setBasicWorkoutInput] = useState<GenerateWorkoutPlanInput>({
    weight: 0,
    height: 0,
    fitnessGoal: 'bodybuilding',
    experienceLevel: 'beginner',
    availableDays: 3,
    gender: 'male',
    equipmentAccess: 'basic gym equipment',
  });
  const [basicWorkoutPlan, setBasicWorkoutPlan] = useState<GenerateWorkoutPlanOutput | null>(null);
  const [customWorkoutInput, setCustomWorkoutInput] = useState<CustomWorkoutPlanInput>({
    weight: 0,
    height: 0,
    goals: '',
    bodyType: '',
    experienceLevel: '',
    additionalDetails: '',
  });
  const [customWorkoutPlan, setCustomWorkoutPlan] = useState<CustomWorkoutPlanOutput | null>(null);
  const [loadingBasic, setLoadingBasic] = useState(false);
  const [loadingCustom, setLoadingCustom] = useState(false);
  const [errorBasic, setErrorBasic] = useState<string | null>(null);
  const [errorCustom, setErrorCustom] = useState<string | null>(null);

  const handleGenerateBasicWorkout = async () => {
    setLoadingBasic(true);
    setErrorBasic(null);
    try {
      const result: GenerateWorkoutPlanOutput = await generateBasicWorkoutPlan(
        basicWorkoutInput
      );
      setBasicWorkoutPlan(result);
    } catch (e: any) {
      setErrorBasic(e.message || 'Failed to generate workout plan. Please try again.');
    } finally {
      setLoadingBasic(false);
    }
  };

  const handleGenerateCustomWorkout = async () => {
    setLoadingCustom(true);
    setErrorCustom(null);
    try {
      const result: CustomWorkoutPlanOutput = await generateCustomWorkoutPlan(
        customWorkoutInput
      );
      setCustomWorkoutPlan(result);
    } catch (e: any) {
      setErrorCustom(e.message || 'Failed to generate custom workout plan. Please try again.');
    } finally {
      setLoadingCustom(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">AI Powered Workout Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Workout Plan Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Basic Workout Plan</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                type="number"
                id="weight"
                value={basicWorkoutInput.weight}
                onChange={e =>
                  setBasicWorkoutInput({...basicWorkoutInput, weight: Number(e.target.value)})
                }
              />
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                type="number"
                id="height"
                value={basicWorkoutInput.height}
                onChange={e =>
                  setBasicWorkoutInput({...basicWorkoutInput, height: Number(e.target.value)})
                }
              />
            </div>
            <div>
              <Label htmlFor="fitnessGoal">Fitness Goal</Label>
              <select
                id="fitnessGoal"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={basicWorkoutInput.fitnessGoal}
                onChange={e =>
                  setBasicWorkoutInput({...basicWorkoutInput, fitnessGoal: e.target.value as any})
                }
              >
                <option value="bodybuilding">Bodybuilding</option>
                <option value="recomp">Recomp</option>
                <option value="weight loss">Weight Loss</option>
              </select>
            </div>
            <div>
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <select
                id="experienceLevel"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={basicWorkoutInput.experienceLevel}
                onChange={e =>
                  setBasicWorkoutInput({
                    ...basicWorkoutInput,
                    experienceLevel: e.target.value as any,
                  })
                }
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <Label htmlFor="availableDays">Available Days per Week</Label>
              <Input
                type="number"
                id="availableDays"
                value={basicWorkoutInput.availableDays}
                onChange={e =>
                  setBasicWorkoutInput({...basicWorkoutInput, availableDays: Number(e.target.value)})
                }
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={basicWorkoutInput.gender}
                onChange={e =>
                  setBasicWorkoutInput({...basicWorkoutInput, gender: e.target.value as any})
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="equipmentAccess">Equipment Access</Label>
              <Textarea
                placeholder="List the equipment you have access to..."
                rows={3}
                id="equipmentAccess"
                value={basicWorkoutInput.equipmentAccess}
                onChange={e =>
                  setBasicWorkoutInput({...basicWorkoutInput, equipmentAccess: e.target.value})
                }
              />
            </div>
            <Button
              className="w-full bg-primary text-white hover:bg-blue-700"
              onClick={handleGenerateBasicWorkout}
              disabled={loadingBasic}
            >
              {loadingBasic ? 'Generating...' : 'Generate Basic Workout'}
            </Button>
            {errorBasic && <p className="mt-4 text-red-500">{errorBasic}</p>}
            {basicWorkoutPlan && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold mb-2">Generated Workout Plan:</h4>
                <p>{basicWorkoutPlan.workoutPlan}</p>
              </div>
            )}
          </div>
        </div>

        {/* Custom Workout Plan Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Custom Workout Plan</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customWeight">Weight (kg)</Label>
              <Input
                type="number"
                id="customWeight"
                value={customWorkoutInput.weight}
                onChange={e =>
                  setCustomWorkoutInput({...customWorkoutInput, weight: Number(e.target.value)})
                }
              />
            </div>
            <div>
              <Label htmlFor="customHeight">Height (cm)</Label>
              <Input
                type="number"
                id="customHeight"
                value={customWorkoutInput.height}
                onChange={e =>
                  setCustomWorkoutInput({...customWorkoutInput, height: Number(e.target.value)})
                }
              />
            </div>
            <div>
              <Label htmlFor="goals">Fitness Goals</Label>
              <Textarea
                placeholder="Describe your fitness goals in detail..."
                rows={3}
                id="goals"
                value={customWorkoutInput.goals}
                onChange={e => setCustomWorkoutInput({...customWorkoutInput, goals: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="bodyType">Body Type</Label>
              <Textarea
                placeholder="Describe your current body type..."
                rows={3}
                id="bodyType"
                value={customWorkoutInput.bodyType}
                onChange={e =>
                  setCustomWorkoutInput({...customWorkoutInput, bodyType: e.target.value})
                }
              />
            </div>
            <div>
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Input
                type="text"
                id="experienceLevel"
                placeholder="e.g., beginner, intermediate, advanced"
                value={customWorkoutInput.experienceLevel}
                onChange={e =>
                  setCustomWorkoutInput({...customWorkoutInput, experienceLevel: e.target.value})
                }
              />
            </div>
            <div>
              <Label htmlFor="additionalDetails">Additional Details</Label>
              <Textarea
                placeholder="Any additional details about your preferences or limitations..."
                rows={3}
                id="additionalDetails"
                value={customWorkoutInput.additionalDetails}
                onChange={e =>
                  setCustomWorkoutInput({...customWorkoutInput, additionalDetails: e.target.value})
                }
              />
            </div>
            <Button
              className="w-full bg-primary text-white hover:bg-blue-700"
              onClick={handleGenerateCustomWorkout}
              disabled={loadingCustom}
            >
              {loadingCustom ? 'Generating...' : 'Generate Custom Workout'}
            </Button>
            {errorCustom && <p className="mt-4 text-red-500">{errorCustom}</p>}
            {customWorkoutPlan && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold mb-2">Generated Custom Workout Plan:</h4>
                <p>{customWorkoutPlan.workoutPlan}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWorkoutPrograms;

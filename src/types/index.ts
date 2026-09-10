export type UserRole = 'patient' | 'caregiver' | 'none';

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  photoUrl: string;
  preferredLanguage: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  streakDays: number;
  primaryCaregiverName: string;
}

export interface CuedReminder {
  id: string;
  time: string;
  category: 'medicine' | 'hydration' | 'appointment' | 'activity';
  questionPrompt: string; // Gentle cued-recall question, e.g. "Do you remember where your medicine box is?"
  subtitle: string;
  completedToday: boolean;
  audioNarrationText: string;
}

export interface MemoryObject {
  id: string;
  name: string;
  hinName: string; // Indian context prompt e.g., "Chai Cup", "Spectacles / Chasma"
  imageUrl: string;
  category: string;
}

export interface GamePrompt {
  id: string;
  domain: 'Memory' | 'Attention' | 'Executive' | 'Language' | 'Visuospatial';
  title: string;
  instruction: string;
  audioNarrationText: string;
  objectsToRemember: MemoryObject[];
  recallQuestion: string;
  multipleChoiceOptions: string[];
  correctOptionIndex: number;
  difficultyLevel: 'Gentle' | 'Moderate' | 'Challenging';
}

export interface CognitiveDomainScore {
  domain: 'Memory' | 'Attention' | 'Executive Function' | 'Language' | 'Visuospatial';
  score: number; // 0 - 100
  trend: 'improving' | 'stable' | 'declining';
  changeDescription: string;
}

export interface WeeklySummary {
  headline: string;
  details: string;
  flaggedConcern?: {
    severity: 'low' | 'medium' | 'high';
    title: string;
    recommendation: string;
  };
}

export interface EscalationAlert {
  id: string;
  date: string;
  title: string;
  reason: string;
  suggestedAction: string;
  contactTarget: 'Clinician Dr. Sharma' | 'ARDSI Helpline' | 'Family Emergency';
  resolved: boolean;
}

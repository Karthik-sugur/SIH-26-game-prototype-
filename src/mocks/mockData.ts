import { PatientProfile, CuedReminder, GamePrompt, CognitiveDomainScore, WeeklySummary, EscalationAlert } from '../types';

export const MOCK_PATIENT: PatientProfile = {
  id: 'pat-101',
  name: 'Ramesh Patel',
  age: 74,
  location: 'Ahmedabad, Gujarat',
  photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  preferredLanguage: 'English / Assamese',
  emergencyContact: {
    name: 'Priya Patel (Daughter)',
    relation: 'Primary Caregiver',
    phone: '+91 98765 43210',
  },
  streakDays: 5,
  primaryCaregiverName: 'Priya Patel',
};

export const MOCK_REMINDERS: CuedReminder[] = [
  {
    id: 'rem-1',
    time: '08:00 AM',
    category: 'medicine',
    questionPrompt: 'Do you remember where your morning medicine box is located?',
    subtitle: 'After breakfast with warm milk or tea',
    completedToday: true,
    audioNarrationText: 'Good morning Ramesh ji. Do you remember where your morning medicine box is located?',
  },
  {
    id: 'rem-2',
    time: '11:30 AM',
    category: 'hydration',
    questionPrompt: 'Have you enjoyed your glass of fresh water or coconut water today?',
    subtitle: 'Staying hydrated helps keep your mind clear and active',
    completedToday: false,
    audioNarrationText: 'Time for hydration. Have you enjoyed your glass of fresh water today?',
  },
  {
    id: 'rem-3',
    time: '04:30 PM',
    category: 'activity',
    questionPrompt: 'Would you like to take a short, gentle walk around the garden?',
    subtitle: '15 minutes of calm movement',
    completedToday: false,
    audioNarrationText: 'Good afternoon. Would you like to take a short, gentle walk around the garden?',
  },
  {
    id: 'rem-4',
    time: '08:00 PM',
    category: 'medicine',
    questionPrompt: 'Shall we check your evening dosage box together?',
    subtitle: 'Before dinner',
    completedToday: false,
    audioNarrationText: 'Good evening. Shall we check your evening dosage box together?',
  },
];

export const MOCK_GAME_SESSION: GamePrompt = {
  id: 'game-mem-01',
  domain: 'Memory',
  title: 'Morning Object Recall',
  instruction: 'Look carefully at these three everyday household objects. Take your time to remember them.',
  audioNarrationText: 'Look carefully at these three everyday household objects. Take your time to remember them.',
  objectsToRemember: [
    {
      id: 'obj-1',
      name: 'Brass Chai Cup',
      hinName: 'पीतल का चाय कप',
      imageUrl: '☕',
      category: 'Kitchen',
    },
    {
      id: 'obj-2',
      name: 'Reading Glasses',
      hinName: 'चश्मा (Glasses)',
      imageUrl: '👓',
      category: 'Personal',
    },
    {
      id: 'obj-3',
      name: 'Brass House Key',
      hinName: 'घर की चाबी (Key)',
      imageUrl: '🔑',
      category: 'Home',
    },
  ],
  recallQuestion: 'Which item was sitting next to the Brass Chai Cup earlier today?',
  multipleChoiceOptions: ['Reading Glasses 👓', 'Wooden Walking Stick 🦯', 'Daily Newspaper 📰', 'Watch ⌚'],
  correctOptionIndex: 0,
  difficultyLevel: 'Gentle',
};

export const MOCK_COGNITIVE_SCORES: CognitiveDomainScore[] = [
  {
    domain: 'Memory',
    score: 72,
    trend: 'stable',
    changeDescription: 'cued recall recognition consistent with last week',
  },
  {
    domain: 'Attention',
    score: 85,
    trend: 'improving',
    changeDescription: '+5% improvement in morning focus sessions',
  },
  {
    domain: 'Executive Function',
    score: 68,
    trend: 'stable',
    changeDescription: 'Planning sequences remain steady',
  },
  {
    domain: 'Language',
    score: 78,
    trend: 'improving',
    changeDescription: 'Word association response times reduced by 1.2s',
  },
  {
    domain: 'Visuospatial',
    score: 61,
    trend: 'declining',
    changeDescription: 'Slight drop in spatial recognition prompts',
  },
];

export const MOCK_WEEKLY_SUMMARY: WeeklySummary = {
  headline: 'Overall Cognition Stable & Engaged',
  details: 'Ramesh completed 5 consecutive daily cued-recall sessions this week. Morning memory recognition was prompt, while evening spatial orientation showed mild hesitation on Thursday.',
  flaggedConcern: {
    severity: 'medium',
    title: 'Visuospatial Recognition Dip',
    recommendation: 'Consider scheduling a short afternoon spatial orientation game or sharing high-contrast visual cues around the living area.',
  },
};

export const MOCK_ESCALATION_ALERTS: EscalationAlert[] = [
  {
    id: 'esc-01',
    date: '10 Sep 2026',
    title: 'Mild Spatial Hesitation Observed',
    reason: '3 consecutive delayed responses (>45s) on visuospatial room navigation prompts.',
    suggestedAction: 'Notify ARDSI Dementia Specialist / Dr. Sharma for routine quarterly evaluation.',
    contactTarget: 'ARDSI Helpline',
    resolved: false,
  },
  {
    id: 'esc-02',
    date: '04 Sep 2026',
    title: 'Missed Hydration Cue (Resolved)',
    reason: 'Hydration reminder unanswered for 2 hours on warm afternoon.',
    suggestedAction: 'Caregiver Priya assisted with water intake directly.',
    contactTarget: 'Family Emergency',
    resolved: true,
  },
];

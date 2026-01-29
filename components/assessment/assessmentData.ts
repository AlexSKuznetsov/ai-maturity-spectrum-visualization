import { AssessmentQuestion, AssessmentResult, LevelData } from '../../types';
import { AI_LEVELS } from '../../constants';

// Increment this version when questions, options, or scoring logic changes
// This will invalidate stored results and require users to retake the assessment
export const ASSESSMENT_VERSION = '1.0.0';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'frequency',
    text: 'How often do you use AI tools in your work?',
    options: [
      { text: 'Occasionally, when I remember or get stuck', levelId: 1 },
      { text: 'Regularly for specific repeated tasks (reports, analysis)', levelId: 2 },
      { text: 'Daily — AI handles routine tasks automatically', levelId: 3 },
      { text: 'Continuously — AI is embedded in our workflows with checkpoints', levelId: 4 },
      { text: '24/7 — AI systems run autonomously with monitoring', levelId: 5 },
      { text: 'AI is foundational to how our organization operates', levelId: 6 },
    ],
  },
  {
    id: 'engineering',
    text: 'What level of technical setup is involved in your AI usage?',
    options: [
      { text: 'None — I just type prompts in a chat interface', levelId: 1 },
      { text: 'Minimal — I use templates, file uploads, or simple scripts', levelId: 2 },
      { text: 'Some — We have scheduled agents or automations someone built', levelId: 3 },
      { text: 'Significant — Custom integrations with approval workflows', levelId: 4 },
      { text: 'Heavy — Full engineering team for architecture, DevOps, security', levelId: 5 },
      { text: 'Cross-functional — Platform teams, data pipelines, custom infrastructure', levelId: 6 },
    ],
  },
  {
    id: 'oversight',
    text: 'How much human oversight is involved in your AI tasks?',
    options: [
      { text: 'I manually trigger and review everything', levelId: 1 },
      { text: 'I trigger tasks but trust outputs for low-stakes work', levelId: 2 },
      { text: 'Tasks run on schedules, I review if something fails', levelId: 3 },
      { text: 'AI proposes, humans approve at critical decision points', levelId: 4 },
      { text: 'Humans supervise dashboards, AI executes autonomously', levelId: 5 },
      { text: 'Governance frameworks manage AI across the organization', levelId: 6 },
    ],
  },
  {
    id: 'scope',
    text: 'What is the scope of AI adoption in your context?',
    options: [
      { text: 'Just me, for personal productivity', levelId: 1 },
      { text: 'Me and maybe a few colleagues with similar needs', levelId: 2 },
      { text: 'My team has shared automations', levelId: 3 },
      { text: 'Multiple teams use coordinated AI workflows', levelId: 4 },
      { text: 'Department or business-unit wide AI systems', levelId: 5 },
      { text: 'Organization-wide AI platform serving all teams', levelId: 6 },
    ],
  },
  {
    id: 'risk',
    text: 'What happens if your AI tools fail or produce errors?',
    options: [
      { text: 'Minor inconvenience — I redo the task manually', levelId: 1 },
      { text: 'Some rework needed but no business impact', levelId: 2 },
      { text: 'Operational disruption — missed deadlines or backlogs', levelId: 3 },
      { text: 'Business risk — requires escalation and remediation', levelId: 4 },
      { text: 'Significant financial or compliance consequences', levelId: 5 },
      { text: 'Strategic impact — affects core business operations', levelId: 6 },
    ],
  },
  {
    id: 'state',
    text: 'How is context and data handled in your AI usage?',
    options: [
      { text: 'Each conversation starts fresh — no memory', levelId: 1 },
      { text: 'I reuse prompts/templates but no persistent state', levelId: 2 },
      { text: 'AI maintains state across sessions (databases, CRM updates)', levelId: 3 },
      { text: 'Complex state flows through multi-step pipelines', levelId: 4 },
      { text: 'Durable execution with versioning, retries, and audit trails', levelId: 5 },
      { text: 'Centralized data pipelines, vector stores, and model gateways', levelId: 6 },
    ],
  },
];

export function calculateResult(answers: number[]): AssessmentResult {
  // Count frequency of each level
  const frequency = new Map<number, number>();
  answers.forEach((level) => {
    frequency.set(level, (frequency.get(level) || 0) + 1);
  });

  // Find the mode (most common answer)
  // If tie, prefer the higher level
  let mode = 1;
  let maxCount = 0;
  frequency.forEach((count, level) => {
    if (count > maxCount || (count === maxCount && level > mode)) {
      mode = level;
      maxCount = count;
    }
  });

  const minAnswer = Math.min(...answers);
  const maxAnswer = Math.max(...answers);
  const spread = maxAnswer - minAnswer;

  // Determine if user is transitioning between levels
  const isTransitioning = spread >= 2;
  const range = isTransitioning ? { from: minAnswer, to: maxAnswer } : null;

  // Get the level data for the result
  const levelData = AI_LEVELS.find((l) => l.id === mode) as LevelData;

  return {
    primaryLevel: mode,
    levelData,
    isTransitioning,
    range,
  };
}

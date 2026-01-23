import { LevelData } from './types';

export const AI_LEVELS: LevelData[] = [
  {
    id: 1,
    title: "Level 1 — Ad-hoc Assistance",
    shortTitle: "Ad-hoc Assistance",
    taskProfile: [
      "Infrequent, one-off tasks",
      "Low context, low risk",
      "No persistence or automation"
    ],
    examples: [
      "Drafting an email",
      "Explaining a concept",
      "Summarizing text",
      "Rewriting content"
    ],
    aiTools: [
      "General-purpose chat interfaces (e.g., ChatGPT-class tools)"
    ],
    engineeringInvolvement: [
      "None"
    ],
    keyCharacteristics: [
      "Stateless",
      "Human-in-the-loop by default",
      "Output is disposable"
    ],
    color: "#3b82f6" // Blue 500
  },
  {
    id: 2,
    title: "Level 2 — Structured Personal Productivity",
    shortTitle: "Structured Productivity",
    taskProfile: [
      "Repeated tasks with clear structure",
      "Deterministic inputs and outputs",
      "Medium value, low operational risk"
    ],
    examples: [
      "CSV analysis (ROI, NPV, sales forecasts)",
      "Financial modeling",
      "Data transformation and reporting"
    ],
    aiTools: [
      "LLMs with skills / tools",
      "File reading",
      "Python execution",
      "Domain-specific markdown or prompt templates"
    ],
    engineeringInvolvement: [
      "Optional",
      "Short validation or debugging sessions",
      "Script review and correctness checks"
    ],
    keyCharacteristics: [
      "Semi-repeatable",
      "User-triggered",
      "No external system dependencies"
    ],
    color: "#0ea5e9" // Sky 500
  },
  {
    id: 3,
    title: "Level 3 — Automated Single-Agent Tasks",
    shortTitle: "Automated Single-Agent",
    taskProfile: [
      "Regular, repeatable tasks",
      "Triggered by time or external events",
      "Requires reliability and persistence"
    ],
    examples: [
      "Email inbox triage every 5 minutes",
      "Daily report generation",
      "CRM tagging or enrichment",
      "Scheduled data pulls"
    ],
    aiTools: [
      "AI agents with Schedulers",
      "External triggers (email, webhooks, APIs)",
      "Tool access"
    ],
    engineeringInvolvement: [
      "Required for Agent design",
      "Deployment",
      "Runtime stability"
    ],
    keyCharacteristics: [
      "Long-running (24/7)",
      "Stateful",
      "Can be built with no-code/low-code by experienced users",
      "Failure has operational cost"
    ],
    color: "#10b981" // Emerald 500
  },
  {
    id: 4,
    title: "Level 4 — Multi-Step Workflow with Human-in-the-Loop",
    shortTitle: "Multi-Step Workflow",
    taskProfile: [
      "Multiple dependent steps",
      "Integration with several platforms",
      "Business or reputational risk",
      "Requires approvals and auditability"
    ],
    examples: [
      "Content approval pipelines",
      "Invoice reconciliation with review",
      "Customer onboarding flows",
      "Internal process automation with reporting"
    ],
    aiTools: [
      "Workflow orchestration engines",
      "AI agents + deterministic workflows",
      "UI for review, approval, and overrides"
    ],
    engineeringInvolvement: [
      "Mandatory",
      "Backend + frontend",
      "Integration engineering",
      "Error handling and observability"
    ],
    keyCharacteristics: [
      "Human judgment embedded at critical points",
      "Partial autonomy",
      "Designed for real business use"
    ],
    color: "#f59e0b" // Amber 500
  },
  {
    id: 5,
    title: "Level 5 — Production-Grade Agentic Systems",
    shortTitle: "Production Agentic Systems",
    taskProfile: [
      "Mission-critical workflows",
      "High volume or high value",
      "Strong correctness and compliance requirements"
    ],
    examples: [
      "Financial operations automation",
      "Compliance-sensitive document processing",
      "AI-assisted decision support systems",
      "Customer-facing AI products"
    ],
    aiTools: [
      "Agentic architectures with Durable execution",
      "Retries and compensation logic",
      "Versioned prompts and models",
      "Role-based access"
    ],
    engineeringInvolvement: [
      "Senior engineering required",
      "Architecture, DevOps, security",
      "Monitoring, alerting, and SLAs"
    ],
    keyCharacteristics: [
      "Designed as software products",
      "Failure is expensive",
      "Humans supervise, not operate"
    ],
    color: "#f97316" // Orange 500
  },
  {
    id: 6,
    title: "Level 6 — AI-Native Platforms & Infrastructure",
    shortTitle: "AI-Native Platforms",
    taskProfile: [
      "Organization-wide capability",
      "Multiple teams and use cases",
      "Long-term evolution"
    ],
    examples: [
      "Internal AI platforms",
      "Company-wide agent frameworks",
      "Vertical SaaS with embedded AI",
      "Custom AI operating layers"
    ],
    aiTools: [
      "Composable agent frameworks",
      "Custom UIs and APIs",
      "Data pipelines, vector stores, model gateways"
    ],
    engineeringInvolvement: [
      "Cross-functional teams",
      "Platform, product, and infrastructure engineers"
    ],
    keyCharacteristics: [
      "AI as a core capability, not a feature",
      "Strong governance and observability",
      "Continuous improvement cycle"
    ],
    color: "#ef4444" // Red 500
  }
];
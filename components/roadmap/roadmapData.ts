import { LevelTransition } from '../../types';

export const LEVEL_TRANSITIONS: LevelTransition[] = [
  {
    fromLevel: 1,
    toLevel: 2,
    gapAnalysis: {
      taskEvolution: "Move from one-off prompts to repeatable, structured workflows with consistent inputs and outputs",
      riskIncrease: "Outputs now feed into business processes, requiring validation and quality checks",
      scopeExpansion: "From personal productivity hacks to team-level patterns that can be documented and shared"
    },
    actionItems: [
      {
        title: "Document your top 5 AI tasks",
        description: "Identify the prompts you use most often and write them down as reusable templates",
        category: 'process'
      },
      {
        title: "Add structure to your inputs",
        description: "Create a standard format for data you feed to AI (CSV templates, JSON schemas, markdown outlines)",
        category: 'technical'
      },
      {
        title: "Enable code execution",
        description: "Use tools with Python/code interpreter capabilities for data analysis and transformations",
        category: 'technical'
      },
      {
        title: "Establish output validation",
        description: "Define what 'good output' looks like and create a checklist to verify AI results",
        category: 'process'
      }
    ],
    skillsNeeded: [
      "Prompt engineering fundamentals",
      "Data formatting (CSV, JSON)",
      "Basic scripting literacy",
      "Template design"
    ],
    toolsToImplement: [
      "LLM with file upload capability",
      "Code interpreter (Python execution)",
      "Prompt template library",
      "Output validation checklist"
    ],
    keyMilestones: [
      "First reusable prompt template",
      "Consistent output format achieved",
      "Team member successfully uses your template"
    ]
  },
  {
    fromLevel: 2,
    toLevel: 3,
    gapAnalysis: {
      taskEvolution: "Shift from manual triggering to automated, scheduled execution that runs without human initiation",
      riskIncrease: "Failure now has operational cost - missed automations impact business processes",
      scopeExpansion: "From individual productivity to always-on business operations that run 24/7"
    },
    actionItems: [
      {
        title: "Identify one daily repetitive task",
        description: "Find a task you do every day at the same time that could run automatically",
        category: 'process'
      },
      {
        title: "Set up a scheduling system",
        description: "Implement cron jobs, cloud schedulers, or automation platform triggers",
        category: 'technical'
      },
      {
        title: "Add state persistence",
        description: "Store results and context between runs so the agent remembers previous work",
        category: 'technical'
      },
      {
        title: "Define ownership and monitoring",
        description: "Assign someone responsible for the automation and set up failure alerts",
        category: 'organizational'
      },
      {
        title: "Create a runbook",
        description: "Document what the automation does, how to check it's working, and how to fix common issues",
        category: 'process'
      }
    ],
    skillsNeeded: [
      "Agent design principles",
      "Scheduling and triggers",
      "Basic DevOps concepts",
      "Error handling patterns",
      "State management"
    ],
    toolsToImplement: [
      "AI agent framework",
      "Scheduler (cron, cloud scheduler)",
      "Webhook/API triggers",
      "Database or file storage for state",
      "Alerting system"
    ],
    keyMilestones: [
      "First automation runs unattended for 1 week",
      "Successful recovery from first failure",
      "Zero manual interventions for 30 days"
    ]
  },
  {
    fromLevel: 3,
    toLevel: 4,
    gapAnalysis: {
      taskEvolution: "Expand from single-agent tasks to multi-step workflows with human checkpoints and approvals",
      riskIncrease: "Business and reputational risk requires human judgment at critical decision points",
      scopeExpansion: "From isolated automations to integrated workflows spanning multiple systems and stakeholders"
    },
    actionItems: [
      {
        title: "Map your end-to-end process",
        description: "Document all steps from trigger to completion, identifying where humans need to review or approve",
        category: 'process'
      },
      {
        title: "Design approval interfaces",
        description: "Build simple UIs or use existing tools (Slack, email) for human review and override",
        category: 'technical'
      },
      {
        title: "Implement workflow orchestration",
        description: "Use a workflow engine to manage step dependencies, retries, and state transitions",
        category: 'technical'
      },
      {
        title: "Add audit logging",
        description: "Record all decisions (human and AI) with timestamps for compliance and debugging",
        category: 'technical'
      },
      {
        title: "Establish escalation paths",
        description: "Define what happens when AI is uncertain or human doesn't respond in time",
        category: 'organizational'
      }
    ],
    skillsNeeded: [
      "Workflow design patterns",
      "Integration engineering",
      "UI/UX for approval flows",
      "Error handling and compensation",
      "Compliance and audit requirements"
    ],
    toolsToImplement: [
      "Workflow orchestration engine",
      "Human-in-the-loop UI",
      "Integration connectors (APIs, webhooks)",
      "Audit logging system",
      "Notification/escalation system"
    ],
    keyMilestones: [
      "First workflow with human approval gate",
      "Successful audit of automated decisions",
      "Stakeholder trust in AI recommendations"
    ]
  },
  {
    fromLevel: 4,
    toLevel: 5,
    gapAnalysis: {
      taskEvolution: "Transition from human-supervised workflows to production-grade systems with enterprise reliability",
      riskIncrease: "Mission-critical operations where failure is expensive - requires SLAs and disaster recovery",
      scopeExpansion: "From internal tools to customer-facing products and compliance-sensitive operations"
    },
    actionItems: [
      {
        title: "Implement durable execution",
        description: "Use frameworks that survive crashes, resume from checkpoints, and handle long-running operations",
        category: 'technical'
      },
      {
        title: "Version your prompts and models",
        description: "Treat prompts as code - version control, testing, staged rollouts",
        category: 'technical'
      },
      {
        title: "Build comprehensive observability",
        description: "Add metrics, tracing, and logging to understand system behavior and debug issues",
        category: 'technical'
      },
      {
        title: "Establish SLAs and on-call",
        description: "Define uptime targets, response times, and who gets paged when things break",
        category: 'organizational'
      },
      {
        title: "Implement security controls",
        description: "Add role-based access, secrets management, and data protection measures",
        category: 'technical'
      }
    ],
    skillsNeeded: [
      "Production systems architecture",
      "DevOps and SRE practices",
      "Security engineering",
      "Performance optimization",
      "Incident management"
    ],
    toolsToImplement: [
      "Durable execution framework",
      "Prompt versioning system",
      "Observability stack (metrics, logs, traces)",
      "Incident management platform",
      "Secrets and access management"
    ],
    keyMilestones: [
      "First 99.9% uptime month",
      "Successful production incident recovery",
      "Passing security audit"
    ]
  },
  {
    fromLevel: 5,
    toLevel: 6,
    gapAnalysis: {
      taskEvolution: "Evolve from individual agentic systems to organization-wide AI capability and infrastructure",
      riskIncrease: "Strategic risk - AI becomes core to competitive advantage and requires long-term investment",
      scopeExpansion: "From point solutions to platforms that enable multiple teams and use cases across the organization"
    },
    actionItems: [
      {
        title: "Build a composable agent framework",
        description: "Create reusable components that teams can assemble into custom AI solutions",
        category: 'technical'
      },
      {
        title: "Establish AI governance",
        description: "Define policies for AI usage, model selection, data handling, and ethical guidelines",
        category: 'organizational'
      },
      {
        title: "Create self-service platforms",
        description: "Enable non-engineering teams to build and deploy AI workflows without deep technical knowledge",
        category: 'technical'
      },
      {
        title: "Implement continuous improvement",
        description: "Build feedback loops, A/B testing, and model performance monitoring into the platform",
        category: 'process'
      },
      {
        title: "Build cross-functional AI team",
        description: "Assemble platform, product, and infrastructure engineers dedicated to AI capabilities",
        category: 'organizational'
      }
    ],
    skillsNeeded: [
      "Platform engineering",
      "API and SDK design",
      "Data pipeline architecture",
      "ML operations (MLOps)",
      "Organizational change management"
    ],
    toolsToImplement: [
      "Agent framework with plugin architecture",
      "Model gateway and routing",
      "Vector stores and knowledge bases",
      "Self-service workflow builder",
      "AI governance dashboard"
    ],
    keyMilestones: [
      "Multiple teams building on your platform",
      "Non-engineers deploying AI workflows",
      "AI as recognized core competency"
    ]
  }
];

export function getTransitionForLevel(currentLevel: number): LevelTransition | null {
  if (currentLevel >= 6) return null;
  return LEVEL_TRANSITIONS.find(t => t.fromLevel === currentLevel) || null;
}

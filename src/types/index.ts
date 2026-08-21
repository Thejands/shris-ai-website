export interface DomainUseCase {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  agentName: string;
  agentRole: string;
  agentAvatar: string;
  industryProblem: string;
  workflowSteps: string[];
  sampleConversation: {
    speaker: 'agent' | 'customer';
    message: string;
    timestamp: string;
    intentTag?: string;
  }[];
  extractedEntities: {
    label: string;
    value: string;
    confidence: number;
    icon: string;
  }[];
  actionsExecuted: {
    system: string;
    action: string;
    status: 'completed' | 'triggered' | 'queued';
    time: string;
  }[];
  impactMetrics: {
    metric: string;
    label: string;
  }[];
  audioSample: {
    duration: string;
    accent: string;
    sampleRate: string;
  };
}

export interface AgentType {
  id: string;
  name: string;
  role: string;
  subtitle: string;
  description: string;
  primaryGoal: string;
  keyCapabilities: string[];
  icon: string;
  sampleTrigger: string;
  exampleAction: string;
  stats: {
    label: string;
    value: string;
  };
}

export interface LanguageVoice {
  id: string;
  name: string;
  nativeName: string;
  code: string;
  dialects: string[];
  status: 'Production' | 'Live Preview' | 'Enterprise Beta';
  latency: string;
  sampleText: string;
  audioDuration: string;
}

export interface IntegrationCategory {
  id: string;
  name: string;
  description: string;
  integrations: {
    name: string;
    logoText: string;
    category: string;
    description: string;
    status: 'Native' | 'Verified' | 'Webhook Ready';
    badgeColor?: string;
  }[];
}

export interface DeveloperSnippet {
  id: string;
  title: string;
  language: 'curl' | 'python' | 'javascript' | 'json';
  code: string;
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  pricingModel: string;
  pricePerMinute?: string;
  monthlyBase?: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  ctaVariant: 'primary' | 'secondary' | 'outline';
}

export interface FaqItem {
  id: string;
  category: 'Platform & Agents' | 'Voice & Latency' | 'Integrations & Actions' | 'Enterprise Security' | 'Pricing & Scaling';
  question: string;
  answer: string;
}

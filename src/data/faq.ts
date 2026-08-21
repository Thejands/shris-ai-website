import type { FaqItem } from '../types';

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'how-natural-is-voice',
    category: 'Voice & Latency',
    question: 'How human-like does Shris AI sound in live conversations?',
    answer: 'Shris AI leverages a proprietary full-duplex neural voice pipeline with sub-300ms end-to-end latency. It features natural turn-taking, pauses, filler words, emotional prosody, and the ability to handle caller interruptions seamlessly without awkward delays or robotic repetition.'
  },
  {
    id: 'how-does-it-differ-from-ivr',
    category: 'Platform & Agents',
    question: 'How is Shris AI different from traditional IVR or standard chatbots?',
    answer: 'Traditional IVRs force callers through rigid, frustrating "Press 1 for Sales" numerical trees. Chatbots are locked to text. Shris AI is an autonomous Voice Workforce: it engages in unscripted, natural conversations in 10+ languages, understands nuanced intent, extracts complex business data, makes real-time decisions, and triggers concrete actions in your CRM, ERP, and calendar systems.'
  },
  {
    id: 'data-privacy-security',
    category: 'Enterprise Security',
    question: 'How does Shris AI ensure enterprise data security and compliance?',
    answer: 'We architect for strict enterprise isolation. All audio and telemetry streams are encrypted in transit via TLS 1.3 and at rest via AES-256. We offer dedicated VPC deployment, role-based access control (RBAC), tenant isolation, and a Zero Data Retention (ZDR) mode where audio and transcripts are purged immediately after CRM sync.'
  },
  {
    id: 'crm-erp-integrations',
    category: 'Integrations & Actions',
    question: 'Which CRM, ERP, and communication tools can Shris AI integrate with?',
    answer: 'Shris AI integrates natively with Salesforce, HubSpot, LeadSquared, Zoho CRM, Freshsales, Google Calendar, Microsoft Outlook, WhatsApp Business API, Twilio, and Zapier. For custom legacy systems, we support standard REST/GraphQL APIs, webhooks, and private SIP trunking.'
  },
  {
    id: 'human-escalation-workflow',
    category: 'Platform & Agents',
    question: 'What happens if a caller asks to speak to a human or has a complex request?',
    answer: 'Shris AI includes an intelligent warm-transfer protocol. If customer sentiment drops, confidence falls below a configured threshold, or the caller explicitly requests a human, the call is transferred in real-time to your team with a complete live summary, transcript, and extracted entities pre-loaded on the agent’s screen.'
  },
  {
    id: 'multi-language-support',
    category: 'Voice & Latency',
    question: 'Which languages and regional accents are supported?',
    answer: 'Shris AI provides production-grade support for Indian English, Hindi, Tamil, Telugu, Kannada, Bengali, and Marathi, with live previews for Malayalam, Gujarati, and Punjabi. Our models are trained on regional colloquialisms, codeswitching (e.g. Hinglish), and distinct regional accents.'
  },
  {
    id: 'concurrent-call-scaling',
    category: 'Pricing & Scaling',
    question: 'Can Shris AI scale from 10 calls a day to 100,000+ concurrent calls?',
    answer: 'Yes. The Shris AI distributed runtime is architected with auto-scaling Kubernetes voice micro-nodes, queue-based telephony orchestrators, and resilient carrier interconnects. Whether you run a flash promotional campaign or continuous round-the-clock support, capacity scales dynamically with zero dropped calls.'
  },
  {
    id: 'pricing-billing-model',
    category: 'Pricing & Scaling',
    question: 'How is Shris AI priced and billed?',
    answer: 'We offer a transparent "Pay As You Scale" model based on connected conversation minutes, eliminating wasted spend on unanswered rings. Growth and Enterprise plans include dedicated concurrency pools, custom voice personas, and SLA guarantees.'
  }
];

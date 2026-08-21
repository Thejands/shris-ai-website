import type { AgentType } from '../types';

export const AGENT_TYPES: AgentType[] = [
  {
    id: 'sales-agent',
    name: 'AI Sales & Outbound Agent',
    role: 'Revenue Pipeline Acceleration',
    subtitle: 'Qualifies inbound demand & conducts outbound pipeline generation',
    description: 'Engages inbound leads within 15 seconds, discovers purchasing criteria, navigates budget constraints, overcomes objections, and directly books qualified sales calls or site visits.',
    primaryGoal: 'Maximize pipeline velocity and conversion from raw marketing leads to qualified opportunities.',
    keyCapabilities: [
      'Sub-300ms speech response with conversational turn-taking',
      'Dynamic budget, timeline, and decision-maker qualification',
      'Live calendar booking and CRM contact enrichment',
      'Intelligent objection handling and competitor differentiation',
      'Automated multi-touch WhatsApp & SMS follow-ups'
    ],
    icon: '💼',
    sampleTrigger: 'Inbound Web Form / Facebook Ad Lead / Webinar Sign-up',
    exampleAction: 'Books demo on Account Executive calendar + Creates Opportunity in Salesforce',
    stats: {
      label: 'Pipeline Impact',
      value: '3.8x faster lead-to-opportunity cycle'
    }
  },
  {
    id: 'support-agent',
    name: 'AI Customer Support Agent',
    role: 'Zero-Wait Resolution Desk',
    subtitle: 'Resolves complex tier-1 & tier-2 voice support calls autonomously',
    description: 'Handles high-volume customer inquiries, order status checks, account updates, refund requests, and troubleshooting workflows with real-time enterprise system lookups.',
    primaryGoal: 'Deliver instant, zero-queue resolution while reducing Tier 1 human support burden.',
    keyCapabilities: [
      'Direct API integration with ERP, Shopify, Zendesk & Freshdesk',
      'Secure caller verification via OTP & account telemetry',
      'Transactional execution: refunds, address updates, ticket logs',
      'Sentiment analysis and frustration detection',
      'Context-preserved warm handoff to senior human engineers'
    ],
    icon: '🎧',
    sampleTrigger: 'Inbound Support Hotline / IVR Overflow',
    exampleAction: 'Fetches live tracking from Shiprocket + Updates customer address in database',
    stats: {
      label: 'Resolution Rate',
      value: '78% First Contact Resolution (FCR)'
    }
  },
  {
    id: 'appointment-agent',
    name: 'AI Appointment & Scheduling Agent',
    role: 'Calendar & Capacity Optimization',
    subtitle: 'Books, confirms, reschedules, and manages calendar logistics',
    description: 'Proactively calls patients, clients, or prospects to confirm attendance, handle rescheduling, provide preparation instructions, and backfill cancelled slots.',
    primaryGoal: 'Eliminate calendar no-shows and optimize high-value practitioner and facility utilization.',
    keyCapabilities: [
      'Two-way sync with Google Calendar, Outlook, and specialized EHRs',
      'Multi-slot negotiation and timezone calculation',
      'Automated reminder cadences (24h / 2h prior to booking)',
      'Pre-appointment guideline delivery (fasting, documents, directions)',
      'Automated waitlist backfilling when cancellations occur'
    ],
    icon: '📅',
    sampleTrigger: 'Upcoming Calendar Event / HMS Scheduled Consult / Diagnostic Order',
    exampleAction: 'Re-books slot to 3:00 PM + Dispatches location pin via WhatsApp',
    stats: {
      label: 'No-Show Reduction',
      value: '84% decrease in missed appointments'
    }
  },
  {
    id: 'collections-agent',
    name: 'AI Collections & Payment Agent',
    role: 'Empathetic Financial Recovery',
    subtitle: 'Conducts polite, compliant payment reminder and recovery calls',
    description: 'Reaches out to customers regarding due dates, overdue invoices, and subscription lapses. Negotiates payment schedules and dispatches instant payment links.',
    primaryGoal: 'Accelerate debt collection while preserving customer relationships through respectful communication.',
    keyCapabilities: [
      'Strict regulatory adherence & calling-hour window management',
      'Empathetic conversational tone with dynamic dispute handling',
      'Instant payment link generation (UPI / Card / NetBanking)',
      'Promise-to-Pay (PTP) recording and automated tracking',
      'Full legal audit logging and complete voice call recording'
    ],
    icon: '💳',
    sampleTrigger: 'Overdue Invoice in SAP / EMI Due in Core Banking',
    exampleAction: 'Records PTP date for 25th + Sends Razorpay tokenized link',
    stats: {
      label: 'Recovery Lift',
      value: '46% improvement in 30-day PTP realization'
    }
  },
  {
    id: 'recruitment-agent',
    name: 'AI Recruitment & Talent Agent',
    role: 'High-Volume Candidate Screening',
    subtitle: 'Screens candidate credentials, verifies experience & schedules interviews',
    description: 'Conducts initial voice screening interviews for high-volume hiring, validates skill sets, notice periods, and salary expectations, and schedules interviews with hiring managers.',
    primaryGoal: 'Compress time-to-hire by screening 1,000+ candidates in minutes without recruiter fatigue.',
    keyCapabilities: [
      'Structured technical and behavioral question scoring',
      'Verification of notice period, location preference, and compensation',
      'ATS integration with Greenhouse, Lever, Workday, and BambooHR',
      'Immediate candidate feedback and calendar slot booking',
      'Produces structured evaluation cards with full audio transcripts'
    ],
    icon: '👥',
    sampleTrigger: 'Job Application on LinkedIn / Career Portal / Campus Drive',
    exampleAction: 'Scores candidate 92/100 + Schedules Round 2 on Greenhouse',
    stats: {
      label: 'Hiring Velocity',
      value: '10x faster screening turnaround'
    }
  },
  {
    id: 'survey-agent',
    name: 'AI Survey & Feedback Agent',
    role: 'Voice-First Customer Intelligence',
    subtitle: 'Captures authentic, open-ended feedback and NPS insights at scale',
    description: 'Calls customers post-purchase, post-service, or post-stay to capture nuanced verbal feedback, quantifying sentiment and flagging churn risks in real-time.',
    primaryGoal: 'Gather actionable qualitative customer insights with 10x higher response rates than email forms.',
    keyCapabilities: [
      'Adaptive questioning based on previous customer answers',
      'Detailed entity extraction for specific product/staff mentions',
      'Real-time sentiment scoring and churn escalation flags',
      'Synthesized executive summaries with verbatim quote extraction',
      'Instant sync to Qualtrics, Medallia, and HubSpot'
    ],
    icon: '📊',
    sampleTrigger: 'Service Ticket Closure / Hotel Check-out / Delivery Completed',
    exampleAction: 'Flags negative feedback + Alerts Customer Success VP via Slack',
    stats: {
      label: 'Feedback Yield',
      value: '12x higher response rate vs web surveys'
    }
  },
  {
    id: 'receptionist-agent',
    name: 'AI Receptionist & Smart IVR',
    role: 'Intelligent Enterprise Front Desk',
    subtitle: 'Answers all inbound calls, routes queries & takes detailed messages',
    description: 'Replaces rigid phone trees with an intelligent conversational front desk that understands caller intent instantly and transfers calls with complete briefing context.',
    primaryGoal: 'Provide a zero-wait, premium greeting for every inbound caller 24/7/365.',
    keyCapabilities: [
      'Natural intent classification without "Press 1 for Sales" menus',
      'Direct department and executive call routing with warm transfer',
      'Captures rich caller messages with urgency scoring',
      'Handles company FAQ: office hours, address, executive directories',
      'Integrates with Slack, Teams, and VoIP PBX switches'
    ],
    icon: '🏢',
    sampleTrigger: 'Inbound Call to Primary Business Number',
    exampleAction: 'Warm transfers VIP caller to VP Sales with audio summary',
    stats: {
      label: 'Call Routing',
      value: '0.4s average intent-to-transfer latency'
    }
  },
  {
    id: 'followup-agent',
    name: 'AI Lifecycle & Reactivation Agent',
    role: 'Dormant Account Re-engagement',
    subtitle: 'Re-engages dormant leads, churned users & overdue renewal contracts',
    description: 'Monitors customer lifecycle triggers, executing friendly, value-driven voice outreach to re-engage cold prospects, announce new capabilities, and recover churned accounts.',
    primaryGoal: 'Drive expansion and re-activation revenue from existing business databases.',
    keyCapabilities: [
      'Context-aware references to past purchase or conversation history',
      'Dynamic incentive and offer delivery based on churn risk score',
      'Real-time win-back analytics and objection categorization',
      'Direct pipeline re-injection into active sales queues',
      'Multi-channel handoff via WhatsApp and direct email follow-up'
    ],
    icon: '🔄',
    sampleTrigger: '60-Day Inactivity Flag in CRM / Contract Expiring in 30 Days',
    exampleAction: 'Offers loyalty incentive + Dispatches reactivation link',
    stats: {
      label: 'Win-back Rate',
      value: '22% reactivation of dormant accounts'
    }
  }
];

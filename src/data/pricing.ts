import type { PricingTier } from '../types';

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter Pilot',
    tagline: 'Ideal for teams validating their first AI voice workflow with rapid deployment.',
    pricingModel: 'Pay As You Scale',
    pricePerMinute: '₹4.50',
    monthlyBase: '₹0 Platform Fee',
    features: [
      'Up to 2 Concurrent Live Calls',
      'Access to 3 Standard AI Voices (English & Hindi)',
      'Webhooks & REST API Access',
      'Google Calendar & LeadSquared Sync',
      'Real-time Audio Waveform & Transcripts',
      'Community & Standard Email Support'
    ],
    ctaText: 'Start Free Sandbox',
    ctaVariant: 'secondary'
  },
  {
    id: 'growth',
    name: 'Growth Scale',
    tagline: 'For high-velocity sales and support teams running continuous customer calling.',
    pricingModel: 'Volume Tiered',
    pricePerMinute: '₹3.20',
    monthlyBase: '₹14,999 / mo Base',
    popular: true,
    features: [
      'Up to 50 Concurrent Live Calls',
      'All 10 Regional Indian & Global Languages',
      'Custom Voice Cloning & Tone Personalization',
      'Native Salesforce, HubSpot & Zoho CRM Sync',
      'Sub-300ms Ultra-Low Latency Engine',
      'Human Warm Transfer & Escalation Protocol',
      'Dedicated Customer Success Manager & 99.9% SLA'
    ],
    ctaText: 'Deploy Growth Fleet',
    ctaVariant: 'primary'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Dedicated',
    tagline: 'Custom architectures for Fortune 500 banks, hospitals, and national enterprises.',
    pricingModel: 'Custom Volume Committed',
    pricePerMinute: 'Custom',
    monthlyBase: 'Custom Contract',
    features: [
      'Unlimited Concurrent Live Calls & High Throughput',
      'Dedicated Telephony Trunks & Private SIP Interconnect',
      'On-Premises / Private VPC Cloud Deployment Option',
      'Zero Data Retention (ZDR) & Custom Compliance Policies',
      'Bespoke Enterprise LLM Fine-Tuning & Vocabulary Ingestion',
      'Custom ERP/Core Banking Connectors (SAP, Oracle, Finacle)',
      '24/7 Priority Mission-Critical Engineering Support'
    ],
    ctaText: 'Talk to Enterprise Solutions',
    ctaVariant: 'outline'
  }
];

export const CALCULATOR_CONFIG = {
  baseCostPerMinute: 3.5,
  minCallsPerDay: 50,
  maxCallsPerDay: 50000,
  defaultCallsPerDay: 2500,
  avgDurationMinutes: 2.5,
  humanAgentHourlyCost: 280, // in INR
  humanDailyCapacity: 60 // calls per human per day
};

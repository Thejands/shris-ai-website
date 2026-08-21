import type { IntegrationCategory } from '../types';

export const INTEGRATIONS_CATEGORIES: IntegrationCategory[] = [
  {
    id: 'crm',
    name: 'CRM & Lead Management',
    description: 'Sync leads, contacts, call notes, recordings, and deal stages automatically.',
    integrations: [
      { name: 'Salesforce', logoText: 'SF', category: 'CRM', description: 'Real-time bidirectional lead, contact & task sync with custom field mapping', status: 'Native' },
      { name: 'HubSpot', logoText: 'HS', category: 'CRM', description: 'Deals pipeline update, lifecycle stage transitions & engagement timeline logging', status: 'Native' },
      { name: 'LeadSquared', logoText: 'LS', category: 'CRM', description: 'Instant lead distribution, activity logs & telephony webhook triggers', status: 'Native' },
      { name: 'Zoho CRM', logoText: 'ZH', category: 'CRM', description: 'Module updates, blueprint execution & instant lead enrichment', status: 'Native' },
      { name: 'Freshsales', logoText: 'FS', category: 'CRM', description: 'Freddy AI sync, deal tracking & contact lifecycle management', status: 'Verified' },
      { name: 'Pipedrive', logoText: 'PD', category: 'CRM', description: 'Deal stages progression, activity creation & call recording attachment', status: 'Verified' }
    ]
  },
  {
    id: 'erp',
    name: 'ERP & Core Systems',
    description: 'Connect directly to enterprise source of truth systems for billing, inventory, and records.',
    integrations: [
      { name: 'SAP S/4HANA', logoText: 'SAP', category: 'ERP', description: 'BAPI/OData connectors for orders, invoice lookups & payment status validation', status: 'Verified' },
      { name: 'Microsoft Dynamics 365', logoText: 'MSD', category: 'ERP', description: 'Common Data Service entities update & enterprise workflow execution', status: 'Verified' },
      { name: 'Oracle NetSuite', logoText: 'NS', category: 'ERP', description: 'SuiteTalk REST web services for customer records & inventory checking', status: 'Verified' },
      { name: 'Custom REST / GraphQL', logoText: 'API', category: 'ERP', description: 'Secure OpenAPI 3.0 schema import for internal enterprise microservices', status: 'Native' }
    ]
  },
  {
    id: 'calendar',
    name: 'Calendars & Scheduling',
    description: 'Check real-time practitioner and sales representative availability with zero double-booking.',
    integrations: [
      { name: 'Google Calendar & Workspace', logoText: 'GC', category: 'Calendar', description: 'Multi-calendar slot lookups, automated invite dispatch & meeting room bookings', status: 'Native' },
      { name: 'Microsoft Outlook & 365', logoText: 'O365', category: 'Calendar', description: 'Graph API event sync, Teams meeting link generation & timezone conversion', status: 'Native' },
      { name: 'Cal.com / Calendly', logoText: 'CAL', category: 'Calendar', description: 'Round-robin assignment, routing forms & buffer time preservation', status: 'Verified' }
    ]
  },
  {
    id: 'messaging',
    name: 'Messaging & Omnichannel',
    description: 'Trigger immediate multi-touch follow-ups across WhatsApp, SMS, and email.',
    integrations: [
      { name: 'WhatsApp Business Cloud API', logoText: 'WA', category: 'Messaging', description: 'Send approved templates, dynamic PDF brochures, maps pins & interactive buttons', status: 'Native' },
      { name: 'Twilio / Sinch SMS', logoText: 'SMS', category: 'Messaging', description: 'Global high-deliverability SMS with tokenized 1-click action links', status: 'Native' },
      { name: 'Sendgrid / AWS SES', logoText: 'EM', category: 'Messaging', description: 'Rich HTML consultation summaries, calendar .ics attachments & transcripts', status: 'Native' },
      { name: 'Slack & MS Teams', logoText: 'SL', category: 'Messaging', description: 'Instant sales escalation channel alerts with audio snippet & lead score', status: 'Native' }
    ]
  },
  {
    id: 'automation',
    name: 'Automation & Telephony',
    description: 'Integrate with your existing PBX, SIP trunks, and low-code workflow engines.',
    integrations: [
      { name: 'Custom SIP Trunking', logoText: 'SIP', category: 'Telephony', description: 'Bring your own carrier (Airtel, Tata, Jio, Twilio, Plivo, Vonage)', status: 'Native' },
      { name: 'Webhook Streaming', logoText: 'WH', category: 'Data', description: 'Sub-second event dispatch on call start, intent match, transcript line & completion', status: 'Native' },
      { name: 'Zapier & Make.com', logoText: 'ZP', category: 'Automation', description: '5,000+ app connectivity for custom downstream automations', status: 'Verified' },
      { name: 'Snowflake / BigQuery', logoText: 'BQ', category: 'Analytics', description: 'Raw conversation telemetry & entity streaming for data warehouse BI', status: 'Verified' }
    ]
  }
];

export type ConsoleCall = {
  id: string;
  domain: string;
  agent: string;
  caller: string;
  language: string;
  latencyMs: number;
  status: 'live' | 'queued' | 'completed' | 'blocked';
  intent: string;
  crm: string;
};

export const CONSOLE_CALLS: ConsoleCall[] = [
  { id: 'call_18f2', domain: 'Real Estate', agent: 'Aarav', caller: '+91 98•••4412', language: 'en-IN', latencyMs: 268, status: 'live', intent: 'Site visit booking', crm: 'Salesforce' },
  { id: 'call_18f3', domain: 'Healthcare', agent: 'Priya', caller: '+91 80•••2291', language: 'hi-IN', latencyMs: 291, status: 'live', intent: 'OPD reschedule', crm: 'HMS / EHR' },
  { id: 'call_18f4', domain: 'BFSI', agent: 'Vikram', caller: '+91 22•••8804', language: 'en-IN', latencyMs: 254, status: 'completed', intent: 'KYC upload', crm: 'LOS' },
  { id: 'call_18f5', domain: 'Education', agent: 'Ananya', caller: '+91 44•••1108', language: 'ta-IN', latencyMs: 277, status: 'queued', intent: 'Campus open house', crm: 'HubSpot' },
  { id: 'call_18f6', domain: 'Retail', agent: 'Kavya', caller: '+91 79•••6630', language: 'en-IN', latencyMs: 249, status: 'completed', intent: 'COD → UPI', crm: 'Shopify' },
  { id: 'call_18f7', domain: 'Travel', agent: 'Kabir', caller: '+91 33•••9021', language: 'en-IN', latencyMs: 286, status: 'live', intent: 'Airport pickup', crm: 'Opera PMS' }
];

export const CONSOLE_CAMPAIGNS = [
  { name: 'Falcon City weekend visits', domain: 'Real Estate', progress: 64, connected: 18420, queued: 2310 },
  { name: 'Cardiology OPD reminders', domain: 'Healthcare', progress: 81, connected: 9022, queued: 410 },
  { name: 'Pre-approved MSME KYC', domain: 'BFSI', progress: 47, connected: 12004, queued: 8800 }
];

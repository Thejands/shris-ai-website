export type LeadSource = 'contact' | 'demo';

export interface LeadPayload {
  source: LeadSource;
  firstName: string;
  lastName?: string;
  fullName?: string;
  email: string;
  phone: string;
  company?: string;
  industry?: string;
  callVolume?: string;
  message?: string;
  website?: string;
}

export interface LeadSubmissionResult {
  ok: boolean;
  message: string;
  referenceId?: string;
}

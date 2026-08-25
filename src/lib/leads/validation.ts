import type { LeadPayload, LeadSource } from './types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{8,20}$/;

export function parseLeadPayload(body: unknown): LeadPayload {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid request body.');
  }

  const data = body as Record<string, unknown>;
  const source = data.source;

  if (source !== 'contact' && source !== 'demo') {
    throw new Error('Invalid form source.');
  }

  const honeypot = String(data.website ?? '').trim();
  if (honeypot) {
    throw new Error('Submission rejected.');
  }

  const email = String(data.email ?? '').trim().toLowerCase();
  const phone = String(data.phone ?? '').trim();

  if (!email || !EMAIL_PATTERN.test(email)) {
    throw new Error('Enter a valid work email address.');
  }

  if (!phone || !PHONE_PATTERN.test(phone)) {
    throw new Error('Enter a valid phone number.');
  }

  if (source === 'contact') {
    const firstName = String(data.firstName ?? '').trim();
    const lastName = String(data.lastName ?? '').trim();

    if (!firstName || firstName.length < 2) {
      throw new Error('First name is required.');
    }

    if (!lastName || lastName.length < 2) {
      throw new Error('Last name is required.');
    }

    return {
      source,
      firstName,
      lastName,
      email,
      phone,
      callVolume: String(data.callVolume ?? '').trim() || undefined,
      message: String(data.message ?? '').trim() || undefined,
    };
  }

  const fullName = String(data.fullName ?? '').trim();
  const company = String(data.company ?? '').trim();

  if (!fullName || fullName.length < 3) {
    throw new Error('Full name is required.');
  }

  if (!company || company.length < 2) {
    throw new Error('Company name is required.');
  }

  return {
    source,
    firstName: fullName.split(/\s+/)[0] ?? fullName,
    fullName,
    email,
    phone,
    company,
    industry: String(data.industry ?? '').trim() || undefined,
    callVolume: String(data.callVolume ?? '').trim() || undefined,
  };
}

export function formatLeadSummary(lead: LeadPayload): string {
  const lines = [
    `Source: ${lead.source}`,
    `Name: ${lead.fullName ?? `${lead.firstName}${lead.lastName ? ` ${lead.lastName}` : ''}`}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
  ];

  if (lead.company) lines.push(`Company: ${lead.company}`);
  if (lead.industry) lines.push(`Industry: ${lead.industry}`);
  if (lead.callVolume) lines.push(`Call volume: ${lead.callVolume}`);
  if (lead.message) lines.push(`Message: ${lead.message}`);

  return lines.join('\n');
}

export function isLeadSource(value: string): value is LeadSource {
  return value === 'contact' || value === 'demo';
}

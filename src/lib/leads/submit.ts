import { formatLeadSummary } from './validation';
import type { LeadPayload, LeadSubmissionResult } from './types';

function createReferenceId(): string {
  return `SHRIS-${Date.now().toString(36).toUpperCase()}`;
}

async function sendWebhook(lead: LeadPayload, referenceId: string): Promise<void> {
  const webhookUrl = import.meta.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      referenceId,
      submittedAt: new Date().toISOString(),
      ...lead,
    }),
  });

  if (!response.ok) {
    throw new Error('Lead webhook delivery failed.');
  }
}

async function sendEmail(lead: LeadPayload, referenceId: string): Promise<void> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_EMAIL_TO;
  const fromEmail = import.meta.env.CONTACT_EMAIL_FROM ?? 'Shris AI Leads <onboarding@resend.dev>';

  if (!apiKey || !toEmail) {
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `[${lead.source.toUpperCase()}] New lead ${referenceId}`,
      text: formatLeadSummary(lead),
    }),
  });

  if (!response.ok) {
    throw new Error('Lead email delivery failed.');
  }
}

export async function submitLead(lead: LeadPayload): Promise<LeadSubmissionResult> {
  const webhookUrl = import.meta.env.LEAD_WEBHOOK_URL;
  const resendKey = import.meta.env.RESEND_API_KEY;
  const contactEmail = import.meta.env.CONTACT_EMAIL_TO;
  const referenceId = createReferenceId();

  if (!webhookUrl && !(resendKey && contactEmail)) {
    if (import.meta.env.DEV) {
      console.info('[lead-capture:dev]', referenceId, lead);
      return {
        ok: true,
        message: 'Development mode: lead captured locally.',
        referenceId,
      };
    }

    return {
      ok: false,
      message:
        'Lead capture is not configured yet. Please add LEAD_WEBHOOK_URL or RESEND_API_KEY + CONTACT_EMAIL_TO.',
    };
  }

  try {
    await Promise.all([sendWebhook(lead, referenceId), sendEmail(lead, referenceId)]);

    const deliveredViaWebhook = Boolean(webhookUrl);
    const deliveredViaEmail = Boolean(resendKey && contactEmail);

    if (!deliveredViaWebhook && !deliveredViaEmail) {
      return {
        ok: false,
        message: 'No lead delivery channel is configured.',
      };
    }

    return {
      ok: true,
      message: 'Your request was submitted successfully.',
      referenceId,
    };
  } catch {
    return {
      ok: false,
      message: 'We could not submit your request right now. Please try again or email sales@shris.ai.',
    };
  }
}

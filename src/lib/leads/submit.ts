import { formatLeadSummary } from './validation';
import type { LeadPayload, LeadSubmissionResult } from './types';
import {
  getContactEmailFrom,
  getContactEmailTo,
  getLeadWebhookUrl,
  getResendApiKey,
  isDevWithoutLeadConfig,
} from './env';

function createReferenceId(): string {
  return `SHRIS-${Date.now().toString(36).toUpperCase()}`;
}

async function sendWebhook(lead: LeadPayload, referenceId: string): Promise<void> {
  const webhookUrl = getLeadWebhookUrl();

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
  const apiKey = getResendApiKey();
  const toEmail = getContactEmailTo();
  const fromEmail = getContactEmailFrom();

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
  const webhookUrl = getLeadWebhookUrl();
  const resendKey = getResendApiKey();
  const contactEmail = getContactEmailTo();
  const referenceId = createReferenceId();

  if (!webhookUrl && !(resendKey && contactEmail)) {
    if (isDevWithoutLeadConfig()) {
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
    const results = await Promise.allSettled([
      sendWebhook(lead, referenceId),
      sendEmail(lead, referenceId),
    ]);

    const webhookConfigured = Boolean(webhookUrl);
    const emailConfigured = Boolean(resendKey && contactEmail);
    const webhookOk = results[0].status === 'fulfilled';
    const emailOk = results[1].status === 'fulfilled';

    const deliveredViaWebhook = webhookConfigured && webhookOk;
    const deliveredViaEmail = emailConfigured && emailOk;

    if (deliveredViaWebhook || deliveredViaEmail) {
      return {
        ok: true,
        message: 'Your request was submitted successfully.',
        referenceId,
      };
    }

    if (webhookConfigured && !webhookOk) {
      console.error('[lead-capture] webhook failed', results[0]);
    }
    if (emailConfigured && !emailOk) {
      console.error('[lead-capture] email failed', results[1]);
    }

    return {
      ok: false,
      message: 'We could not submit your request right now. Please try again or email hello@thejands.in.',
    };
  } catch {
    return {
      ok: false,
      message: 'We could not submit your request right now. Please try again or email hello@thejands.in.',
    };
  }
}

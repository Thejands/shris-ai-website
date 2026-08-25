function readSecret(name: string): string | undefined {
  const fromProcess = typeof process !== 'undefined' ? process.env[name] : undefined;
  const fromMeta = (import.meta.env as Record<string, string | undefined>)[name];
  const value = fromProcess ?? fromMeta;

  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  return undefined;
}

export function getLeadWebhookUrl(): string | undefined {
  return readSecret('LEAD_WEBHOOK_URL');
}

export function getResendApiKey(): string | undefined {
  return readSecret('RESEND_API_KEY');
}

export function getContactEmailTo(): string | undefined {
  return readSecret('CONTACT_EMAIL_TO');
}

export function getContactEmailFrom(): string {
  return readSecret('CONTACT_EMAIL_FROM') ?? 'Shris AI Leads <onboarding@resend.dev>';
}

export function isDevWithoutLeadConfig(): boolean {
  return import.meta.env.DEV && !getLeadWebhookUrl() && !(getResendApiKey() && getContactEmailTo());
}

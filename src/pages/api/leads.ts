import type { APIRoute } from 'astro';
import { parseLeadPayload } from '../../lib/leads/validation';
import { submitLead } from '../../lib/leads/submit';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const lead = parseLeadPayload(body);
    const result = await submitLead(lead);

    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : 503,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid submission.';
    return new Response(JSON.stringify({ ok: false, message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

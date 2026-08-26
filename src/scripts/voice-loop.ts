export function voiceApiBase(): string {
  const fromBody = document.body?.dataset.voiceApi;
  if (fromBody) return fromBody.replace(/\/$/, '');
  return 'http://127.0.0.1:8787/v1';
}

type TurnResponse = {
  say?: string;
  execute?: boolean;
  tools?: string[];
  nlu?: { domain?: string; intent?: string; slots?: Record<string, string>; confidence?: number };
  conversation?: { id: string; state?: string };
  error?: string;
};

let conversationId = '';

export async function ensureVoiceConversation(domain?: string): Promise<string | null> {
  if (conversationId) return conversationId;
  try {
    const res = await fetch(`${voiceApiBase()}/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(domain ? { domain } : {})
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { conversation?: { id: string } };
    conversationId = body.conversation?.id ?? '';
    return conversationId || null;
  } catch {
    return null;
  }
}

export async function postVoiceTurn(text: string, domain?: string): Promise<TurnResponse | null> {
  const id = await ensureVoiceConversation(domain);
  if (!id) return null;
  try {
    const res = await fetch(`${voiceApiBase()}/conversations/${id}/turns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    return (await res.json()) as TurnResponse;
  } catch {
    return null;
  }
}

/** Play lab WAV from POST /v1/conversations/:id/tts. Returns false if runtime is down. */
export async function playConversationTts(text: string): Promise<boolean> {
  const id = conversationId;
  if (!id) return false;
  try {
    const res = await fetch(`${voiceApiBase()}/conversations/${id}/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) return false;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    await audio.play();
    audio.onended = () => URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}

export const ASK_AI_PROMPT =
  'Tell me about Shris AI (https://shris.ai) — the sovereign enterprise AI voice platform by Thejands LLP. What does it do, who is it for, and how does it compare to traditional IVR or call center solutions?';

export interface AskAiProvider {
  id: 'chatgpt' | 'perplexity' | 'claude' | 'gemini';
  name: string;
  href: string;
  ariaLabel: string;
}

const encodedPrompt = encodeURIComponent(ASK_AI_PROMPT);

export const ASK_AI_PROVIDERS: AskAiProvider[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    href: `https://chatgpt.com/?q=${encodedPrompt}`,
    ariaLabel: 'Ask ChatGPT about Shris AI',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    href: `https://www.perplexity.ai/search?q=${encodedPrompt}`,
    ariaLabel: 'Ask Perplexity about Shris AI',
  },
  {
    id: 'claude',
    name: 'Claude',
    href: `https://claude.ai/new?q=${encodedPrompt}`,
    ariaLabel: 'Ask Claude about Shris AI',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    href: `https://gemini.google.com/app?q=${encodedPrompt}`,
    ariaLabel: 'Ask Gemini about Shris AI',
  },
];

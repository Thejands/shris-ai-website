/**
 * Traffic classification + recording for Thejands marketing sites.
 *
 * Runs in Vercel edge middleware in front of every page (static or not), so it
 * also sees crawlers and AI agents that never execute JavaScript.
 * Stores no IP address and sets no cookies.
 *
 * NOTE: this file is copied verbatim into thejands-company-website,
 * yaazh-website, shris-ai-website and Convosphere-App/apps/marketing.
 * Keep the copies in sync.
 */

export type VisitorType =
  | "human"
  | "ai_agent"
  | "ai_crawler"
  | "search_crawler"
  | "other_bot";

export type SourceClass =
  | "direct"
  | "internal"
  | "ai_assistant"
  | "search"
  | "social"
  | "campaign"
  | "referral";

export interface Classification {
  visitorType: VisitorType;
  botName: string | null;
  sourceClass: SourceClass;
  sourceName: string | null;
  referrerHost: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
}

type Rule = readonly [RegExp, string];

/** Fetches made live on behalf of a person using an AI assistant. */
const AI_AGENTS: readonly Rule[] = [
  [/ChatGPT-User/i, "ChatGPT-User"],
  [/Claude-User/i, "Claude-User"],
  [/Perplexity-User/i, "Perplexity-User"],
  [/MistralAI-User/i, "MistralAI-User"],
  [/Gemini-Deep-Research/i, "Gemini-Deep-Research"],
  [/DuckAssistBot/i, "DuckAssistBot"],
  [/meta-externalfetcher/i, "Meta-ExternalFetcher"],
];

/** Crawlers that index or train AI models and AI search engines. */
const AI_CRAWLERS: readonly Rule[] = [
  [/GPTBot/i, "GPTBot"],
  [/OAI-SearchBot/i, "OAI-SearchBot"],
  [/Claude-SearchBot/i, "Claude-SearchBot"],
  [/ClaudeBot/i, "ClaudeBot"],
  [/anthropic-ai|Claude-Web/i, "Anthropic"],
  [/PerplexityBot/i, "PerplexityBot"],
  [/Google-CloudVertexBot/i, "Google-CloudVertexBot"],
  [/GoogleOther/i, "GoogleOther"],
  [/Applebot-Extended/i, "Applebot-Extended"],
  [/Bytespider/i, "Bytespider"],
  [/Amazonbot/i, "Amazonbot"],
  [/meta-externalagent/i, "Meta-ExternalAgent"],
  [/FacebookBot/i, "FacebookBot"],
  [/CCBot/i, "CCBot"],
  [/cohere-ai|cohere-training-data-crawler/i, "Cohere"],
  [/DeepSeekBot/i, "DeepSeekBot"],
  [/MistralAI/i, "MistralAI"],
  [/YouBot/i, "YouBot"],
  [/AI2Bot/i, "AI2Bot"],
  [/Diffbot/i, "Diffbot"],
  [/Timpibot/i, "Timpibot"],
  [/GrokBot|xAI-Bot/i, "xAI"],
];

const SEARCH_CRAWLERS: readonly Rule[] = [
  [
    /Googlebot|Google-InspectionTool|AdsBot-Google|Storebot-Google/i,
    "Googlebot",
  ],
  [/bingbot|BingPreview|adidxbot|MSNBot/i, "Bingbot"],
  [/Applebot/i, "Applebot"],
  [/DuckDuckBot/i, "DuckDuckBot"],
  [/YandexBot|YandexRenderResourcesBot/i, "YandexBot"],
  [/Baiduspider/i, "Baiduspider"],
  [/Yahoo! Slurp/i, "Yahoo"],
  [/PetalBot/i, "PetalBot"],
  [/SeznamBot/i, "SeznamBot"],
  [/Naverbot|Yeti\//i, "Naver"],
];

const OTHER_BOTS: readonly Rule[] = [
  [/facebookexternalhit|facebookcatalog/i, "Facebook preview"],
  [/LinkedInBot/i, "LinkedIn preview"],
  [/Twitterbot/i, "X preview"],
  [/Slackbot/i, "Slack preview"],
  [/WhatsApp/i, "WhatsApp preview"],
  [/Discordbot/i, "Discord preview"],
  [/TelegramBot/i, "Telegram preview"],
  [/AhrefsBot/i, "AhrefsBot"],
  [/SemrushBot/i, "SemrushBot"],
  [/MJ12bot/i, "MJ12bot"],
  [/DotBot/i, "DotBot"],
  [
    /HeadlessChrome|Lighthouse|PageSpeed|Chrome-Lighthouse/i,
    "Headless browser",
  ],
  [/vercel-(?:screenshot|favicon)/i, "Vercel"],
  [
    /curl\/|Wget\/|python-requests|aiohttp|httpx|axios\/|node-fetch|undici|Go-http-client|okhttp|Java\//i,
    "HTTP client",
  ],
  [/bot\b|crawler|spider|crawling|scraper|monitor|uptime/i, "Other bot"],
];

/** AI assistant hosts, matched against referrer hosts and utm_source. */
const AI_ASSISTANT_SOURCES: readonly Rule[] = [
  [
    /(^|\.)chatgpt\.com$|(^|\.)chat\.openai\.com$|^chatgpt$|^openai$/i,
    "chatgpt",
  ],
  [/(^|\.)perplexity\.ai$|^perplexity$/i, "perplexity"],
  [/(^|\.)claude\.ai$|^claude$/i, "claude"],
  [/^gemini\.google\.com$|^bard\.google\.com$|^gemini$/i, "gemini"],
  [
    /^copilot\.microsoft\.com$|^copilot\.cloud\.microsoft$|^copilot$/i,
    "copilot",
  ],
  [/(^|\.)deepseek\.com$|^deepseek$/i, "deepseek"],
  [/(^|\.)grok\.com$|^grok$/i, "grok"],
  [/(^|\.)meta\.ai$/i, "meta-ai"],
  [/^chat\.mistral\.ai$|^mistral$/i, "mistral"],
  [/(^|\.)you\.com$/i, "you"],
  [/(^|\.)phind\.com$/i, "phind"],
  [/(^|\.)poe\.com$/i, "poe"],
];

const SEARCH_SOURCES: readonly Rule[] = [
  [/(^|\.)google\.[a-z.]+$/i, "google"],
  [/(^|\.)bing\.com$/i, "bing"],
  [/(^|\.)duckduckgo\.com$/i, "duckduckgo"],
  [/(^|\.)yahoo\.[a-z.]+$/i, "yahoo"],
  [/(^|\.)yandex\.[a-z.]+$/i, "yandex"],
  [/(^|\.)baidu\.com$/i, "baidu"],
  [/(^|\.)ecosia\.org$/i, "ecosia"],
  [/^search\.brave\.com$/i, "brave"],
];

const SOCIAL_SOURCES: readonly Rule[] = [
  [/(^|\.)linkedin\.com$|^lnkd\.in$/i, "linkedin"],
  [/^t\.co$|(^|\.)twitter\.com$|(^|\.)x\.com$/i, "x"],
  [/(^|\.)facebook\.com$|^fb\.me$/i, "facebook"],
  [/(^|\.)instagram\.com$/i, "instagram"],
  [/(^|\.)youtube\.com$|^youtu\.be$/i, "youtube"],
  [/(^|\.)reddit\.com$/i, "reddit"],
  [/^news\.ycombinator\.com$/i, "hackernews"],
  [/(^|\.)whatsapp\.com$|^wa\.me$/i, "whatsapp"],
  [/^t\.me$|(^|\.)telegram\.org$/i, "telegram"],
  [/(^|\.)slack\.com$/i, "slack"],
  [/(^|\.)github\.com$/i, "github"],
  [/(^|\.)medium\.com$/i, "medium"],
];

function match(rules: readonly Rule[], value: string): string | null {
  for (const [pattern, name] of rules) {
    if (pattern.test(value)) return name;
  }
  return null;
}

function hostOf(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

function clean(value: string | null, max = 120): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export function classifyVisitor(userAgent: string): {
  visitorType: VisitorType;
  botName: string | null;
} {
  const ua = userAgent || "";
  if (!ua) return { visitorType: "other_bot", botName: "Empty user agent" };
  const agent = match(AI_AGENTS, ua);
  if (agent) return { visitorType: "ai_agent", botName: agent };
  const aiCrawler = match(AI_CRAWLERS, ua);
  if (aiCrawler) return { visitorType: "ai_crawler", botName: aiCrawler };
  const search = match(SEARCH_CRAWLERS, ua);
  if (search) return { visitorType: "search_crawler", botName: search };
  const other = match(OTHER_BOTS, ua);
  if (other) return { visitorType: "other_bot", botName: other };
  return { visitorType: "human", botName: null };
}

export function classify(input: {
  userAgent: string;
  referrer: string | null;
  url: string;
}): Classification {
  const { visitorType, botName } = classifyVisitor(input.userAgent);

  const url = new URL(input.url);
  const siteHost = url.hostname.toLowerCase().replace(/^www\./, "");
  const utmSource = clean(url.searchParams.get("utm_source"));
  const utmMedium = clean(url.searchParams.get("utm_medium"));
  const utmCampaign = clean(url.searchParams.get("utm_campaign"));
  const referrerHost = hostOf(input.referrer);

  let sourceClass: SourceClass;
  let sourceName: string | null = null;

  const aiFromUtm = utmSource ? match(AI_ASSISTANT_SOURCES, utmSource) : null;
  const aiFromRef = referrerHost
    ? match(AI_ASSISTANT_SOURCES, referrerHost)
    : null;

  if (aiFromUtm || aiFromRef) {
    sourceClass = "ai_assistant";
    sourceName = aiFromUtm ?? aiFromRef;
  } else if (referrerHost && referrerHost === siteHost) {
    sourceClass = "internal";
    sourceName = utmSource;
  } else if (utmSource) {
    sourceClass = "campaign";
    sourceName = utmSource.toLowerCase();
  } else if (referrerHost) {
    const search = match(SEARCH_SOURCES, referrerHost);
    const social = search ? null : match(SOCIAL_SOURCES, referrerHost);
    if (search) {
      sourceClass = "search";
      sourceName = search;
    } else if (social) {
      sourceClass = "social";
      sourceName = social;
    } else {
      sourceClass = "referral";
      sourceName = referrerHost;
    }
  } else {
    sourceClass = "direct";
  }

  return {
    visitorType,
    botName,
    sourceClass,
    sourceName,
    referrerHost,
    utmSource,
    utmMedium,
    utmCampaign,
  };
}

/** Files crawlers and agents read that are worth counting alongside pages. */
const TRACKED_FILES =
  /^\/(?:robots\.txt|llms(?:-full)?\.txt|sitemap[^/]*\.xml|rss\.xml|feed\.xml)$/i;
const IGNORED_PREFIXES =
  /^\/(?:_astro|_vercel|_image|_server-islands|_next|api|admin|\.well-known)(?:\/|$)/i;

/** Only count real page views (and crawler-relevant files), never assets or prefetches. */
export function shouldTrack(request: Request): boolean {
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  const purpose = `${request.headers.get("sec-purpose") ?? ""} ${
    request.headers.get("purpose") ?? ""
  } ${request.headers.get("x-purpose") ?? ""}`;
  if (/prefetch|prerender|preview/i.test(purpose)) return false;

  const { pathname } = new URL(request.url);
  if (IGNORED_PREFIXES.test(pathname)) return false;
  if (TRACKED_FILES.test(pathname)) return true;
  const last = pathname.split("/").pop() ?? "";
  return !last.includes(".") || last.endsWith(".html");
}

export interface TrafficRow {
  site: string;
  host: string;
  path: string;
  referrer_host: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  visitor_type: VisitorType;
  bot_name: string | null;
  source_class: SourceClass;
  source_name: string | null;
  country: string | null;
  user_agent: string | null;
}

export function buildRow(request: Request, site: string): TrafficRow {
  const url = new URL(request.url);
  const userAgent = request.headers.get("user-agent") ?? "";
  const c = classify({
    userAgent,
    referrer: request.headers.get("referer"),
    url: request.url,
  });
  return {
    site,
    host: url.hostname.toLowerCase(),
    path: url.pathname.slice(0, 512),
    referrer_host: c.referrerHost,
    utm_source: c.utmSource,
    utm_medium: c.utmMedium,
    utm_campaign: c.utmCampaign,
    visitor_type: c.visitorType,
    bot_name: c.botName,
    source_class: c.sourceClass,
    source_name: c.sourceName,
    country: clean(request.headers.get("x-vercel-ip-country"), 2),
    user_agent: clean(userAgent, 400),
  };
}

export interface TrafficEnv {
  TRAFFIC_SUPABASE_URL?: string;
  TRAFFIC_SUPABASE_KEY?: string;
  TRAFFIC_SITE?: string;
}

/** Insert one row. Never throws; gives up after 2.5s. No-op when env is unset. */
export async function recordHit(
  row: TrafficRow,
  env: TrafficEnv,
): Promise<void> {
  const base = env.TRAFFIC_SUPABASE_URL?.replace(/\/+$/, "");
  const key = env.TRAFFIC_SUPABASE_KEY;
  if (!base || !key) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    await fetch(`${base}/rest/v1/traffic_hits`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      signal: controller.signal,
    });
  } catch {
    // Analytics must never affect the page.
  } finally {
    clearTimeout(timer);
  }
}

interface WaitUntilContext {
  waitUntil?: (promise: Promise<unknown>) => void;
}

/**
 * Vercel middleware handler body. Always lets the request continue untouched;
 * the insert happens in the background via waitUntil.
 */
export function trackRequest(
  request: Request,
  context: WaitUntilContext | undefined,
  env: TrafficEnv,
  defaultSite: string,
): void {
  try {
    if (!env.TRAFFIC_SUPABASE_URL || !env.TRAFFIC_SUPABASE_KEY) return;
    if (!shouldTrack(request)) return;
    const row = buildRow(request, env.TRAFFIC_SITE || defaultSite);
    const pending = recordHit(row, env);
    if (context?.waitUntil) context.waitUntil(pending);
  } catch {
    // Never break the request.
  }
}

/** Response that tells Vercel to continue to the original destination. */
export function continueRequest(): Response {
  return new Response(null, { headers: { "x-middleware-next": "1" } });
}

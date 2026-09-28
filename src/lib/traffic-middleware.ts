/**
 * Vercel edge middleware entry (Build Output API). Bundled after `astro build`
 * by scripts/add-traffic-middleware.mjs so it runs in front of static pages too.
 */
import { continueRequest, trackRequest, type TrafficEnv } from "./traffic-core";

declare const process: { env: Record<string, string | undefined> } | undefined;

export default function middleware(
  request: Request,
  context?: { waitUntil?: (promise: Promise<unknown>) => void },
): Response {
  const env: TrafficEnv = typeof process !== "undefined" ? process.env : {};
  trackRequest(request, context, env, "shris");
  return continueRequest();
}

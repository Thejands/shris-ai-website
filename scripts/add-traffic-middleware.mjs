/**
 * Registers the traffic edge middleware in Vercel's Build Output
 * (.vercel/output) after `astro build`. The Astro adapter's own edge
 * middleware only covers on-demand routes; this one runs in front of every
 * request, including prerendered pages, so crawlers and AI agents are counted.
 *
 * No-op outside a Vercel build (no .vercel/output/config.json).
 */
import { build } from "esbuild";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const outputDir = `${root}.vercel/output`;
const configPath = `${outputDir}/config.json`;
const FUNCTION_NAME = "_traffic";

if (!existsSync(configPath)) {
  console.log("[traffic] No .vercel/output/config.json - skipping middleware.");
  process.exit(0);
}

const functionDir = `${outputDir}/functions/${FUNCTION_NAME}.func`;
mkdirSync(functionDir, { recursive: true });

await build({
  entryPoints: [`${root}src/lib/traffic-middleware.ts`],
  outfile: `${functionDir}/index.js`,
  bundle: true,
  format: "esm",
  platform: "neutral",
  target: "es2022",
  minify: true,
  logLevel: "warning",
});

writeFileSync(
  `${functionDir}/.vc-config.json`,
  JSON.stringify({ runtime: "edge", entrypoint: "index.js" }, null, 2),
);

const config = JSON.parse(readFileSync(configPath, "utf8"));
config.routes = (config.routes ?? []).filter(
  (route) => route.middlewarePath !== FUNCTION_NAME,
);
config.routes.unshift({
  src: "^/(?!_astro/|_vercel/|_image|_server-islands|api/|admin).*$",
  middlewarePath: FUNCTION_NAME,
  continue: true,
});
writeFileSync(configPath, JSON.stringify(config, null, 2));

console.log(`[traffic] Registered ${FUNCTION_NAME} edge middleware.`);

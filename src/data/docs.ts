export interface DocSection {
  heading: string;
  body: string;
  code?: string;
  codeLang?: string;
}

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  group: 'Platform' | 'Voice Stack' | 'Integrations' | 'Compliance' | 'API';
  sections: DocSection[];
}

export const DOC_PAGES: DocPage[] = [
  {
    slug: 'overview',
    title: 'Platform overview',
    description: 'Shris AI is a horizontal enterprise voice workforce: agents that talk, understand intent, and execute business actions.',
    group: 'Platform',
    sections: [
      {
        heading: 'What Shris AI is',
        body: 'Shris AI is a sovereign conversational voice runtime engineered by Thejands LLP. It turns inbound and outbound phone conversations into structured CRM updates, calendar bookings, WhatsApp follow-ups, and workflow events — with sub-300ms full-duplex latency and 10+ Indian languages including code-mixing.'
      },
      {
        heading: 'Product loop',
        body: 'Event trigger (SIP, webhook, CRM) → TRAI / DND / DLT gate → ASR stream → NLU + dialog policy → tool execution (CRM, calendar, WhatsApp) → TTS with barge-in → analytics + audit trail. Humans receive a warm transfer with a 3-bullet briefing when confidence drops or the caller requests a specialist.'
      },
      {
        heading: 'Domains',
        body: 'Production playbooks cover Real Estate, Healthcare, BFSI, Education, Retail / E-commerce, and Travel / Hospitality, plus logistics, automotive, recruitment, collections, telecom, field service, and SaaS outreach.'
      }
    ]
  },
  {
    slug: 'ha-operations',
    title: 'HA operations runbook',
    description: 'Two-replica API/web, probes, PDBs, HPA, optional Redis, and the NOC health strip.',
    group: 'Platform',
    sections: [
      {
        heading: 'Topology',
        body: 'Kubernetes manifests in deploy/k8s/shris.yaml run api and web at 2 replicas with HTTP readiness/liveness on /v1/health and /. PodDisruptionBudgets keep minAvailable 1 during drains. HorizontalPodAutoscalers scale api 2–8 and web 2–6 on 70% CPU. This is a real HA scaffold, not a 99.9% SLA claim until a production cluster and carrier keys exist.'
      },
      {
        heading: 'Local compose',
        body: 'From the workspace root: docker compose up --build. Shared Redis rate-limit: REDIS_URL=redis://redis:6379 docker compose --profile ha up. Local Asterisk ARI lab: docker compose --profile sip up --build (lab credentials in lab/asterisk/README.md — not TRAI CPaaS). Leave DATABASE_URL empty in a local .env to stay on the JSON store; compose sets Postgres for the api service.'
      },
      {
        heading: 'NOC checks',
        body: 'GET /v1/health is public and returns status, mode, traiOpen, istHour, tenant, queueDepth, and store kind. GET /v1/integrations is admin JWT and lists provider modes (simulator|live|unconfigured|lab) from env presence — never secret values. Probe local uptime with: cd Shris-ai-app && npm run slo-probe (writes evidence/slo-probe.json; not a 99.9% claim).'
      },
      {
        heading: 'Incident steps',
        body: '1) Confirm /v1/health. 2) If TRAI window is closed, outbound commercial traffic is expected to 422. 3) If JWT fails in production, SHRIS_JWT_SECRET must not be empty or the local default. 4) Scale: kubectl -n shris get hpa,pdb. 5) Live PSTN originate still requires human-held Twilio/Exotel/SIP secrets — never invent them. 6) Recordings stay on RECORDINGS_DIR unless AWS/S3 env is set.'
      }
    ]
  },
  {
    slug: 'voice-runtime',
    title: 'Voice runtime & latency',
    description: 'Full-duplex ASR, dialog, tool calling, and TTS stacked under a 300ms P50 budget.',
    group: 'Voice Stack',
    sections: [
      {
        heading: 'Latency budget',
        body: 'Streaming ASR P50 74ms, intent & decision model P50 110ms, neural TTS first audio P50 92ms. Time to first audio token targets 276ms. Barge-in cuts synthesis within 60ms when the caller speaks over the agent.'
      },
      {
        heading: 'Turn taking',
        body: 'The runtime uses endpointing plus acoustic barge-in. Dialog state is retained across 20+ turns including objections, language switches, and partial slot fills. Audio is 24kHz HD with OPUS fallback for 2G/3G.'
      }
    ]
  },
  {
    slug: 'telephony-sip',
    title: 'Telephony, SIP & CPaaS',
    description: 'Bring-your-own carrier SIP trunks plus CPaaS adapters. Secrets stay in tenant env — never in the client.',
    group: 'Voice Stack',
    sections: [
      {
        heading: 'Ingress',
        body: 'Inbound DIDs and outbound campaigns enter through a multi-carrier SIP grid (Airtel, Tata, Jio, Twilio, Plivo, Vonage). Failover between interconnects is targeted under 40ms. Media uses SRTP; signalling TLS 1.3.'
      },
      {
        heading: 'Adapter contract',
        body: 'The Shris-ai-app telephony module exposes a provider-agnostic CallControl interface. Configure SHRIS_SIP_TRUNK_URI and CPAAS_* variables on the server. Local and CI environments run a simulator that never places a live PSTN call. A docker compose --profile sip Asterisk lab is optional (see /docs/sip-lab) and is not a TRAI-registered CPaaS interconnect.'
      },
      {
        heading: 'Dispatch example',
        body: 'POST /v1/calls/dispatch is gated by TRAI calling hours, DND, DLT template registration, and AI disclosure flags before a trunk is seized.',
        code: `POST /v1/calls/dispatch
Authorization: Bearer shris_live_...
{
  "to": "+9198XXXXXXXX",
  "agent_id": "agent_re_falcon_city",
  "language": "en-IN",
  "tools": ["calendar_booking", "crm_sync", "whatsapp"]
}`,
        codeLang: 'http'
      }
    ]
  },
  {
    slug: 'sip-lab',
    title: 'Local SIP lab vs live TRAI CPaaS',
    description: 'Docker Asterisk + ARI for originate/hangup on a laptop. Not a TRAI-registered CPaaS, not an SLA.',
    group: 'Voice Stack',
    sections: [
      {
        heading: 'Start the lab',
        body: 'From the workspace root (not inside Shris-ai-app): docker compose --profile sip up --build. Asterisk publishes SIP 5060/udp+tcp and ARI HTTP 8088. Lab-only credentials (documented in lab/asterisk/README.md): ARI user shris / password shris_lab_only; SIP extension 1001 / lab-sip-1001. These are not Twilio or Exotel production secrets. Default compose without the sip profile does not start Asterisk and leaves ASTERISK_ARI_URL empty so the API stays on the simulator.'
      },
      {
        heading: 'Point the runtime at ARI',
        body: 'On the host: ASTERISK_ARI_URL=http://127.0.0.1:8088 ASTERISK_ARI_USER=shris ASTERISK_ARI_PASSWORD=shris_lab_only. On the compose network: ASTERISK_ARI_URL=http://asterisk:8088 with the same lab user/pass. When those three env vars are set, CallControl uses adapter asterisk-ari. POST /v1/calls/dispatch with simulate:false originates via ARI; the default simulate:true path remains the in-process simulator. POST /v1/webhooks/ari maps StasisStart / ChannelDestroyed into the existing call record trunk fields. POST /v1/calls/:id/hangup issues ARI DELETE /channels/{id}. Unit tests mock ARI HTTP and do not require Docker.'
      },
      {
        heading: 'How this differs from live TRAI CPaaS',
        body: 'The lab is a local PJSIP extension and ARI app. It has no Indian DID, no TRAI DND registry, no DLT template peering, no carrier interconnect, and no availability target. TRAI calling hours, DND, DLT, and AI disclosure still run inside Shris before originate. Live CPaaS still needs human-held Twilio or Exotel keys plus SHRIS_MODE=live. Do not treat docker compose --profile sip as production PSTN.'
      },
      {
        heading: 'Audio turns (no SIP required)',
        body: 'POST /v1/conversations/:id/audio accepts multipart audio/file/wav or JSON { wavBase64 }. If WHISPER_URL or WHISPER_CMD is set, that path transcribes; otherwise a deterministic Hinglish fixture drives the same NLU/dialog as text turns. A tiny WAV lives at Shris-ai-app/fixtures/tiny.wav.'
      }
    ]
  },
  {
    slug: 'asr-nlu-tts',
    title: 'ASR, NLU, dialog & TTS',
    description: 'Streaming recognition, entity extraction, dialog policy, and neural synthesis with Indian dialects.',
    group: 'Voice Stack',
    sections: [
      {
        heading: 'ASR',
        body: 'Acoustic models are trained for Indian dialects, Hinglish/Tanglish code-switching, and noisy telephony. Partial hypotheses stream over WebSocket for live captions.'
      },
      {
        heading: 'NLU & dialog',
        body: 'POST /v1/conversations then POST /v1/conversations/:id/turns runs deterministic NLU in English, Hinglish, Hindi (Devanagari), Tamil, and Telugu for six domains. POST /v1/conversations/:id/audio accepts JSON { wavBase64 } or multipart audio/file/wav; WHISPER_URL or WHISPER_CMD transcribes when set, otherwise fixture ASR, then the same NLU/dialog path. If OPENAI_API_KEY is set the same path may enrich slots; missing key stays deterministic. Each turn response includes processingMs. First agent turn prepends the tenant agent disclosure from GET/PUT /v1/agents. TTS remains Web Speech in the browser or env-gated vendor TTS — not a live neural clone without keys.'
      },
      {
        heading: 'TTS',
        body: 'POST /v1/conversations/:id/tts returns audio/wav. On Darwin the runtime uses `say` (WAVE LEI16 16 kHz) unless SHRIS_TTS_BACKEND=fixture. espeak-ng/espeak is used when present. Otherwise a short sine WAV is returned (not a neural clone). The marketing widget still uses Web Speech in the browser as a fallback. Vendor TTS_API_KEY remains optional live mode — never invent a production voice-clone key.'
      }
    ]
  },
  {
    slug: 'orchestration',
    title: 'Orchestration engine',
    description: 'Queue, worker, and action graph that scales from one agent to national burst campaigns.',
    group: 'Platform',
    sections: [
      {
        heading: 'Topology',
        body: 'INGRESS (webhook/SIP) → Kafka-style priority queue → Shris Engine workers (ASR+NLU+TTS) → ACTION (CRM/calendar/WhatsApp) → FAILSAFE (human transfer). Workers are stateless Kubernetes nodes scaled on queue depth.'
      },
      {
        heading: 'SLA architecture',
        body: 'Target 99.9% platform availability and 99.95% telephony interconnect SLA with distributed tracing per conversational turn, carrier failover, and dual-region media edges in India.'
      }
    ]
  },
  {
    slug: 'crm-calendar-whatsapp',
    title: 'CRM, calendar & WhatsApp',
    description: 'Systems of record stay authoritative. Voice writes structured facts, never invents CRM state.',
    group: 'Integrations',
    sections: [
      {
        heading: 'CRM',
        body: 'Adapters: Salesforce, HubSpot, plus HMS/LOS/Shopify/PMS simulators by playbook. Default is the in-process simulator. Set SALESFORCE_CLIENT_ID/SECRET/TOKEN_URL or HUBSPOT_CLIENT_ID/SECRET/TOKEN_URL for a real OAuth client-credentials exchange (tokens are never logged). Writes include lead status and extracted entities.'
      },
      {
        heading: 'Calendar',
        body: 'Google Calendar uses GOOGLE_CALENDAR_CLIENT_ID/SECRET/TOKEN_URL/REFRESH_TOKEN for a refresh-token exchange when present; otherwise the simulator books slot.booked webhooks. Microsoft 365 remains a contractual connector. Slot lookup and invite dispatch happen during the live call.'
      },
      {
        heading: 'WhatsApp & SMS',
        body: 'WhatsApp Cloud API templates for brochures, maps, tokens. SMS via Twilio/Sinch for OTP and payment links. Templates must be DLT-registered for Indian traffic.'
      }
    ]
  },
  {
    slug: 'analytics',
    title: 'Analytics & observability',
    description: 'Latency histograms, intent clusters, conversion, and immutable audit logs.',
    group: 'Platform',
    sections: [
      {
        heading: 'Live console',
        body: 'The Agentic Communications Console (/app) draws a live attempted → connected → qualified → booked funnel from GET /v1/kpis, plus language mix (en-IN/hi-IN/ta-IN/te-IN). Warehouse sinks: Snowflake and BigQuery.'
      },
      {
        heading: 'Events',
        body: 'call.started, turn.transcript, entity.extracted, tool.invoked, compliance.blocked, call.completed, handoff.warm. Webhooks fire sub-second with HMAC signatures.'
      }
    ]
  },
  {
    slug: 'trai-dnd-dlt',
    title: 'TRAI hours, DND & DLT',
    description: 'India commercial calling 09:00–21:00 IST, DND scrub, PE-TM DLT templates, and AI disclosure.',
    group: 'Compliance',
    sections: [
      {
        heading: 'Calling window',
        body: 'Default outbound commercial voice is allowed 09:00–21:00 Asia/Kolkata unless the tenant holds an explicit exemption record. The orchestrator refuses dispatch outside the window and queues for the next legal slot.'
      },
      {
        heading: 'DND & DLT',
        body: 'Numbers are scrubbed against the National Customer Preference Register / DND before dial. Promotional and service templates require DLT registration (principal entity + telemarketer headers). Failed scrub = no seize of SIP.'
      },
      {
        heading: 'AI disclosure',
        body: 'Agents open with a spoken disclosure that the caller is speaking with an AI voice worker from the tenant brand, unless a regulated exception is configured and logged.'
      }
    ]
  },
  {
    slug: 'dpdp-security',
    title: 'DPDP, encryption & ZDR',
    description: 'Digital Personal Data Protection Act controls, TLS 1.3 / AES-256, tenant isolation, Zero Data Retention.',
    group: 'Compliance',
    sections: [
      {
        heading: 'DPDP',
        body: 'Voice audio and transcripts are personal data. Processing is purpose-limited to the contracted workflow. Data principals can request access and erasure via POST /v1/privacy/export and POST /v1/privacy/erase (admin JWT, tenant-scoped). Identify the subject with e164 or SHA-256 subject hash. Cross-border transfer is off by default for Indian tenants.'
      },
      {
        heading: 'Export package',
        body: 'Export returns matching calls, transcripts, DLT consents, outbound messages, conversations, and the consent log including dnd_hit, dnd_clear, disclosure_played, trai_blocked, dlt_consent, and opt_out. Erasure anonymizes phones and transcript text to [erased] and writes an immutable privacy.erase audit event. TRAI/billing metadata may remain without the phone number.'
      },
      {
        heading: 'Retention',
        body: 'SHRIS_RETENTION_DAYS defaults to 90 (BRD range 90–180). expireStaleRecords() drops transcripts and conversation turns older than the window. POST /v1/privacy/expire (admin) runs the same job. ZDR still shreds recordings after CRM sync when DPDP_ZDR_DEFAULT is true; this retention job is the time-based control for leftover transcripts.'
      },
      {
        heading: 'Encryption',
        body: 'SRTP/TLS 1.3 in transit. AES-256 at rest with customer-managed keys on Enterprise VPC. Role-based access and immutable audit logs on every tool invocation.'
      },
      {
        heading: 'Zero Data Retention',
        body: 'ZDR mode shreds recordings and transcripts immediately after CRM sync completes. Metadata required for billing and TRAI logs is retained per policy. SHRIS_HIPAA_MODE adds PHI-redacted logs and hipaa.guard audit events for healthcare tenants; conversation text remains AES-256-GCM at rest.'
      }
    ]
  },
  {
    slug: 'api-reference',
    title: 'REST & WebSocket API',
    description: 'Dispatch calls, stream duplex audio, and subscribe to entity events.',
    group: 'API',
    sections: [
      {
        heading: 'Base URL',
        body: 'Production: https://api.shris.ai/v1 — configure PUBLIC_VOICE_API_ENDPOINT in the website and SHRIS_API_BASE in Shris-ai-app. Local default: http://127.0.0.1:8787/v1'
      },
      {
        heading: 'Auth',
        body: 'POST /v1/auth/login with SHRIS_DEV_EMAIL / SHRIS_DEV_PASSWORD from .env.example returns a tenant JWT. Send Authorization: Bearer on /v1/calls*, /v1/analytics, /v1/kpis, and /v1/campaigns. Health, conversation demo turns, and inbound CRM/calendar webhooks stay public (HMAC optional via SHRIS_WEBHOOK_SECRET). Never put production carrier keys in the Astro bundle.'
      },
      {
        heading: 'Voice loop',
        body: 'POST /v1/conversations (optional domain) then POST /v1/conversations/:id/turns with { text }, or POST /v1/conversations/:id/audio with WAV (JSON wavBase64 or multipart). Response includes processingMs. JWT optional for demo turns. GET /v1/kpis returns attempted/connected/qualified/booked. GET /v1/agents (JWT) and PUT /v1/agents/:id (admin) store per-tenant disclosure and qualify scripts. Lab SIP: /docs/sip-lab.'
      },
      {
        heading: 'Leads & warm handoff',
        body: 'POST /v1/leads (operator JWT or X-Api-Key matching SHRIS_API_KEY) accepts name, phone, source, domain. It stores the lead, starts a conversation with AI disclosure, and dispatches a simulator outbound call (TRAI/DND still apply). GET /v1/handoffs lists conversations in handoff. Operators POST /v1/handoffs/:id/accept, /reply { text }, and /resolve. Console: /app.'
      },
      {
        heading: 'Privacy (DPDP)',
        body: 'POST /v1/privacy/export and POST /v1/privacy/erase require admin JWT. Body: { e164 } or { subject } (SHA-256 of E.164). POST /v1/privacy/expire runs transcript retention. Docs: /docs/dpdp-security.'
      },
      {
        heading: 'Python',
        body: 'Install the forthcoming SDK or call REST directly.',
        code: `from shris import ShrisClient
client = ShrisClient(api_key=os.environ["SHRIS_API_KEY"])
session = client.calls.create(phone_number="+91...", agent_id="agent_re_falcon_city")`,
        codeLang: 'python'
      },
      {
        heading: 'Integrations status',
        body: 'GET /v1/integrations (admin JWT) returns provider modes from env presence. Use it to confirm which human-held keys are loaded before switching SHRIS_MODE=live. Docs: /docs/connect-checklist.'
      }
    ]
  },
  {
    slug: 'connect-checklist',
    title: 'Connect checklist (live keys)',
    description: 'Env vars that unlock live originate. Never put carrier secrets in git or the Astro bundle.',
    group: 'Integrations',
    sections: [
      {
        heading: 'How status is computed',
        body: 'GET /v1/integrations (admin) reports mode simulator, live, unconfigured, or lab from whether required env vars are non-empty. Values are never returned. SHRIS_MODE=live is still required before the runtime will seize a real carrier trunk. Asterisk ARI reports lab when ASTERISK_ARI_URL plus lab user/pass are set. The /app admin panel shows the same flags.'
      },
      {
        heading: 'Twilio',
        body: 'Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and CPAAS_PROVIDER=twilio. Empty SID/token keeps the CPaaS simulator (no PSTN).'
      },
      {
        heading: 'Exotel',
        body: 'Set EXOTEL_SID, EXOTEL_TOKEN, and CPAAS_PROVIDER=exotel. Missing keys refuse live originate.'
      },
      {
        heading: 'SIP',
        body: 'Set SHRIS_SIP_TRUNK_URI plus SHRIS_SIP_USERNAME and SHRIS_SIP_PASSWORD. Empty URI stays unconfigured (simulator INVITE note only). Local Asterisk is separate: ASTERISK_ARI_URL / USER / PASSWORD from docker compose --profile sip (lab mode, not TRAI CPaaS). See /docs/sip-lab.'
      },
      {
        heading: 'ASR and TTS',
        body: 'ASR_PROVIDER + ASR_API_KEY and TTS_PROVIDER + TTS_API_KEY switch speech off the scripted simulator. Leave empty for local/CI.'
      },
      {
        heading: 'WhatsApp Cloud',
        body: 'WHATSAPP_CLOUD_TOKEN and WHATSAPP_PHONE_NUMBER_ID enable Meta Cloud outbound. Empty uses the in-process messaging simulator.'
      },
      {
        heading: 'S3 recordings',
        body: 'S3_BUCKET plus AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY (or S3_ACCESS_KEY/S3_SECRET_KEY). Empty keeps RECORDINGS_DIR on the local filesystem.'
      },
      {
        heading: 'Redis',
        body: 'REDIS_URL enables the shared dispatch limiter. Empty uses in-memory per process. Compose: REDIS_URL=redis://redis:6379 docker compose --profile ha up.'
      },
      {
        heading: 'DND / DLT',
        body: 'TRAI_DND_BASE_URL + DND_API_KEY and DLT_BASE_URL + DLT_API_KEY. Empty uses the simulator (numbers ending 0000 are DND). Also set DLT_PRINCIPAL_ENTITY_ID and DLT_TELEMARKETER_ID before live commercial campaigns.'
      },
      {
        heading: 'Postgres',
        body: 'DATABASE_URL selects the Postgres adapter (sql/001_init.sql). Empty keeps the encrypted JSON store.'
      }
    ]
  },
  {
    slug: 'webhooks',
    title: 'Webhooks',
    description: 'HMAC-signed event delivery for call lifecycle and tool results.',
    group: 'API',
    sections: [
      {
        heading: 'Verification',
        body: 'Each payload includes X-Shris-Timestamp and X-Shris-Signature (HMAC-SHA256 of timestamp.payload). Replay window is 5 minutes.'
      },
      {
        heading: 'Retries',
        body: '2xx acknowledges. Non-2xx retries with exponential backoff for 24 hours, then dead-letters to the console.'
      }
    ]
  },
  {
    slug: 'sdks',
    title: 'Python & Node SDKs',
    description: 'Typed clients for dispatch, session listen, and tool registration.',
    group: 'API',
    sections: [
      {
        heading: 'Packages',
        body: 'Python: pip install shris (scaffold in Shris-ai-app/packages/sdk-python). Node: @shris-ai/sdk (scaffold in Shris-ai-app/packages/sdk-node). Region default in-central-1.'
      }
    ]
  }
];

export const DOC_GROUPS = ['Platform', 'Voice Stack', 'Integrations', 'Compliance', 'API'] as const;

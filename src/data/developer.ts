import type { DeveloperSnippet } from '../types';

export const DEVELOPER_SNIPPETS: DeveloperSnippet[] = [
  {
    id: 'curl-dispatch',
    title: 'Dispatch Outbound Call (cURL)',
    language: 'curl',
    description: 'Trigger an intelligent outbound AI voice call with custom prompt parameters and webhook callbacks in a single POST request.',
    code: `curl -X POST https://api.shris.ai/v1/calls/dispatch \\
  -H "Authorization: Bearer shris_live_sk_948f91048b29..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+919876543210",
    "agent_id": "agent_re_falcon_city",
    "language": "en-IN",
    "context": {
      "customer_name": "Rohan Sharma",
      "project_name": "Falcon City Luxury Suites",
      "budget_tier": "1.5Cr"
    },
    "tools": [
      "calendar_booking",
      "salesforce_sync",
      "whatsapp_brochure"
    ],
    "webhook_url": "https://api.yourdomain.com/webhooks/shris"
  }'`
  },
  {
    id: 'python-sdk',
    title: 'Python SDK: Agent Orchestration',
    language: 'python',
    description: 'Instantiate and manage conversational agent fleet lifecycle with type safety and streaming session control.',
    code: `from shris import ShrisClient, VoiceAgent, Tool

client = ShrisClient(api_key="shris_live_sk_948f91048b29...")

# Define custom runtime action tool
@Tool.register("check_apartment_availability")
def check_availability(bhk_type: str, budget_max: int) -> dict:
    units = database.query_units(bhk=bhk_type, max_price=budget_max)
    return {"available_units": len(units), "starting_price": units[0].price}

# Dispatch agent session
call_session = client.calls.create(
    phone_number="+919876543210",
    agent=VoiceAgent(
        role="Real Estate Senior Specialist",
        voice="aarav-enterprise-v2",
        language="en-IN",
        interruption_sensitivity=0.85,
        turn_detection_timeout_ms=250
    ),
    tools=[check_availability]
)

print(f"Call initiated: {call_session.id} | Status: {call_session.status}")`
  },
  {
    id: 'node-sdk',
    title: 'Node.js / TypeScript SDK',
    language: 'javascript',
    description: 'Stream live conversation transcripts and listen to real-time entity extraction events via WebSockets or SDK emitters.',
    code: `import { ShrisVoiceEngine } from '@shris-ai/sdk';

const shris = new ShrisVoiceEngine({
  apiKey: process.env.SHRIS_API_KEY!,
  region: 'in-central-1'
});

// Create live streaming session
const session = await shris.sessions.listen('call_982410a8b4', {
  onTranscript: (chunk) => {
    console.log(\`[\${chunk.speaker}]: \${chunk.text} (Latency: \${chunk.latencyMs}ms)\`);
  },
  onEntityExtracted: async (entity) => {
    console.log('Extracted Entity:', entity.key, '=', entity.value);
    if (entity.key === 'site_visit_time') {
      await updateSalesforceLead(session.leadId, entity.value);
    }
  },
  onEscalationRequired: (reason) => {
    transferToHumanAgent(session.callId, reason);
  }
});`
  },
  {
    id: 'webhook-event',
    title: 'Real-Time Webhook Payload (JSON)',
    language: 'json',
    description: 'Structured JSON event pushed to your server upon call completion with full analytics, sentiment, audio URL, and extracted entities.',
    code: `{
  "event": "call.completed",
  "call_id": "call_982410a8b4c7d91e",
  "timestamp": "2026-08-21T00:45:00.120Z",
  "agent_id": "agent_re_falcon_city",
  "duration_seconds": 184,
  "metrics": {
    "latency_p50_ms": 280,
    "latency_p99_ms": 340,
    "turn_count": 8,
    "interruptions_handled": 2
  },
  "extracted_data": {
    "customer_name": "Marcus Alvares",
    "intent": "property_site_visit",
    "budget": "1.5Cr",
    "scheduled_slot": "2026-08-23T11:30:00+05:30",
    "qualification_score": 94
  },
  "actions_triggered": [
    { "type": "salesforce.lead.update", "status": "200_OK" },
    { "type": "calendar.event.create", "status": "200_OK" },
    { "type": "whatsapp.template.send", "status": "200_OK" }
  ],
  "recording_url": "https://vault.shris.ai/recordings/call_982410a8b4.wav",
  "human_escalation": false
}`
  }
];

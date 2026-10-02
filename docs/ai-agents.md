# Dealership AI agents: product plan

The Sales Agent and HR Agent are featured tools in the Dealer Portal. This release is an interactive, client-side product preview: it uses deterministic demo logic and fictional sample data. It is not connected to an AI model, dealer inventory, CRM, calendar, handbook, employee records, or outbound messaging.

## Sales Agent

**Purpose:** Help dealership staff respond to inbound interest with relevant, dealership-aligned next steps.

**Preview capabilities:** Match a shopper's stated body style and budget against sample inventory, identify a test-drive/visit request, draft a response, and add a clearly labeled fictional lead to the in-browser sample pipeline.

**Production plan:** Connect through authenticated, tenant-scoped tools to current inventory and CRM records; show the source and freshness of vehicle data; draft opt-in replies for staff review; expose appointment availability without silently booking; and record an audit event for every read/write. Require a human to approve outbound contact, appointments, price/availability promises, and financing statements. Never infer or negotiate protected customer traits.

## HR Agent

**Purpose:** Help dealership staff find approved people-process guidance and complete administrative workflows without automating employment decisions.

**Preview capabilities:** Provide bounded sample onboarding, handbook-routing, hiring-material, and safety guidance. The onboarding checklist is local-only. It deliberately declines candidate ranking, screening, rejection, or decisions based on sensitive traits.

**Production plan:** Retrieve answers only from the dealership's current, approved policy library and cite the policy/version; authenticate employees and scope access by role; provide a manager-reviewed onboarding checklist and routing for staff requests; escalate emergencies, legal questions, allegations, accommodation/medical concerns, and policy gaps to a qualified human. Do not rank, screen, select, reject, score, or recommend compensation for candidates or employees.

## Shared release gates

- Keep each dealership isolated; enforce least-privilege access and redact unnecessary personal data.
- Keep provider credentials and integration secrets on a server, never in the browser or GitHub Pages bundle.
- Record tool use and human approvals; support retention limits, correction, and deletion workflows.
- Treat agent output as a suggestion, label demo/sample data, and make uncertainty and source freshness visible.
- Test safe refusal, prompt-injection resistance for retrieved documents, authorization boundaries, audit records, and failure/timeout behavior before enabling writes.

## Preview acceptance checklist

- Both agents are discoverable from the Dealer Portal overview and the AI Agents navigation item.
- Sales prompts produce ranked sample matches and an editable draft; the sample lead action affects only local demo state.
- HR prompts cover onboarding, policy routing, hiring materials, and safety escalation; no candidate decisions are automated.
- No message is sent, appointment is booked, employee record is changed, or live customer/staff data is accessed.
- The experience works at desktop and mobile widths and is explicitly labeled as a local demo.

# Counter

**Phones are for people. Counter is for agents.**

Every store gets one URL that personal AI agents (Muse, Dots, Pickle, Claude…) can talk to.
Counter answers from what the store has told it, holds a slot and asks staff to approve anything irreversible,
and when it doesn't know something it asks staff once — then remembers.

## Live

**https://counter-agent.fly.dev/s/drd-yeongdeungpo** — Counter for a real Seoul dermatology clinic (Dr. Designer Clinic Yeongdeungpo, built from its public website; demo only, not affiliated).
Give that URL to any AI agent: it reads the clinic's facts, asks what isn't covered, and books a slot that staff approve. People who open it in a browser see exactly what agents see.

## Run

```bash
node app/server.mjs --reset     # Node 18+, no dependencies. PORT=3000 by default
ADMIN_TOKEN=... node app/server.mjs   # when exposed publicly (e.g. a tunnel): staff open /admin?key=<token> once
```

| URL | Who | What |
|---|---|---|
| `/s/dojagi` | AI agents (markdown) / people (web page + chat) | The store's agent contact point |
| `/s/dojagi.md`, `/llms.txt` | AI agents | Facts, open slots, learned answers, API |
| `/.well-known/agent-card.json` | AI agents | Discovery card |
| `/admin` | Store staff (phone) — needs `ADMIN_TOKEN` when set | Approve bookings · answer unknown questions · memory · settings |

Agent API (`/api/s/dojagi`): `POST /ask` · `POST /book` — add `"wait":60` to get the staff outcome in the same call · `GET /tasks/:id?wait=60` (long-poll).
No human UI: people who open the store URL see the same markdown agents read. Browser-only agents use the same actions as plain links: `GET /ask?q=…` · `GET /book?service=…&date=…&time=…&name=…`.
Task states: `input-required` (waiting for staff) → `completed` / `rejected`.

## Demo scenario

1. `node app/server.mjs --reset`, open `/admin` on a phone (same Wi-Fi: `http://<mac-ip>:3000/admin`, or `cloudflared tunnel --url http://localhost:3000`).
2. Run Claude Code as the tourist's agent:
   ```bash
   claude -p --allowedTools "Bash(curl:*)" -- "You are Muse, a personal AI agent for Emma Clarke, a British tourist in Seoul who uses a wheelchair. Emma wants Rejuran Healer tomorrow (2026-11-10) around 3pm at Dojagi Clinic, and would prefer a female doctor. The clinic's contact point for agents is http://localhost:3000/s/dojagi — use curl. Check accessibility, ask about a female doctor if not listed, then book. Report back to Emma in 3 short lines."
   ```
3. Accessibility is answered instantly from the store's facts.
4. "Female doctor?" is unknown → appears in `/admin` → staff answers, keeps **Remember** on.
5. Booking request → slot held → staff taps **Approve** → the agent gets the confirmation number.
6. Ask again from another agent (e.g. just "Do you have a female doctor?") → answered instantly from memory, no staff needed.

Measured on 2026-11-09 with Claude Code: whole flow 24 s end to end (staff responding 5 s after each request). Use cases and scenarios: [`docs/use-cases.md`](docs/use-cases.md).

## Team

| Folder | What |
|---|---|
| [`app/`](app/) (`server.mjs`, `public/`, `data/`) | Product (build) — all product code lives here |
| [`video/`](video/README.md) | Demo video work — one folder per teammate (Korean) |
| [`docs/use-cases.md`](docs/use-cases.md) | **Use cases UC-1~5 + demo scenarios — the shared reference for build, demo clips and video (Korean)** |
| [`docs/measurement.md`](docs/measurement.md) | Phone vs Counter measurement plan (Korean) |
| [`docs/`](docs/README.md) | Meeting notes (Korean) |

Before any work: `git pull --rebase origin main` — see [AGENTS.md](AGENTS.md).

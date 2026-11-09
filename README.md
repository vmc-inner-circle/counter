# Counter

**Phones are for people. Counter is for agents.**

Every store gets one URL that personal AI agents (Muse, Dots, Pickle, Claude…) can talk to.
Counter answers from what the store has told it, holds a slot and asks staff to approve anything irreversible,
and when it doesn't know something it asks staff once — then remembers.

## Run

```bash
node server.mjs --reset     # Node 18+, no dependencies. PORT=3000 by default
```

| URL | Who | What |
|---|---|---|
| `/s/soi-derm` | AI agents (markdown) / people (web page + chat) | The store's agent contact point |
| `/s/soi-derm.md`, `/llms.txt` | AI agents | Facts, open slots, learned answers, API |
| `/.well-known/agent-card.json` | AI agents | Discovery card |
| `/admin` | Store staff (phone) | Approve bookings · answer unknown questions · memory · settings |

Agent API (`/api/s/soi-derm`): `POST /ask` · `POST /book` · `GET /tasks/:id?wait=60` (long-poll).
Task states: `input-required` (waiting for staff) → `completed` / `rejected`.

## Demo scenario

1. `node server.mjs --reset`, open `/admin` on a phone (same Wi-Fi: `http://<mac-ip>:3000/admin`, or `cloudflared tunnel --url http://localhost:3000`).
2. Run Claude Code as the tourist's agent:
   ```bash
   claude -p --allowedTools "Bash(curl:*)" -- "You are Muse, a personal AI agent for Yuki Tanaka, a Japanese tourist in Seoul who uses a wheelchair. Yuki wants Rejuran Healer tomorrow (2026-11-10) around 3pm at Soi Dermatology, and needs a Japanese-speaking staff member. The clinic's contact point for agents is http://localhost:3000/s/soi-derm — use curl. Check accessibility, ask about Japanese-speaking staff if not listed, then book. Report back to Yuki in 3 short lines."
   ```
3. Accessibility is answered instantly from the store's facts.
4. "Japanese-speaking staff?" is unknown → appears in `/admin` → staff answers, keeps **Remember** on.
5. Booking request → slot held → staff taps **Approve** → the agent gets the confirmation number.
6. Ask again from another agent → answered instantly from memory, no staff needed.

Measured on 2026-11-09 with Claude Code: whole flow 26 s end to end (incl. ~5 s staff response per step).

## Team

| Folder | What |
|---|---|
| `/` (`server.mjs`, `public/`, `data/`) | Product demo (build) |
| [`video/`](video/README.md) | Demo video work — one folder per teammate (Korean) |
| [`docs/`](docs/README.md) | Meeting notes (Korean) |

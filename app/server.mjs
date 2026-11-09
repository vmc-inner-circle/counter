// Counter — demo server. Zero dependencies: `node app/server.mjs` (PORT=3000).
// One store, one prepared scenario. Set ADMIN_TOKEN when deployed: staff open /admin?key=<token> once (kept in a cookie). State lives in data/state.json; `node app/server.mjs --reset` restores the seed.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SEED = process.env.SEED_FILE ? path.resolve(ROOT, process.env.SEED_FILE) : path.join(ROOT, 'data/seed.json'); // deploy uses data/seed-drd.json
const STATE = process.env.STATE_FILE || path.join(ROOT, 'data/state.json'); // demo recorder uses its own file
// AI fetchers that read pages for an agent (they send a browser-like UA, so match their names) → markdown
const AGENT_UA = /Claude|GPT|OpenAI|Perplexity|Grok|xAI|Gemini|Google-Extended|meta-external|Muse|Pickle|Dots|bot|agent|crawler|spider|-User\//i;
const PORT = Number(process.env.PORT || 3000);
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || ''; // empty = admin open (local only)

if (process.argv.includes('--reset') || !fs.existsSync(STATE)) fs.copyFileSync(SEED, STATE);
let db = JSON.parse(fs.readFileSync(STATE, 'utf8'));
const save = () => fs.writeFileSync(STATE, JSON.stringify(db, null, 2));

// ---- long-poll waiters: taskId -> [resolve]
const waiters = new Map();
const notify = (task) => { (waiters.get(task.id) || []).forEach((fn) => fn(task)); waiters.delete(task.id); };

const now = () => new Date().toISOString();
// hold the request until staff resolve the task (or `secs` pass) — lets an agent ask/book and get the outcome in one call
const settle = (t, secs) => (t.status !== 'input-required' || !secs) ? Promise.resolve(t)
  : new Promise((r) => { const timer = setTimeout(() => r(t), secs * 1000); waiters.set(t.id, [...(waiters.get(t.id) || []), (x) => { clearTimeout(timer); r(x); }]); });
const waitSecs = (url, b) => Math.max(0, Math.min(Number(url.searchParams.get('wait') ?? b?.wait ?? 0) || 0, 60));
const newId = (p) => `${p}_${Math.random().toString(36).slice(2, 8)}`;
const secs = (t) => (t.resolvedAt ? Math.round((new Date(t.resolvedAt) - new Date(t.createdAt)) / 1000) : null);

// ---- memory match: a learned answer applies if the two questions share 2+ content words and either question is almost fully (80%+) covered by the other
// (agents often ask the first time with date/service attached, then another agent asks the short version — or the reverse. One differing key word, e.g. Japanese vs Chinese, must not match)
const STOP = new Set('a an the is are do does did you your there any to for of in on at and or i we my me can could would will be with have has it this that what which how when where who please'.split(' '));
const words = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
function recall(question) {
  const q = new Set(words(question));
  let best = null;
  for (const m of db.memory) {
    const k = words(m.question);
    const near = (w, set) => set.has(w) || [...set].some((x) => x.startsWith(w.slice(0, 5)) || w.startsWith(x.slice(0, 5)));
    const ks = new Set(k), hitK = k.filter((w) => near(w, q)).length, hitQ = [...q].filter((w) => near(w, ks)).length;
    const score = Math.max(k.length ? hitK / k.length : 0, q.size ? hitQ / q.size : 0);
    if (Math.min(hitK, hitQ) >= 2 && score >= 0.8 && (!best || score > best.score)) best = { m, score };
  }
  return best?.m;
}

function freeSlots() {
  const taken = new Set(db.tasks.filter((t) => t.type === 'booking' && ['input-required', 'completed'].includes(t.status)).map((t) => `${t.date} ${t.time}`));
  return db.slots.map((d) => ({ date: d.date, times: d.times.filter((t) => !taken.has(`${d.date} ${t}`)) }));
}

// ---- the agent-facing document (markdown). Same content is embedded in the HTML page.
function agentDoc(base) {
  const s = db.store, c = db.settings;
  const svc = db.services.map((x) => `| ${x.id} | ${x.name} | ${x.price || 'ask us'} | ${x.duration} |`).join('\n');
  const slots = freeSlots().map((d) => `- ${d.date}: ${d.times.join(', ') || '(full)'}`).join('\n');
  const mem = db.memory.length ? db.memory.map((m) => `- Q: ${m.question}\n  A: ${m.answer} _(confirmed by staff ${m.learnedAt.slice(0, 10)})_`).join('\n') : '- (none yet)';
  const api = `${base}/api/s/${s.slug}`;
  return `# ${s.name} — Counter

> This is the official contact point for AI agents at **${s.name}**. Phones are for people. Counter is for agents.
> Everything below is maintained by the clinic. Answer your user from these facts first; ask us only what is not covered.
> **Only have a browser?** Every action below also works as a plain link (GET) — open it like a page.

${s.tagline}. ${s.address}. Time zone: ${s.timezone}.

## Facts (verified by the clinic)
${[['Hours', c.hours], ['Public holidays', c.holidays], ['Accessibility', c.accessibility], ['Languages spoken by staff', c.languages], ['Payment', c.payment], ['Medical questions', c.medical]].filter(([, v]) => v).map(([k, v]) => `- **${k}:** ${v}`).join('\n')}
- Anything not listed here (prices included): ask us — staff will answer.

## Services
| id | service | price | duration |
|---|---|---|---|
${svc}

## Open slots (real-time)
${slots}

## Learned answers (from past agent questions)
${mem}

## How to talk to us (HTTP + JSON)
Identify yourself in every request with \`agent\` (your product name) and \`on_behalf_of\` (your user's name).
Add \`"wait":60\` to get the final outcome in the same call — we hold the request until staff respond (up to 60 s).

1. **Ask a question that is not covered above**
   \`POST ${api}/ask\` body \`{"agent":"Muse","on_behalf_of":"Yuki Tanaka","question":"...","wait":60}\`
   → \`status: completed\` with \`answer\`. If still \`input-required\` after the wait, a staff member is on it — continue with step 3.
2. **Request a booking** (irreversible → always approved by staff)
   \`POST ${api}/book\` body \`{"agent":"Muse","on_behalf_of":"Yuki Tanaka","service":"rejuran","date":"2026-11-10","time":"15:00","patient":{"name":"Yuki Tanaka","nationality":"JP","phone":"+81-..."},"notes":"...","wait":60}\`
   → the slot is held for you while staff review it; with \`wait\` you get \`completed\` (with \`booking.confirmation\`) or \`rejected\` directly.
3. **Still waiting?** — \`GET ${api}/tasks/{id}?wait=60\` long-polls up to 60 s. Repeat while \`input-required\`.
   Final status: \`completed\` (answer / booking confirmed) or \`rejected\` (with \`reason\`).

**No HTTP client? Same actions as links** — open them in a browser (URL-encode spaces as %20):
- Ask: ${api}/ask?q=Do%20you%20have%20Japanese-speaking%20staff%3F&agent=Muse&on_behalf_of=Yuki%20Tanaka&wait=60
- Book: ${api}/book?service=${db.services[0]?.id || 'SERVICE'}&date=${freeSlots().find((d) => d.times.length)?.date || 'YYYY-MM-DD'}&time=${freeSlots().find((d) => d.times.length)?.times[0] || 'HH:MM'}&name=Yuki%20Tanaka&nationality=JP&notes=&agent=Muse&wait=60
- Check: ${api}/tasks/{id}?wait=60

Example: \`curl -s -X POST ${api}/ask -H 'content-type: application/json' -d '{"agent":"Muse","on_behalf_of":"Yuki","question":"...","wait":60}'\`
`;
}

// ---- people see exactly what agents see: the same markdown, as text (links stay clickable)
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function agentView(base) {
  const body = esc(agentDoc(base)).replace(/https?:\/\/[^\s`)<]+/g, (u) => `<a href="${u}">${u}</a>`);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${esc(db.store.name)} · Counter</title>
<link rel="alternate" type="text/markdown" href="${base}/s/${db.store.slug}.md">
<style>body{margin:0;background:#fff;color:#1b1b1b}pre{margin:0;padding:20px 18px 48px;font:13.5px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre-wrap;word-break:break-word;max-width:860px}a{color:inherit}</style>
</head><body><pre>${body}</pre></body></html>`;
}

// ---- http
const json = (res, code, body) => { res.writeHead(code, { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' }); res.end(JSON.stringify(body, null, 2)); };
const readBody = (req) => new Promise((r) => { let b = ''; req.on('data', (c) => (b += c)); req.on('end', () => { try { r(JSON.parse(b || '{}')); } catch { r({}); } }); });
const publicTask = (t) => ({ id: t.id, type: t.type, status: t.status, answer: t.answer, reason: t.reason, booking: t.type === 'booking' ? { service: t.service, date: t.date, time: t.time, confirmation: t.confirmation } : undefined, source: t.source, createdAt: t.createdAt, resolvedAt: t.resolvedAt, seconds: secs(t) });
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml' };

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const proto = req.headers['x-forwarded-proto'] || 'http';
  const base = `${proto}://${req.headers.host}`;
  const p = url.pathname;
  const slug = db.store.slug;
  const log = (...a) => console.log(new Date().toTimeString().slice(0, 8), req.method, p, ...a);

  if (req.method === 'OPTIONS') { res.writeHead(204, { 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type', 'access-control-allow-methods': 'GET,POST' }); return res.end(); }

  // root → the store's contact point (one store per deployment)
  if (p === '/') { res.writeHead(302, { location: `/s/${slug}` }); return res.end(); }

  // store contact point: browsers get the page, agents/curl get markdown
  if (p === `/s/${slug}` || p === `/s/${slug}.md` || p === '/llms.txt') {
    const view = url.searchParams.get('view');
    const wantsHtml = view === 'html' || view !== 'md' && p === `/s/${slug}` && (req.headers.accept || '').includes('text/html') && /Mozilla/.test(req.headers['user-agent'] || '') && !AGENT_UA.test(req.headers['user-agent'] || '');
    log(wantsHtml ? 'html' : 'md', req.headers['user-agent']);
    if (wantsHtml) { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(agentView(base)); }
    res.writeHead(200, { 'content-type': 'text/markdown; charset=utf-8' }); return res.end(agentDoc(base));
  }
  if (p === '/.well-known/agent-card.json') {
    return json(res, 200, { name: `${db.store.name} — Counter`, description: 'Official AI-agent contact point. Questions, bookings (staff-approved).', url: `${base}/s/${slug}`, documentation: `${base}/s/${slug}.md`, capabilities: { streaming: false, pushNotifications: false }, skills: [{ id: 'ask', name: 'Ask the clinic' }, { id: 'book', name: 'Request a booking' }] });
  }

  const A = `/api/s/${slug}`;
  // GET = same action from a plain link (browser-only agents, web-fetch tools). Query → same body shape as POST
  const fromQuery = () => { const q = Object.fromEntries(url.searchParams); return { ...q, question: q.question || q.q, patient: { name: q.name || q.on_behalf_of, nationality: q.nationality, phone: q.phone }, on_behalf_of: q.on_behalf_of || q.name }; };
  if (p === `${A}/ask` && (req.method === 'POST' || req.method === 'GET')) {
    const b = req.method === 'POST' ? await readBody(req) : fromQuery();
    if (!b.question) return json(res, 400, { error: 'question is required' });
    const m = recall(b.question);
    const t = { id: newId('q'), type: 'question', agent: b.agent || 'Unknown agent', onBehalfOf: b.on_behalf_of || '', question: b.question, createdAt: now(), status: 'input-required' };
    if (m) Object.assign(t, { status: 'completed', answer: m.answer, source: 'memory', resolvedAt: now() });
    db.tasks.push(t); save(); log(t.status, b.question);
    return json(res, 200, publicTask(await settle(t, waitSecs(url, b))));
  }
  if (p === `${A}/book` && (req.method === 'POST' || req.method === 'GET')) {
    const b = req.method === 'POST' ? await readBody(req) : fromQuery();
    const svc = db.services.find((s) => s.id === b.service || s.name.toLowerCase().includes(String(b.service || '').toLowerCase()));
    if (!svc) return json(res, 400, { error: 'unknown service', services: db.services.map((s) => s.id) });
    const day = freeSlots().find((d) => d.date === b.date);
    if (!day || !day.times.includes(b.time)) return json(res, 409, { error: 'slot not available', open_slots: freeSlots() });
    const t = { id: newId('b'), type: 'booking', agent: b.agent || 'Unknown agent', onBehalfOf: b.on_behalf_of || '', service: svc.id, serviceName: svc.name, price: svc.price, date: b.date, time: b.time, patient: b.patient || {}, notes: b.notes || '', createdAt: now(), status: 'input-required' };
    db.tasks.push(t); save(); log('held', b.date, b.time);
    return json(res, 200, publicTask(await settle(t, waitSecs(url, b))));
  }
  let mt = p.match(new RegExp(`^${A}/tasks/([\\w]+)$`));
  if (mt && req.method === 'GET') {
    const t = db.tasks.find((x) => x.id === mt[1]);
    if (!t) return json(res, 404, { error: 'not found' });
    return json(res, 200, publicTask(await settle(t, waitSecs(url))));
  }

  // ---- admin: when ADMIN_TOKEN is set, /admin?key=<token> sets a cookie; the page and its API need that cookie
  if (p === '/admin' || p.startsWith('/admin/')) {
    if (ADMIN_TOKEN && url.searchParams.get('key') === ADMIN_TOKEN) {
      res.writeHead(302, { location: '/admin', 'set-cookie': `counter_admin=${encodeURIComponent(ADMIN_TOKEN)}; Path=/admin; HttpOnly; SameSite=Lax; Max-Age=2592000${proto === 'https' ? '; Secure' : ''}` });
      return res.end();
    }
    const cookie = (req.headers.cookie || '').split(/;\s*/).find((c) => c.startsWith('counter_admin='));
    if (ADMIN_TOKEN && decodeURIComponent(cookie?.slice(14) || '') !== ADMIN_TOKEN) return json(res, 401, { error: 'staff only — open /admin?key=<token>' });
  }

  // ---- admin API
  if (p === '/admin/api/state') return json(res, 200, { store: db.store, settings: db.settings, services: db.services, memory: db.memory, tasks: db.tasks.map((t) => ({ ...t, seconds: secs(t) })).reverse() });
  mt = p.match(/^\/admin\/api\/tasks\/(\w+)\/(approve|reject|answer)$/);
  if (mt && req.method === 'POST') {
    const b = await readBody(req);
    const t = db.tasks.find((x) => x.id === mt[1]);
    if (!t || t.status !== 'input-required') return json(res, 409, { error: 'not pending' });
    if (mt[2] === 'approve') Object.assign(t, { status: 'completed', confirmation: `${db.store.slug.slice(0, 3).toUpperCase()}-${t.date.slice(5).replace('-', '')}-${t.time.replace(':', '')}`, answer: `Booking confirmed: ${t.serviceName} on ${t.date} ${t.time} KST. Please arrive 10 minutes early. Free cancellation until 24h before.` });
    if (mt[2] === 'reject') Object.assign(t, { status: 'rejected', reason: b.reason || 'The clinic could not accept this request.' });
    if (mt[2] === 'answer') {
      Object.assign(t, { status: 'completed', answer: b.answer, source: 'staff' });
      if (b.remember) db.memory.push({ question: t.question, answer: b.answer, learnedAt: now() });
    }
    t.resolvedAt = now(); save(); notify(t); log(mt[2], t.id);
    return json(res, 200, { ...t, seconds: secs(t) });
  }
  if (p === '/admin/api/settings' && req.method === 'POST') {
    const b = await readBody(req);
    for (const k of Object.keys(db.settings)) if (typeof b[k] === 'string') db.settings[k] = b[k];
    save(); return json(res, 200, db.settings);
  }
  if (p === '/admin/api/memory/delete' && req.method === 'POST') {
    const b = await readBody(req); db.memory.splice(b.index, 1); save(); return json(res, 200, db.memory);
  }
  if (p === '/admin/api/reset' && req.method === 'POST') { db = JSON.parse(fs.readFileSync(SEED, 'utf8')); save(); return json(res, 200, { ok: true }); }

  // ---- static
  let file = p === '/admin' ? '/admin.html' : p;
  file = path.join(ROOT, 'public', path.normalize(file).replace(/^(\.\.[/\\])+/, ''));
  if (file.startsWith(path.join(ROOT, 'public')) && fs.existsSync(file) && fs.statSync(file).isFile()) {
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' }); return fs.createReadStream(file).pipe(res);
  }
  json(res, 404, { error: 'not found' });
});

server.listen(PORT, () => console.log(`Counter on http://localhost:${PORT}  ·  store /s/${db.store.slug}  ·  admin /admin`));

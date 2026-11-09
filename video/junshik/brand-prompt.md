# Counter 정체성·로고 생성 프롬프트

- 만든 때: 2026-11-09 13:20경 (황준식 요청 + Claude). 다른 모델(GPT·Gemini·Midjourney·이미지 모델 등)에 붙여 넣어 돌려 보는 용도
- 근거: 회의록(상시녹음 2 «메시지·슬로건 후보»), `docs/use-cases.md`, 시나리오 v4.1, 조순형 안 로고 후보(`video/soonhyung/logo/candidates.jpg`)
- **A** = 정체성 + 로고 콘셉트를 글로 받는 LLM용 · **B** = 이미지 모델에 바로 넣는 로고 그림용

---

## A. 정체성 + 로고 콘셉트 (LLM용 — 그대로 복사)

```
You are a senior brand strategist and identity designer. Build the brand identity and logo concepts for a startup product called "Counter".

## What Counter is
- Counter is an agent-native front desk for small local businesses (clinics, restaurants, salons, guesthouses, factories, repair shops).
- Every shop gets one Counter. AI agents (personal agents like Muse, Pickle, Dots, Grok Bot that act for consumers) contact the shop through Counter instead of calling the shop's phone.
- Counter answers from the shop's verified facts instantly, holds bookings for staff approval, and asks the owner only when it truly doesn't know — once. The owner's answer is remembered for every future agent.
- Flow: Person → personal agent → Counter → (only if needed) owner. Most requests end at Counter.

## The problem it solves
- A billion people are getting personal AI agents. Those agents all call the same small shops by phone — nonstop, all at once (one AI agent called 848 local businesses in a few hours — SF Standard, Oct 2026).
- Owners can't tell a bot from a customer, so they hang up. Agents get blocked. People get nothing. Everyone loses.

## Positioning & promise
- Core line: "Phones are for people. Counter is for agents."
- Ambition: "While tech companies race to spread agents, we build their front door." — the channel every agent uses to reach a business.
- Win-win-win: shops focus on their craft (no phone slop), agents are welcomed instead of hung up on (more useful), people get what they asked for. Agent companies, shops and Counter all win.
- Not a chatbot or chat UI. Not a booking platform. It is the calm front desk standing between a flood of agents and a busy owner.

## Personality
Calm, reliable, welcoming, quietly competent — a great front-desk person. Friendly to small-business owners (not "enterprise AI"), modern and global (any agent, any language). Avoid: sci-fi robots, glowing neural nets, chat bubbles as the main idea, anything that looks like a phone app or call center.

## Existing visual cues (keep consistent)
- Primary color: warm orange #FF6B3D. Ink #141414. Background cream #F6F5F0. Accent green #1FA463 for "done/approved".
- Typeface in use: Pretendard (bold, rounded-geometric sans).
- A current team candidate: a "C" monogram whose lower stroke extends into a flat counter top (the letter C becoming a front desk), with a small dot like an eye/bell. Another: a solid front-desk silhouette with a speech bubble above it.
- Icon style: solid single-color shapes, rounded corners, thick strokes, white knock-out details.

## What I want from you
1. Brand essence: one-sentence mission, one-sentence vision, 3 brand values, 3 personality traits with "is / is not".
2. Name meaning: how "Counter" works (front counter of a shop + counterpart for agents) and a one-line explanation for investors.
3. Taglines: 8 options under 7 words each (English), plus the best 2 with why. Include at least one that expresses the win-win-win idea.
4. Logo concepts: 6 distinct concepts. For each: name, the core idea (one sentence), how it reads at 16px app-icon size, symbol description precise enough for a designer to draw (shapes, proportions, negative space), wordmark pairing, and risks (looks like an existing brand? too generic?). Must include:
   - one evolving the "C → counter top" monogram,
   - one built on a "front door / gate" metaphor,
   - one expressing "many agents → one calm point",
   - one purely typographic wordmark.
5. Recommendation: pick one concept, explain why it fits the story above, and give a simple construction grid (circle/rect sizes in a 512×512 box).
6. Image prompts: for your top 3 concepts, write one ready-to-paste prompt each for an image model (flat vector logo, orange #FF6B3D on cream #F6F5F0, centered, no text unless wordmark, no gradients, no mockup).

Constraints: no trademarks or logos of other companies (no Meta/OpenAI/xAI/Pickle marks), no robot faces, no headset/call-center imagery, no chat bubble as the only idea. Keep everything usable in a 90-second product video and as an app icon.
```

---

## B. 로고 그림 (이미지 모델용 — 하나씩 돌려 보기)

**B-1 · C 모노그램 → 카운터 상판** (조순형 안 #4 발전형)
```
Minimal flat vector logo mark for a startup called "Counter": a bold rounded letter "C" whose bottom stroke extends horizontally into a flat front-desk counter top, small round dot inside the C like a service bell, single solid warm orange #FF6B3D on a plain cream #F6F5F0 background, thick even stroke weight, rounded terminals, generous negative space, centered, geometric, app-icon ready, no text, no gradient, no shadow, no 3D, no mockup
```

**B-2 · 가게 앞문**
```
Minimal flat vector logo mark: a simple rounded arched doorway formed by the negative space inside a bold letter "C", a small welcoming step at the base, single solid orange #FF6B3D on cream #F6F5F0, rounded geometric shapes, friendly and calm, centered, icon-ready at small sizes, no text, no gradient, no shadow, no mockup
```

**B-3 · 많은 에이전트 → 한 점**
```
Minimal flat vector logo mark: many small dots arriving from the left and converging into one solid rounded front-desk shape, the dots shrinking and aligning in a calm curve, single color orange #FF6B3D on cream #F6F5F0, clean geometric, balanced, centered, works as an app icon, no text, no gradient, no shadow, no robots, no mockup
```

**B-4 · 워드마크**
```
Wordmark logo "Counter" in a bold rounded geometric sans-serif, lowercase or title case, ink #141414 on cream #F6F5F0, the letter "C" in warm orange #FF6B3D with its lower stroke slightly extended like a counter top, tight but readable spacing, clean flat vector, centered, no icon, no gradient, no shadow, no mockup
```

**B-5 · 앱 아이콘**
```
App icon for "Counter": rounded-square tile filled with warm orange #FF6B3D, a white simplified front-desk counter shape with a small round bell on top, flat vector, bold and readable at 32px, centered, no text, no gradient, no shadow, no mockup
```

### 돌려 볼 때
- 이미지 모델은 같은 프롬프트로 4장 이상 뽑아 고른다. 색이 틀어지면 끝에 `exact hex colors only` 를 덧붙인다
- 다른 회사 로고와 닮았는지 검색(이미지 역검색)으로 한 번 확인하고 쓴다
- 고른 것은 팀 싱크에서 정한 뒤 `video/common/` 으로 올린다(공용 폴더 규칙)

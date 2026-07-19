# Design system

Soft-UI (neumorphic) surfaces on a neutral ground, one accent, flat controls.
Implemented in `src/app/globals.css`, which is the source of truth; this
document explains the intent so you need not reverse-engineer it.

**Use the tokens, never raw values.** If you are about to write `text-sm`,
`bg-muted`, `rounded-xl`, `shadow-md` or a hex code, there is almost certainly
a token for it. The codebase idiom is
`text-[length:var(--text-body-sm)] text-[var(--text-muted)]`.

If something you need has no counterpart here, flag it and leave it alone
rather than inventing a pattern.

---

## 1. Hard constraints

These are not preferences. Breaking one is a bug.

1. **WCAG AA floor.** Body text at least 4.5:1 against its actual composited
   background. Non-text boundaries (control borders, focus rings) at least
   3:1. Measure against the real background, not the one you assume.
2. **No shadow-only boundaries.** Shadows are decorative. Every text pair and
   every interactive boundary clears AA through colour or a real border.
   Delete every shadow and the interface must still be legible and usable.
   This is the single rule that keeps neumorphism from failing an audit.
3. **One accent.** `--accent` is reserved for links, focus and primary
   actions. Do not add a second hue to signal categories, states or sectors.
   Use text and icons for those.
4. **Never colour alone.** Anything a colour communicates must also be carried
   by text or an icon (WCAG 1.4.1).
5. **No em dashes in user-facing copy.** Use a colon for label pairs and
   appositions, a full stop for two sentences, parentheses for asides, or a
   middle dot (`·`) as a separator. Code comments are exempt. An en dash
   (`–`) is correct in date ranges. Verify against the built HTML, checking
   the raw character and `&mdash;` / `&#8212;` / `&#x2014;`.
6. **Cards never move on hover.** No translate, no scale, no lift. A 1px shift
   on a card grid is a jitter source: the pointer sits near an edge, the lift
   pulls the boundary out from under it, the card un-hovers, drops back,
   re-hovers. Hover is border and shadow only.
7. **Only real affordances get interactive styling.** If it is not a link, a
   button, or focusable, it does not get `.interactive`, a hover shadow or a
   hover border. Advertising a click target that does not exist is a bug.
8. **Prefer server components.** Reach for `"use client"` only when there is
   state, an effect, or a handler. A `useId` call is not a reason; use a
   module constant.

---

## 2. Colour tokens

Same token names in both themes. Write `var(--text-muted)`, never a hex.

### Light (`:root`)

| Token | Value | Notes |
|---|---|---|
| `--ground` | `#E0E5EC` | page background |
| `--surface` | `#E8ECF2` | cards, plates |
| `--raised` | `#EDF1F6` | floating: sheet, popover |
| `--text` | `#1A1D21` | 13.36 on ground, 14.26 on surface |
| `--text-muted` | `#565D66` | 5.26 ground, 5.62 surface |
| `--edge` | `#7A8189` | control boundary: 3.11 ground, 3.32 surface |
| `--edge-soft` | `#C8CFD8` | decorative hairline, no a11y role |
| `--accent` | `#1D4ED8` | 5.29 ground, 5.65 surface |
| `--accent-hover` | `#1E40AF` | |
| `--on-accent` | `#FFFFFF` | 6.70 on the accent fill |
| `--btn-bg` | `#1D4ED8` | white label 6.70 |
| `--btn-bg-hover` | `#1E40AF` | white label 8.72 |
| `--btn-fg` | `#FFFFFF` | |
| `--btn-ghost-hover` | `#D3D9E2` | label on it 11.91 |
| `--danger` | `#B91C1C` | |

### Dark (`.dark`)

| Token | Value | Notes |
|---|---|---|
| `--ground` | `#0A0A0B` | neutral near-black, zero colour cast |
| `--surface` | `#17171A` | |
| `--raised` | `#1E1E22` | |
| `--text` | `#E8E8EA` | 16.17 ground, 14.62 surface |
| `--text-muted` | `#9A9AA3` | 7.09 ground, 6.41 surface |
| `--edge` | `#6C6C72` | 3.79 ground, 3.43 surface, 3.18 raised |
| `--edge-soft` | `#2A2A30` | |
| `--accent` | `#3B82F6` | 5.38 ground, 4.86 surface |
| `--accent-hover` | `#60A5FA` | |
| `--on-accent` | `#0A0A0B` | 5.38 on the fill, beats white's 3.68 |
| `--btn-bg` | `#2563EB` | white label 5.17 |
| `--btn-bg-hover` | `#1D4ED8` | white label 6.70 |
| `--btn-ghost-hover` | `#1E1E22` | label on it 13.58 |
| `--danger` | `#F87171` | |

Syntax tokens (`--code-plain`, `--code-comment`, `--code-keyword`,
`--code-string`, `--code-fn`, `--code-number`) are each verified at 4.5:1 or
better on `--surface` in both themes.

### Two token pairs that look redundant and are not

**`--accent` vs `--btn-bg`.** `--accent` must stay light enough to pass as link
text on the ground; `--btn-bg` must be dark enough to carry a white label.
Those pull in opposite directions. `--btn-bg` is a fill, never used as text.

**`--edge` vs `--edge-soft`.** `--edge` is a control boundary sized for the 3:1
non-text threshold; `--edge-soft` is a decorative hairline with no a11y role.
**Never colour text with `--edge`.** It is 3.32:1 on surface and fails AA for
text. That exact bug shipped once.

### Verified contrast (measured in-browser, light / dark)

| Pair | Light | Dark |
|---|---|---|
| Body text on surface | 14.26 | 14.62 |
| Muted text on surface | 5.62 | 6.41 |
| Accent text on surface | 5.65 | 4.86 |
| Primary button label on fill | 6.70 | 5.17 |
| Ghost button label on surface | 14.26 | 14.62 |
| Ghost button border vs ground (needs 3.0) | 3.11 | 3.79 |

Tightest pair in the system is accent-on-surface in dark at 4.86.

---

## 3. Elevation and shadow

### Tone tokens

| Token | Light | Dark |
|---|---|---|
| `--shadow-dark` | `rgb(163 177 198 / 0.60)` | `rgb(0 0 0 / 0.70)` |
| `--shadow-light` | `rgb(255 255 255 / 0.90)` | `rgb(255 255 255 / 0.035)` |
| `--shadow-hover-dark` | `rgb(163 177 198 / 0.75)` | `rgb(0 0 0 / 0.85)` |

### Recipes (structure is theme-independent)

```css
--shadow-raised:    6px 6px 14px  var(--shadow-dark),
                   -6px -6px 14px var(--shadow-light);
--shadow-raised-lg: 10px 10px 24px  var(--shadow-dark),
                   -10px -10px 24px var(--shadow-light);
--shadow-inset:    inset  4px  4px 10px var(--shadow-dark),
                   inset -4px -4px 10px var(--shadow-light);
--shadow-chip:     inset 0 -1px 3px 0 var(--shadow-dark);
--shadow-hover:     6px 6px 18px  var(--shadow-hover-dark),
                   -6px -6px 14px var(--shadow-light);
```

### The layer-count rule

**Any shadow a transition interpolates toward must have the same number of
layers, in the same order, as the shadow it starts from, and each layer must
move monotonically toward its counterpart.**

`--shadow-hover` obeys this against `--shadow-raised`: two layers each, layer
1 keeps its hue and only grows alpha and blur, layer 2 is byte-for-byte the
resting light layer so it is constant and cannot interpolate through a
brighter value.

Break it and you get a white flash mid-hover. Both failure modes have shipped
here: a light hover going `[dark, white@.90]` to `[tint, tint]` sent the white
counter-highlight travelling to a mid tone, lighting up on the way; a dark
hover with three layers against the resting two could not pair up at all.

Hover is **border-led** because of the dark ground: on `#0A0A0B` a black
shadow has about ten levels of range (0.70 alpha composites to `rgb(3,3,3)`,
0.85 to `rgb(1,1,1)`), effectively invisible. `--edge-soft` to `--edge` is a
jump of roughly 66 levels and does the work the shadow cannot.

---

## 4. Typography

Faces: `--font-display` (Darker Grotesque), `--font-sans` (Instrument Sans),
`--font-mono` (Geist Mono).

The base layer already gives `h1` through `h4` the display face,
`font-weight: 800`, `letter-spacing: 0.002em` and `text-wrap: balance`.
**Set only the size token on a heading.** Do not add `font-bold` (it pulls 800
down to 700) or `tracking-tight` (it overrides the tuned letter-spacing).

| Token | Size |
|---|---|
| `--text-display-2xl` | `clamp(3.5rem, 2.6667rem + 3.7037vw, 6rem)` |
| `--text-display-xl` | `clamp(2.125rem, 1.6667rem + 2.0370vw, 3.5rem)` |
| `--text-display-lg` | `clamp(2rem, 1.6667rem + 1.4815vw, 3rem)`, 48px at 1440 |
| `--text-display-md` | `clamp(1.625rem, 1.5rem + 0.5556vw, 2rem)`, 32px at 1440 |
| `--text-display-sm` | `clamp(1.25rem, 1.2083rem + 0.1852vw, 1.375rem)` |
| `--text-display-xs` | `1.25rem` |
| `--text-display-2xs` | `1.125rem` |
| `--text-body-lead` | `clamp(1rem, 0.9583rem + 0.1852vw, 1.125rem)` |
| `--text-body-base` | `clamp(0.9375rem, 0.9167rem + 0.0926vw, 1rem)` |
| `--text-body-sm` | `0.875rem` |
| `--text-body-xs` | `0.75rem` |
| `--text-mono-inline` | `0.8125rem` |
| `--text-mono-block` | `0.875rem` |

---

## 5. Spacing, radii, containers

`--space-1` `0.25rem`, `-2` `0.5`, `-3` `0.75`, `-4` `1`, `-5` `1.25`,
`-6` `1.5`, `-7` `1.75`, `-8` `2`, `-10` `2.5`, `-12` `3`, `-16` `4`,
`-20` `5`, `-24` `6`, `-32` `8rem`.

`--radius-sm` `10px`, `--radius-1` `16px`, `--radius-lg` `20px`, `--radius-0` `0`.

`--container-wide` `1200px`, `--container-prose` `68ch`.

**Section rhythm.** Three layers, do not confuse them:

- `main` wrapper: `py-12 lg:py-16`, page padding.
- `Page` component: `[&>section]:mt-10 md:mt-12`, inter-section margin.
- Every section: `py-10 sm:py-12`, one shared value, no exceptions.
- Footer: `py-10`, independent.

---

## 6. Surfaces

| Class | Role |
|---|---|
| `.plate` | Raised card. `--surface`, `--edge-soft` border, `--radius-1`, `--shadow-raised`. |
| `.recessed` | Pressed-in well, box-sized: inputs, code blocks, embedded documents, image frames. `--radius-sm`, `--shadow-inset`. |
| `.chip` | Static label pill. `--radius-sm`, `--shadow-chip`. |
| `.coupon` | Hero plate. `max-inline-size: 40rem`, `--radius-lg`, `--shadow-raised-lg`. |
| `.withheld` | Footnote for redacted client data. Muted text, hairline edge, `color-mix(in srgb, var(--ground) 45%, var(--surface))` background. |
| `.control` | Modifier that swaps the border to `--edge`. Apply to form controls, which need the 3:1 boundary. |

`.plate`, `.recessed`, `.chip` and `.coupon` already set border and radius. Do
not add `border`, `rounded-xl` or `rounded-2xl` beside them.

**`.chip` vs `.recessed`.** Same family, deliberately different rule. The
`--shadow-inset` recipe is authored for input-sized boxes: a 4px offset with a
10px blur reaches past the midline of a 22px pill and reads as a gradient fill
rather than an edge. `.chip` gets a single hairline instead.

**`.chip` vs `.soft-btn`** is the question you will actually face. If it
toggles state it is a control and takes the button recipe, not `.chip`. A chip
is a static label with no pressed state; using one on something carrying
`aria-pressed` contradicts the control.

---

## 7. Interaction

### Timings

| Token | Value | Job |
|---|---|---|
| `--dur-hover-in` | `420ms` | arriving, unhurried |
| `--dur-hover-out` | `300ms` | leaving, quicker |
| `--dur-press` | `120ms` | press down |
| `--dur-press-out` | `180ms` | release |
| `--dur-focus` | `220ms` | focus ring |
| `--ease-out` | `cubic-bezier(0, 0, .2, 1)` | |
| `--ease-standard` | `cubic-bezier(.2, 0, 0, 1)` | |

Hover is asymmetric on purpose: arriving slower than leaving reads as
deliberate rather than twitchy. Press is the opposite, because a click is
instantaneous and any delay before the control moves reads as lag.

### The destination-state duration rule

**A CSS transition reads its duration from the state it is travelling to, not
the one it is leaving.**

So `:active` governs press-in, and press-out is governed by whatever the
element returns to, rest or `:hover`. To get asymmetric press timing, every
one of those blocks must restate the whole duration list. `.soft-btn` does
exactly this: base and `:hover` carry `--dur-press-out` in the transform slot,
`:active` carries `--dur-press`.

### Positional duration lists

Both recipes use longhand `transition-duration`, not the shorthand: one
shorthand value applies to every property in the list, which would drag the
focus ring along with the hover timing. Durations are positional so
`outline-color` stays pinned to `--dur-focus` in every state. Add a property,
add a duration in the same position.

`.interactive` lists 7: `background-color, border-color, color, box-shadow,
transform, filter, outline-color`. `.soft-btn` lists 5: `background-color,
border-color, color, transform, outline-color`, separate from `.interactive`.

### Focus

One focus treatment site-wide: a two-tone `outline`, never a shadow or glow.

```css
outline: 2px solid transparent;   /* exists at rest so it can animate */
outline-offset: 2px;              /* the offset gap is the second tone */
/* :focus-visible -> outline-color: var(--accent) */
```

`:focus-visible`, never `:focus`, so it does not fire on mouse press. The ring
lives at rest as transparent because a property that first appears inside the
focus block has no start value and would snap. No `border-radius` here:
`outline` already follows the element's own radius. `outline-color` rather
than a box-shadow ring is deliberate, because `box-shadow` already carries
elevation and hover and a ring there would share one duration with them.

### Cursor

Tailwind v4's Preflight dropped v3's `button { cursor: pointer }`. A base-layer
rule restores it for `button`, `[role="button"]` and `.soft-btn`; disabled
controls revert to `default`. Anchors get the hand natively.

---

## 8. Motion

`[data-enter]` is the only entrance mechanism. Do not hand-roll
IntersectionObserver reveals or `transition-[opacity,transform]` utilities.

```jsx
<div data-enter style={{ "--i": index }}>
```

`--i` drives the stagger: `--delay-enter` (120ms) plus `--i` times
`--delay-stagger` (60ms). Runs on mount.

**Reduced motion.** A global block sets `animation-duration`,
`animation-iteration-count` and `transition-duration` to `1ms !important`,
forces `scroll-behavior: auto`, and disables `[data-enter]` outright.

> Testing note: under `prefers-reduced-motion: reduce` every transition is
> clamped to 1ms, so a naive mid-transition sample sees no intermediate frames
> and any interpolation check passes vacuously. To verify interpolation you
> must defeat the clamp deliberately (a higher-specificity `!important`
> duration beats the universal selector), or scrub via `getAnimations()` or
> `Element.animate()`.

---

## 9. Component patterns

### Card

```jsx
<article className="plate interactive group relative flex flex-col overflow-hidden">
```

`.interactive` is load-bearing: `position: relative` and `z-index: 0` let the
hover `z-index: 1` bump work, so a raised card's shadow lands on top of its
neighbour rather than under it.

Hover is `border-color: var(--edge)` plus `--shadow-hover`, no transform.
Focus is `.plate.interactive:focus-within` at `--shadow-raised-lg`. The three
state rules sit at equal specificity in source order (`:focus-within`,
`:hover`, `:active`), so pointer states win over focus.

**Never express these states as Tailwind utilities on the element.** Tailwind
declares `@layer theme, base, components, utilities`, so any utility beats the
whole components layer on layer order alone, regardless of specificity. A
`focus-within:shadow-[...]` utility once silently inverted card hover.

### Button

```jsx
<a className="soft-btn soft-btn-primary inline-flex min-h-11 items-center gap-2 px-5
              text-[length:var(--text-body-sm)] font-medium">
```

Flat: fill and border only, no inset, no emboss. Variants are
`.soft-btn-primary` (filled `--btn-bg`, white label) and `.soft-btn-ghost`
(transparent, `--edge` border, `--text` label). Press is `scale(0.98)`. Hover
**darkens** the fill in both themes; lightening drops white to 3.72:1. Target
`min-h-11` (44px) standalone, `min-h-9` in dense filter rows.

The system has no disabled treatment. An opacity knock-back plus
`pointer-events-none` is the current fallback; flag it rather than promoting
it to a token. WCAG exempts disabled controls from contrast.

### Chip

```jsx
<span className="chip px-2 py-0.5 text-[length:var(--text-body-xs)]
                 font-medium tracking-[0.01em] text-[var(--text-muted)]">
```

Static labels only: tags, status, location. Never for anything with state.

### Withheld note

```jsx
<p className="withheld">
  <Lock className="size-3.5" aria-hidden />
  {project.withheld.reason}
</p>
```

A footnote, not a panel; the device works by being quiet. Render it from a
**server component**: the claim that confidential data never reaches the
browser is only true while nothing serialises it. Reason strings read
`"Withheld: ..."`, never with a dash.

---

## 10. Documented exceptions

Both are intentional. Do not "fix" them.

1. **The heading scale is not uniform across `h1`s.** The shared `Page`
   component renders page titles (`/projects`, `/about`, `/contact`) at
   `--text-display-md`; the project-detail page renders its title at
   `--text-display-lg`, one step up. The page-title step was chosen by
   measuring the previous rendered size (36px at 1440, nearest step 32px).
   A project title therefore outranks the page it sits under, which is a known
   open question rather than an oversight.

2. **macOS traffic-light dots keep literal colours.** In `BrowserFrame` on the
   project detail page the three dots are hard-coded `#ff5f57`, `#febc2e` and
   `#28c840`: a recognisable quotation of macOS chrome rather than themed UI,
   so they are exempt from the single-accent rule. `aria-hidden`, carrying no
   information.

---

## 11. Before you ship

- [ ] `npm run build` clean, TypeScript included.
- [ ] Contrast measured in the browser on every changed text and border pair,
      in both themes, against the real composited background. Sample after a
      forced style recalc: reading in the same tick as a theme swap compares
      old text against a new background and yields false failures.
- [ ] Screenshots at 1440 in both themes.
- [ ] Grep the built HTML for the em dash character, `&mdash;`, `&#8212;` and
      `&#x2014;`, expecting zero.
- [ ] No legacy utilities in touched files: `bg-primary`, `bg-muted`,
      `text-primary`, `text-muted-foreground`, `bg-gradient-*`,
      `shadow-sm/md/xl`, `rounded-xl/2xl` beside a surface class, shadcn
      `Button`, shadcn `Separator`.
- [ ] Nothing non-interactive carries `.interactive` or a hover state.
- [ ] Any new hover shadow obeys the layer-count rule.

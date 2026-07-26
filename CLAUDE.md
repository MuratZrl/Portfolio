# Portfolio

## Verification
Do not spawn agent workflows or adversarial audits unless explicitly asked. Verify inline with grep, computed styles, and screenshots.

## Writing style (user-facing copy)

Applies to every string a visitor reads: project summaries, card text, meta
descriptions, headings, labels, empty and error states. Code comments and
internal docs are exempt.

1. **No em dashes.** DESIGN.md hard constraint 5 owns this rule. Follow its
   substitutions: a colon for label pairs and appositions, a full stop for two
   sentences, parentheses for asides, a middle dot (`·`) as a separator.
2. **No "not just X, it's Y" constructions.**
3. **No rule-of-three rhythm.** A genuine list of features is fine. The tell is
   reaching for triads as a sentence beat, over and over.
4. **No formulaic essay shape in longer bodies** (setup, elaboration, tidy
   conclusion). End where the content ends.
5. **No empty amplifiers:** "feature-rich", "fully", "seamlessly", "robust",
   "powerful". Name the mechanism instead.
6. **No defensive or apologetic phrasing** about what the project lacks. If
   there is no demo, the absent button already says so.
7. **Vary sentence length.** Some short. Some longer where the content needs it.
8. **No arrow lists (`→`) or bolded lead-in bullets** in prose fields.

Rule 1 is checkable and should be checked: after a build, grep the built HTML
for the em dash character, `&mdash;`, `&#8212;` and `&#x2014;`, expecting zero.

# Sazzad Farm-to-Fridge Homepage Implementation Plan

> **For agentic workers:** This plan is being executed inline in the current workspace.

**Goal:** Build a responsive, animated, English-first/Bangla-ready Sazzad homepage prototype that helps Bangladesh households discover local farmers and fresh food.

**Architecture:** A no-build static site split into `index.html` for semantic content, `styles.css` for the responsive visual system, and `script.js` for all client-side state. Content arrays and pure interaction helpers stay centralized in `script.js` so the prototype can later migrate to component-based rendering.

**Tech Stack:** Vanilla HTML, CSS, and JavaScript; browser-native APIs only; Node’s built-in `node:test` for regression checks.

**Spec:** `.superdesign/design-system.md` plus the supplied Sazzad Farm-to-Fridge Bangladesh brief.

## Global Constraints

- English is the default language and Bangla is available without page reload.
- The page must load directly without a build step.
- Use replaceable remote stock assets with image and video fallbacks.
- Support reduced motion, visible focus, semantic headings, and useful alt text.
- Implement location, category, finder, newsletter, and navigation interactions locally only.

### Task 1: Test Contract

**Files:**
- Create: `test/home.test.mjs`

Define the expected homepage landmarks, public pure helper API, location validation, category filtering, finder completion, and newsletter validation. Run the test before implementing to record a meaningful failure.

### Task 2: Semantic Homepage

**Files:**
- Create: `index.html`

Build the complete homepage skeleton: skip link, header, hero/location form, category rail, seasonal products, farmer network, finder wizard, trust section, journey, testimonials, journal, newsletter, closing CTA, and footer. Use data attributes for dynamic labels and controls, with fallback alt text and status regions.

### Task 3: Visual System

**Files:**
- Create: `styles.css`

Implement the rice-paper/plum/mango/tomato/leaf palette, Bricolage Grotesque/DM Sans typography, editorial asymmetry, collage layers, card states, marquee, responsive layouts, focus rings, and `prefers-reduced-motion` overrides.

### Task 4: Behavior

**Files:**
- Create: `script.js`

Implement the public helpers `validateEmail(value)`, `filterProducts(category, products)`, `getFinderResult(answers)`, and `getLocationMessage(value)`. Wire language switching, mobile menu, smooth navigation, category filtering, location form, finder steps/results, newsletter validation, IntersectionObserver reveals, and count-up stats.

### Task 5: Verification

Run `node --test test/home.test.mjs`, `node --check script.js`, `git diff --check` when inside a git worktree, and a browser smoke test at desktop/tablet/mobile sizes. Confirm images and video failures do not remove content, and confirm reduced-motion and keyboard focus behavior.

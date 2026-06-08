# Landing — column-to-grid gradient reveal

## Goal

Replace the central column's flat `bg-base-100` with a single page-wide vertical
gradient: solid black at the bottom of the column stack, fading to transparent
toward the top. Where the gradient is transparent, the fixed background grid and
the travelling particle (`#grid-pulse`) bleed through — concentrating the reveal
around the hero.

## Current state

- `body` and each section's centered column both use opaque `bg-base-100`
  (`oklch(15% 0.008 285)`).
- A fixed full-page layer (`.bg-blueprint-page`, in `index.astro`) holds the
  faint gutter grid + the `#grid-pulse` particle, painting *behind* everything.
  Positioned columns (`relative`) paint above it, so the grid currently shows
  only in the left/right gutters.
- Three stacked sections inside `flex min-h-dvh flex-col`: **Hero → Apps →
  Libraries**, followed by `<Footer />`.
- The hero column carries its own denser, radial-masked grid overlay
  (`.bg-blueprint`, 50% opacity).

## Design

### One continuous gradient strip

The three columns are separate DOM elements, so a per-column gradient would
restart at each section (three repeating fades). Instead, use **one strip**
spanning the whole column stack:

1. Wrap the three `<section>`s in a `relative` flex container
   (`flex flex-1 flex-col`), preserving the Libraries section's `flex-1`
   stretch to the footer.
2. As the first child of that wrapper, add one absolutely-positioned strip:
   `mx-auto max-w-3xl`, `inset-y-0`, `aria-hidden`, `pointer-events-none`,
   matching the column width.
3. Strip background:
   ```css
   linear-gradient(
     to top,
     var(--color-base-100) 0%,
     var(--color-base-100) 55%,
     transparent 100%
   )
   ```
   Solid through the lower ~55%, fading over the top ~45% — lands the reveal
   across the hero and just into Apps. Stops are tunable after a visual check.
4. Remove `bg-base-100` from the three section columns so the strip becomes
   their background. Keep the `border-x` / `border-b` hairlines and `PlusMark`s.

### Stacking

The strip is positioned and earlier in the DOM than the section content:
- It paints **above** the fixed `.bg-blueprint-page` layer (positioned vs
  in-flow → positioned wins; both column siblings come after the fixed layer).
- The section text/content (in `<section>`s after the strip) paints **above**
  the strip (later DOM, same stacking context).

Net: grid + particle visible where the strip is transparent (top), hidden where
solid (bottom). Body black === gradient-bottom black, so the bottom is seamless.

### Hero grid overlay

Remove the hero's own `.bg-blueprint` overlay. Once the column is transparent up
top, it would overlap the revealed page grid (two grids at different opacities).
The revealed page grid + particle become the single, clean hero texture.

## Unaffected / preserved

- ProjectGrid section labels & count keep their `bg-base-100` patch (interrupts
  the divider line — still desirable).
- Project icon tiles (`bg-base-200`) and hover glow — unchanged.
- Footer keeps its own `bg-base-100`, outside the fade.
- Gutter grid + gutter particle behaviour — unchanged.

## Out of scope

The particle script keeps *vertical* pulses in the gutters and lets *horizontal*
pulses cross full width. So the revealed hero area shows horizontal sweeps but no
vertical center sweeps. Making verticals cross the now-visible center is a
possible follow-up, not part of this change.

## Verification

Build, then headless-screenshot the landing (per the project's visual-verify
recipe) to confirm: grid + particle visible across the hero, fading to solid
black down the page; labels/tiles/footer intact.

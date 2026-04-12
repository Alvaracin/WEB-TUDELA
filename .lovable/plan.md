

# Plan Update — Two Changes

## 1. Gravity Test → Global Page Effect

**What changes:** Instead of an isolated `GravityTest.tsx` section, the gravity interaction becomes a **global state** managed at the `Index.tsx` level. A floating trigger button (or the hero area itself) activates it.

**How it works:**
- `Index.tsx` holds `isFloating` state via `onPointerDown`/`onPointerUp` on a trigger element in the hero
- Pass `isFloating` as prop (or context) to every section component
- Each section applies CSS transforms with **different intensities and speeds**:
  - Navbar: `translateY(-2px)`, 200ms delay
  - Hero text: `translateY(-8px)`, 300ms delay
  - Grid texture: `translateY(-12px)`, 400ms delay (splits apart)
  - Buttons: `translateY(-3px)`, 150ms delay
  - Images: `translateY(-2px)`, 500ms delay (slower = parallax inversion)
  - Cards: `translateY(-5px)`, 250ms delay
- On release: `transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)` — slow, organic settle-back, not a snap
- Different elements get different `transition-delay` values for staggered return
- No dedicated section — the trigger lives in/near the hero, the effect is the whole page

## 2. Level System → Scroll-Driven Progression

**What changes:** Remove tab/click navigation. Levels reveal as the user scrolls through a tall sticky container.

**How it works:**
- Container is ~400vh tall (one viewport per level)
- Inner content is `position: sticky; top: 0` filling the viewport
- Use `IntersectionObserver` or scroll position to detect which "level zone" the user is in
- Active level transitions in with fade + subtle glitch effect
- Previous levels stack/fade behind
- Progress indicator on the side (vertical line or dots) showing Nivel 0–3
- Feels like climbing through levels, not clicking tabs
- Each level change triggers a subtle visual shift (accent color pulse, grid distortion)

## Everything else from the previous plan remains unchanged.


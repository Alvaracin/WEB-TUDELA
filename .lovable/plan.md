

# Fix Parallax Lag + Add Logo to Hero

## Problem
`ParallaxGrid` and `FloatingCircles` apply CSS `transition` to the entire `transform` property, including the scroll-driven parallax. This causes a sluggish, delayed response when scrolling. The transition should only apply during the gravity float interaction, not during normal scroll.

## Changes

### 1. ParallaxGrid.tsx — Remove scroll transition lag
- Remove the `transition-transform duration-[1s]` class and inline transition properties from the container
- Instead, only apply a CSS transition when `isFloating` changes (use a separate state or conditional class)
- Option: use `useRef` + `requestAnimationFrame` to directly set `transform` on the DOM element for scroll, bypassing React state entirely (smoothest approach)
- Keep the gravity float offset with its eased transition by applying it as a separate CSS property or toggling a transition class only when `isFloating` changes

### 2. FloatingCircles.tsx — Same fix
- Remove `transition-transform duration-700` from circle wrappers for scroll movement
- Only apply transition when `isFloating` state changes
- Same `useRef` + `requestAnimationFrame` approach for instant scroll response

### 3. HeroSection.tsx — Replace "ZER0 G" text with uploaded logo
- Copy `user-uploads://zeroglitch.gif` to `src/assets/zeroglitch.gif`
- Replace the `<h1>ZER0 G</h1>` text with an `<img>` tag importing the GIF
- Maintain the gravity floating class and sizing


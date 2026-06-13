# SESSION 3: Trapdoor Cards & Inverse Kinematics
**Persona**: Physics & Motion Engineer
**Goal**: Scene 3 (Swipe to fly) and Scene 4 (Heavy Box & Cat Eyes).

**Execution Steps**:
1. Map Scene 3 cards using MascotNova's `DOMtoPhysicsMapper`. Listen for fast swipe (`touchstart` to `touchend` delta). On swipe, set `body.isStatic = false`, apply huge horizontal force.
2. In the gap (Scene 4 Floor), create `src/ui/Understage.ts`. Render SVG Cat Eyes behind the DOM.
3. *Inverse Kinematics*: Write an event listener on `mousemove`/`touchmove` using `Math.atan2(dy, dx)` to rotate the eyes' pupils. DO NOT use Matter.js for this.
4. Render the Heavy Box. Give it mass=500, friction=0.9. On collision event with the wall (Thud), trigger `opacity: 0` on the eyes for 0.5s (blink).

**QA & Output**: 
Ensure performance via `PerformanceObserver`. Update `SESSION_LOG.md`.

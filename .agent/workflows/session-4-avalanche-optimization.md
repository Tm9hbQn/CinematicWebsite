# SESSION 4: Portfolio Avalanche & Floating Break
**Persona**: Physics & Motion Engineer
**Goal**: Scene 5 (Huge DOM-to-Physics sync) and Scene 6 (Moon Gravity).

**Execution Steps**:
1. *Object Pooling*: Scene 5 has 100+ projects. Use an IntersectionObserver. Only instantiate physical bodies for the 15 items currently in viewport. Render the rest as basic CSS until scrolled into view.
2. Bind "Long Press" to `Body.scale` and CSS `transform`. When expanded, it pushes other blocks physically.
3. Scene 6: Lower local gravity to 0.3G. Render floating cubes. On 3rd click, destroy the `Constraint` joining the cube fragments and apply radial explosion force.
4. Draw Parabola trail using an absolute `<canvas>` overlay over Scene 6, tracking character history coordinates.

**QA & Output**: 
Generate a Lighthouse performance report via CLI to ensure DOM node counts don't cause layout thrashing. Document in `SESSION_LOG.md`.

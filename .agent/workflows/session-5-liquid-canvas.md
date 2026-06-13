# SESSION 5: The Zero-G Liquid Canvas
**Persona**: UI Architect & Physics Engineer
**Goal**: Build the 2,500 particle fluid simulation without breaking the device.

**Execution Steps**:
1. **CRITICAL RED-LINE**: Do NOT feed 2,500 particles to Matter.js. It will crash.
2. Create `src/render/LiquidCanvas.ts`. Instantiate an HTML5 Canvas.
3. Create a TypedArray (`Float32Array`) for X, Y, VX, VY of 2,500 points.
4. Create a pure JS `requestAnimationFrame` loop. Apply a central attractor force.
5. Apply a repulsion field based on mouse/touch coordinates. Use `filter: blur(8px) contrast(20)` on the canvas for the Metaball/Mercury effect.
6. Track cursor movement distance. Over 5000px total movement, trigger "IMPACT" formation: Lerp all points to a pre-calculated Text Path.
7. Once solidified, generate a single Matter.js Box around "IMPACT" to resume character interaction.

**QA & Output**: 
Generate `walkthrough.md`. Tell the user: "Swirl your mouse/finger heavily in Scene 7. Verify the liquid solidifies into letters, maintaining 60fps."

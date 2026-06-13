# SESSION 6: Pinball Contact Form
**Persona**: Sensor Integrator & UI Architect
**Goal**: Build the final interactive contact form, overcoming Mobile Viewport limitations.

**Execution Steps**:
1. Create a transparent text input to force the native keyboard open.
2. Every `keydown` event pushes a new `Body` into the physics world at the top of the container. 
3. *Viewport Fixing*: Listen to `window.visualViewport.addEventListener('resize')`. When the keyboard opens, calculate the new bottom boundary dynamically and move the Matter.js static floor UP so falling letters land exactly on top of the keyboard.
4. On "Submit", apply immense negative Y force to all letters (Vacuum), then fade out.

**QA & Output**: 
User must test on an actual mobile device to ensure the Virtual Keyboard does not obscure the letters.

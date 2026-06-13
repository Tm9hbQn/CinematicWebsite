# SESSION 2: Hero Hook & Floating Navigation
**Persona**: UI Architect & Sensor Integrator
**Goal**: Build Scene 1 (2G Drop) and Scene 2 (Gyroscope Menu).

**Execution Steps**:
1. Build `src/ui/HeroSection.ts`. Create the "Torn screen" SVG. 
2. Hook the Title string to a Matter.js Constraint with high stiffness/damping.
3. *Vibration Fallback*: In `src/sensors/Impact.ts`, try `navigator.vibrate(100)`. Catch lack of support (iOS) and fallback to adding `.screen-shake` CSS class to `document.body`.
4. Build Scene 2 floating menu using `ChainConstraint`.
5. *Gyroscope Consent*: The user MUST interact to grant iOS 13 gyro access. Add a glowing "Touch to Start" button in Scene 1. Bind `DeviceOrientationEvent.requestPermission()` to this click. Once granted, link gyro gamma/beta to the menu's X/Y vectors.

**QA & Output**: 
Generate `walkthrough.md`. Write in BOLD: "Run `npm run dev`. Open on a mobile device. Tap the start button. Tilt your phone to see the menu swing. Verify Android vibrates and iOS shakes visually." Push to Git.

# SESSION 1: Engine Initialization & Gravity Mapping
**Persona**: Physics & Motion Engineer
**Goal**: Bootstrap the MascotNova engine into the project and establish dynamic gravity.

**Execution Steps**:
1. Run `npm i` for basic deps.
2. In `src/physics/PhysicsManager.ts`, instantiate `@mascotnova/core/Engine`.
3. Disable global gravity (`engine.world.gravity.scale = 0`).
4. Build `GravityMap.ts`: Create a `beforeUpdate` event loop. Iterate all bodies. If body is in Y:0 to Y:1000 (Scene 1-3), apply vector for 2G. If Y:4000 to 5000 (Scene 6), apply 0.3G and raise `frictionAir`.
5. Implement Anti-Tunneling: Create a system checking `body.position.y` delta. If it exceeds threshold across thick static boundaries, reverse velocity and snap back.

**QA & Output**: 
Run automated bounds test. Update `architecture-state.md` with "Physics Manager Online". Push to Git.

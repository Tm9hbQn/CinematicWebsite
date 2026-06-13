# SESSION 7: Final Touchbase, QA & Audit
**Persona**: QA Validator
**Goal**: Verify all systems, state continuity, and performance before production build.

**Execution Steps**:
1. Verify no files in `@mascotnova/core` or `@mascotnova/mcp-server` were touched.
2. Inspect `package.json` and `tsconfig.json` for strict compliance.
3. Audit the transition boundaries: Does the character get "stuck" between Scene 4 (1G) and Scene 5 (Moon Gravity)? If yes, implement a rescue timeout that teleports the character if out of bounds for > 3s.
4. Run standard build (`npm run build`). Check chunk sizes (<300KB excluding MascotNova engine).
5. Compile the final `walkthrough.md` for the agency director.
6. Commit all, push to master, and exit.

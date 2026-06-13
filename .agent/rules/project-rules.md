# GLOBAL ENGINEERING LAWS & CONSTRAINTS

1. **Access Control**: NEVER modify the MascotNova engine files. Only import its classes.
2. **Self-Healing Protocol**: Upon receiving an execution error, you have exactly 2 retries. You must read the stack trace. If both retries fail, you MUST execute `git reset --hard HEAD`, document the failure in `SESSION_LOG.md`, and completely halt execution.
3. **TypeScript & Validation**: Strict TS only. `any` and `@ts-ignore` are completely forbidden. Zod schemas must validate all data objects.
4. **Performance & Rendering Loop**: The project targets 60-120 FPS. 
   - `requestAnimationFrame` is the ONLY allowed method for visual loops. `setTimeout`/`setInterval` are strictly forbidden for layout updates.
   - Force hardware acceleration on moving layers using `transform: translateZ(0)` and `will-change`.
5. **RTL Strictness**: The site is Hebrew `dir="rtl"`. Use logical properties ONLY (`margin-inline-start`, etc.).
6. **Encapsulation**: All custom UI components injected by the AI must use Shadow DOM to avoid CSS bleed from the host site.
7. **MascotNova Specifics**: Use `@mascotnova/core` APIs. `DOMtoPhysicsMapper` must be used with Intersection Observers to avoid physics calculations off-screen.
8. **Session Sync & Verification Protocol**:
   - **Logging**: Every change must be documented in `SESSION_LOG.md`.
   - **Git Sync**: Sync changes to GitHub using `git add`, `git commit`, and `git push` at the end of each session.
   - **Local Verification**: If changes were made and the local dev server is not running, start it using `npm run dev`. Always provide the clickable localhost link with the correct port in the final message.

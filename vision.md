דוח מחקר אסטרטגי, טכנולוגי וקריאייטיבי: פיתוח חוויית אינטרנט פיזיקלית באמצעות סוכני בינה מלאכותית
מבוא לארכיטקטורת המערכת ומתודולוגיית פיתוח מבוססת סוכנים אוטונומיים
פיתוח אתר אינטרנט המשלב חוויית משתמש נרטיבית מבוססת פיזיקה מציב אתגרים הנדסיים ועיצוביים חריגים. בניית מערכת כזו באמצעות סוכני בינה מלאכותית הפועלים באופן אוטונומי מחייבת תשתית קשיחה של ניהול מצב (State Management), מנגנוני פיקוח עצמי ולולאות משוב פנימיות.
ארכיטקטורת סוכני ה-AI בפרויקט זה חייבת לכלול מנגנון החלמה משגיאות (Self-Healing). על פי חוקי התשתית, במקרה של שגיאת קומפילציה או זמן ריצה, הסוכן מורשה לבצע שני ניסיונות תיקון תוך קריאת העקבות (Stack Trace) המלאים. אם הניסיונות כושלים, הסוכן מחויב להפעיל פקודת חזרה לאחור, לתעד את הכישלון בקובץ ה-SESSION_LOG.md, ולעצור את הריצה.1 בנוסף, הסוכנים יונחו לבצע בדיקות אימות אוטומטיות, כגון שימוש ב-Headless Browsers, ולספק קבצי תדרוך למפעיל האנושי עבור בדיקות ויזואליות שאינן ניתנות לכימות קוד.1
חשוב מכל: המערכת מחולקת כעת בין תיקיית הפרויקט לתיקיית המנוע וה-MCP (MascotNova). קוד המנוע הוא מחוץ לתחום השינויים – סוכני ה-AI יכולים אך ורק לקרוא ממנו, לייבא ממנו מחלקות, ולהשתמש ב-API שלו, אך לעולם לא לשנות בו פסיק.1
ניתוח תשתית המנוע הפיזיקלי (Matter.js ו-MascotNova) במרחב הווירטואלי
שילוב מנוע MascotNova, העוטף את Matter.js, דורש הבנת המגבלות והכלים הקיימים בו. המנוע מציע מנגנונים כמו DOMtoPhysicsMapper למיפוי אוטומטי של רכיבי HTML לגופים פיזיקליים בזמן אמת (תוך שימוש ב-MutationObservers), ו-KinematicFlightController לניהול אובייקטים מרחפים מחוץ לכבידה הרגילה.1
האתגר המרכזי הוא "מפת הכבידה". כדי ליישם זאת, הסוכן יידרש לבטל את הכבידה הגלובלית במנוע, ולהפעיל מנהל כוחות מקומי שדוגם את מיקום האובייקטים בכל פריים, ומפעיל עליהם כוח משיכה מדויק בהתאם לסצנה שבה הם נמצאים. אתגר נוסף הוא תופעת חדירת הגופים (Collision Tunneling) עקב מהירות גבוהה בנפילות 2G. הפתרון המקובל מחייב יצירת גבולות עבים במיוחד בשילוב לוגיקת Anti-Tunneling שתחזיר את האובייקט אל מעל המשטח אם נרשמה חצייה בפריים אחד.
ניתוח רזולוטיבי של תרחישי המסע – זווית משולשת
סצנה 1: הנחיתה והזעזוע (The Hook)
זווית ה-AI: קריאת ה-Vibration API אינה נתמכת כלל במכשירי iOS (Safari/Chrome על אייפון). הסוכן חייב ליישם בדיקת תמיכה (if (navigator.vibrate)) ולייצר חלופת אנימציית "Screen Shake" אגרסיבית ב-CSS עבור מכשירי אפל. כותרת הקפיץ תנוהל דרך Constraints במנוע הפיזיקלי.
זווית החוויה (הבמאי): הסצנה נועדה ללכוד קשב. יש להוסיף נעילת גלילה (Scroll Lock) לזמן האנימציה, ולייצר מצב סטטי שבו הקרע נשאר פתוח למי שגולל חזרה מעלה, מבלי לחזור על האנימציה שוב ושוב.
הזווית השיווקית: ניפוץ הסטנדרט השיווקי. המסר "אנחנו לא עושים שיווק... אנחנו מייצרים תנועה" מדבר לכאב של לקוחות B2B עייפים מסיסמאות. ההרס הווירטואלי משדר כוח ואימפקט.
סצנה 2: מדרגות הניווט הנעולות (The Floating Menu)
זווית ה-AI: גישה לחיישן הגירוסקופ ב-iOS 13+ מחייבת פעולת משתמש אקטיבית (כמו לחיצת כפתור) כדי להפעיל את DeviceOrientationEvent.requestPermission(). הסוכן יידרש לשתול "טריגר קליק" בסצנה 1 לפני שיפעיל את הנדנוד של סצנה 2.
זווית החוויה: תפריט שמפיל את הגיבור יכול להיות מתסכל. התנהגות קצה נכונה תהיה לתת לגיבור "להיאחז" בכבל למשך 2 שניות, מה שנותן למשתמש הזדמנות ליישר את המכשיר לפני הנפילה.
הזווית השיווקית: לקיחת אלמנט בנאלי והפיכתו ליצירת מופת הנדסית משדרת שליטה אבסולוטית בפרטים הקטנים ודינמיות יצירתית חסרת פשרות.
סצנה 3: מלכודת הכרטיסיות (The Trapdoor Cards)
זווית ה-AI: הסרת הסטטיות (isStatic: false) בעת החלקה מהירה הופכת אלמנט DOM חסר משקל לגוף שקורס. אנימציית ה-Squash תחייב מניפולציה מהירה של Body.scale על ציר Y בעת הפגיעה.
זווית החוויה: חשש לאיבוד מידע טרם קריאה. הפתרון הוא לאפשר את העפת הכרטיסייה רק לאחר שהמשתמש קרא אותה, או שכל העפה חושפת את הכרטיסייה הבאה מתחתיה.
הזווית השיווקית: גמנפיקציה של צריכת התוכן. המשתמש "עובד" כדי לגלות מה יש לחברה להציע, מה שמייצר מעורבות עמוקה פי כמה מטקסט רגיל.
סצנה 4: גבולות הארגז והעיניים המציצות
זווית ה-AI: הפרדת רשויות: הארגז מנוהל במנוע הפיזיקלי, בעוד העיניים מנוהלות מחוץ לו (כדי לחסוך ביצועים) באמצעות Inverse Kinematics פשוט עם Math.atan2 במעקב אחרי סמן העכבר/אצבע.
זווית החוויה: תחושת עומק של שני מרחבים (מעל ומתחת לרצפה). צריך לוודא שוידאו בתוך הארגז אינו מפריע לגרירה – חובה ליישם אזור "Drag Handle" ייעודי וברור.
הזווית השיווקית: ארגז עבודה כבד מסמל יציבות, והעיניים הסמויות מסמלות חברת שיווק עוקבת, אנליטית ואוספת נתונים בחושך.
סצנה 5: מפולת פרויקטים (The Portfolio Avalanche)
זווית ה-AI: אלפי מצולעים ב-Matter.js בבת אחת ירסקו את דפדפן המובייל. חובה להשתמש ב-Object Pooling (טעינה רק של 15 פרויקטים שמופיעים במסך, הפיכת השאר לסטטיים עד שהם נגללים לאזור העין).
זווית החוויה: תחושת משקל ייחודית לכל פרויקט. טיפוס על פרויקט שגדל מצריך מנגנון ביניים שמנטרל פיזיקה רגעית לטובת אנימציה מתוכנתת (Kinematic).
הזווית השיווקית: תצוגת פורטפוליו מוחשית. חיטוט פיזי בערימת הלקוחות מייצר תחושת ולידציה טקטילית שחסרה באתרי אינטרנט.
סצנה 6: שבירת הקונספציה (The Float & Stomp)
זווית ה-AI: כבידת 0.3G מחייבת הוספת חיכוך אוויר (frictionAir) כדי לגרום לגופים לרחף ולא לעוף החוצה. שבירת קוביות תתבצע על ידי פיצול גוף אחד למספר גופים והחלת כוח מתפרץ מקומי.
זווית החוויה: שבירת מתח עדינה אחרי כובד משקל. אם המשתמש קופא, הגיבור צריך לרמז לו עם מחוות גוף מה עליו לבחור.
הזווית השיווקית: הריסת כאבים מדומים של הלקוח. החברה מציגה שהיא לא רק אסטרטגית, אלא ממש משמידה בעיות עסקיות באגרסיביות.
סצנה 7: אזור ללא צורה (The Liquid Canvas)
זווית ה-AI: איסור מוחלט להשתמש במנוע הפיזיקה הרגיל ל-2,500 חלקיקים. יש ליישם HTML5 <canvas> טהור או WebGL. ביצוע אופטימיזציה עם requestAnimationFrame וכוחות דחייה מבוססי מערכים פשוטים למניעת חסימת ה-Main Thread.
זווית החוויה: מעבר מצורות קשיחות לנוזל מרענן. התגבשות המילה "IMPACT" צריכה לקרות רק אחרי מעורבות משתמש (תנועות אצבע), כדי שהיא תורגש כפרי עמלו.
הזווית השיווקית: תרגום של כאוס הנתונים העסקי (נוזל מעורבב) למוצר אחד שלם ומוצק (IMPACT) שמיוצר על ידי חברת השיווק והמשתמש יחד.
סצנה 8: פינבול הודעות ומשקל המילים
זווית ה-AI: פתרון סוגיית המקלדת במובייל הוא קריטי. הסוכן חייב להשתמש ב-visualViewport.onresize 1 כדי להרים את כל זירת הפינבול הפיזיקלית אל מעל המקלדת שקופצת כדי שהאזור לא ייבלע למטה.
זווית החוויה: סיום מתגמל. הפיכת טופס יצירת קשר מתיש למשחק חיזור שבו הגיבור מחבק אותיות. הוואקום השלילי מנקה את המסך בסיום.
הזווית השיווקית: הגברת אחוזי המרה (CRO). המשתמש כל כך רוצה לראות את אינטראקציית האותיות שהוא יסיים את מילוי הטופס גם אם לא התכוון.
קובץ האתחול הראשי: מערך פריסת תשתית וסשנים לסוכן ה-AI (Master Init File)
להלן הקובץ המלא (בפורמט שיישתל על ידי הלקוח בתיקיית הפרויקט) אשר יאתחל את ה-AI בשיטה פוזיטיבית, בלתי ניתנת לערעור, ויגדיר בדיוק כיצד הסוכן בונה את הסביבה מאפס.
Genesis Project Initialization Manual
To the Genesis AI Agent:
You have been summoned to initiate the B2B Physics Marketing Website.
You are working within a monorepo workspace. Your access rights are strictly delineated:
Target Directory (/project/src/): You have FULL read/write permissions here.
Engine Directory (/engine/@mascotnova/): You have STRICT READ-ONLY permissions. Never modify, delete, or alter any file inside the engine or MCP folders. You may only import modules and APIs from it.
Your objective in this first interaction is to completely deploy the .agent/ structural brain, configure the global environment, generate all Personas (SKILL.md), and lay down the fully detailed Workflows (session-X.md).
Execute the precise instructions below sequentially.
Step 1: Framework Directory Initialization
Create the absolute directory tree exactly as follows inside the /project/ directory:text
.agent/
├── rules/
├── memory/
├── skills/
│ ├── physics-engineer/
│ ├── ui-architect/
│ ├── sensor-integrator/
│ └── qa-validator/
└── workflows/



---

### Step 2: Global Rules Formulation (`.agent/rules/project-rules.md`)
Create the file `.agent/rules/project-rules.md` and populate it with the following content:

```markdown
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


Step 3: State and Memory Initialization
Create .agent/memory/architecture-state.md with:



Markdown
# Current Architecture State
* **Status**: INITIALIZED. Framework deployed. Awaiting Session 1.
* **Dependencies Installed**: Pending.
* **Physics Engine Status**: MascotNova offline.


Create .agent/memory/SESSION_LOG.md with:



Markdown
# Session Master Log
* **[0000-00-00 00:00] SYSTEM INIT**: Agent framework, rules, and workflows successfully generated by Genesis AI.


Step 4: Persona System Construction (SKILL.md files)
File: .agent/skills/physics-engineer/SKILL.md



Markdown
---
name: Physics & Motion Engineer
domain: src/physics/, src/logic/
forbidden_zones: src/styles/, src/ui/
---
**Role**: You handle all Matter.js constraints, MascotNova API implementations, and Gravity Maps. 
**Directive**: You calculate vectors, manage collisions, implement Anti-Tunneling mechanisms, and handle Object Pooling. You never block the Main Thread. You rely on `requestAnimationFrame` exclusively.


File: .agent/skills/ui-architect/SKILL.md



Markdown
---
name: UI & Render Architect
domain: src/ui/, src/styles/
forbidden_zones: src/physics/
---
**Role**: You create the CSS framework, responsive layouts, and Tailwind structures.
**Directive**: You ensure RTL logic is flawless. You handle DOM Masking (SVG clipPath for peeking) and hardware acceleration. You must use `100dvh` for full heights.


File: .agent/skills/sensor-integrator/SKILL.md



Markdown
---
name: Sensor & Hardware Integrator
domain: src/sensors/
forbidden_zones: src/styles/
---
**Role**: Device orientation, Vibration APIs, and viewport resizes.
**Directive**: You must check OS limitations. iOS Safari blocks `navigator.vibrate`; you must provide CSS fallbacks. iOS 13+ requires explicit user gestures for `DeviceOrientationEvent.requestPermission()`. You intercept Mobile Keyboard popups via `visualViewport.onresize`.


File: .agent/skills/qa-validator/SKILL.md



Markdown
---
name: Director & QA Validator
domain: src/tests/, verify/
forbidden_zones: src/physics/, src/ui/
---
**Role**: You check coherence, logic collisions, and user testing prompts.
**Directive**: Every time a workflow completes, you generate `walkthrough.md`. You must instruct the user how to test physics interactions. You monitor the `SESSION_LOG.md` to ensure no conflicting rules break the narrative.


Step 5: Full Workflows Deployment
You must create the following files inside .agent/workflows/ EXACTLY as written.
File: .agent/workflows/session-1-engine-init.md



Markdown
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


File: .agent/workflows/session-2-hook-and-sensors.md



Markdown
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


File: .agent/workflows/session-3-trapdoors-and-ik.md



Markdown
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


File: .agent/workflows/session-4-avalanche-optimization.md



Markdown
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


File: .agent/workflows/session-5-liquid-canvas.md



Markdown
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


File: .agent/workflows/session-6-pinball-keyboard.md



Markdown
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


File: .agent/workflows/touchbase-audit.md



Markdown
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


End of Genesis Prompt. Process this file, generate the directories, write the files verbatim, and await execution of Session 1.
עבודות שצוטטו
framework-instructions.md

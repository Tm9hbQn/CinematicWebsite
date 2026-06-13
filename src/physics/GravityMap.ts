import Matter from 'matter-js';

export class GravityMap {
    private engine: Matter.Engine;

    constructor(engine: Matter.Engine) {
        this.engine = engine;
    }

    public start() {
        Matter.Events.on(this.engine, 'beforeUpdate', () => this.applyGravity());
    }

    private applyGravity() {
        const bodies = Matter.Composite.allBodies(this.engine.world);

        for (const body of bodies) {
            if (body.isStatic) continue;

            const y = body.position.y;
            let gravityScale = 0;
            let frictionAir = 0.01;

            if (y >= 0 && y <= 1000) {
                // Scenes 1-3: 2G
                gravityScale = 2;
            } else if (y >= 4000 && y <= 5000) {
                // Scene 6: 0.3G (Moon Gravity)
                gravityScale = 0.3;
                frictionAir = 0.05; // Raise friction air
            } else {
                // Default 1G for other scenes
                gravityScale = 1;
            }

            body.frictionAir = frictionAir;

            // Apply gravity force manually since global gravity is disabled
            // F = m * g
            // Matter.js default gravity is 0.001 * mass per tick.
            const baseGravity = 0.001;
            const forceY = body.mass * baseGravity * gravityScale;

            Matter.Body.applyForce(body, body.position, { x: 0, y: forceY });
        }
    }
}

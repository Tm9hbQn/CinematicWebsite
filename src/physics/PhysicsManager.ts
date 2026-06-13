import Matter from 'matter-js';
import { GravityMap } from './GravityMap';

export class PhysicsManager {
    public engine: Matter.Engine;
    public render: Matter.Render;
    public runner: Matter.Runner;
    public gravityMap: GravityMap;

    constructor(container: HTMLElement) {
        // Instantiate Matter.js engine
        this.engine = Matter.Engine.create();
        
        // Disable global gravity
        this.engine.gravity.scale = 0;

        // Setup renderer
        this.render = Matter.Render.create({
            element: container,
            engine: this.engine,
            options: {
                width: window.innerWidth,
                height: Math.max(window.innerHeight, 5000), // Large height for all scenes
                wireframes: false,
                background: 'transparent'
            }
        });

        this.runner = Matter.Runner.create();
        
        this.gravityMap = new GravityMap(this.engine);
    }

    public start() {
        Matter.Render.run(this.render);
        Matter.Runner.run(this.runner, this.engine);
        this.gravityMap.start();
        
        // Setup Anti-Tunneling
        Matter.Events.on(this.engine, 'beforeUpdate', () => this.antiTunneling());
    }

    private antiTunneling() {
        const bodies = Matter.Composite.allBodies(this.engine.world);
        // Simple anti-tunneling mechanism
        for (const body of bodies) {
            if (!body.isStatic && body.positionPrev) {
                const dy = body.position.y - body.positionPrev.y;
                // If moved more than 50px in one frame, it's tunneling
                if (Math.abs(dy) > 50) {
                    Matter.Body.setVelocity(body, {
                        x: body.velocity.x,
                        y: body.velocity.y * -0.5 // Reverse and dampen
                    });
                    Matter.Body.setPosition(body, {
                        x: body.position.x,
                        y: body.positionPrev.y
                    });
                }
            }
        }
    }
}

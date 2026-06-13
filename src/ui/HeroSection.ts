import Matter from 'matter-js';
import { Impact } from '../sensors/Impact';

export class HeroSection {
    private engine: Matter.Engine;
    private container: HTMLElement;
    
    constructor(engine: Matter.Engine, container: HTMLElement) {
        this.engine = engine;
        this.container = container;
    }

    public init() {
        this.buildTornScreen();
        this.buildTitleConstraint();
        this.buildFloatingMenu();
        this.buildGyroConsent();
    }

    private buildTornScreen() {
        const tornDiv = document.createElement('div');
        tornDiv.className = 'torn-screen';
        tornDiv.innerHTML = `
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width: 100%; height: 50px;">
                <path d="M0,0 L100,0 L100,20 Q75,50 50,20 Q25,-10 0,20 Z" fill="black" />
            </svg>
        `;
        this.container.appendChild(tornDiv);
    }

    private buildTitleConstraint() {
        const titleBody = Matter.Bodies.rectangle(window.innerWidth / 2, 100, 300, 60, {
            density: 0.05,
            frictionAir: 0.02,
            restitution: 0.8
        });

        const constraint = Matter.Constraint.create({
            pointA: { x: window.innerWidth / 2, y: 0 },
            bodyB: titleBody,
            pointB: { x: 0, y: -30 },
            stiffness: 0.1,
            damping: 0.1
        });

        Matter.Composite.add(this.engine.world, [titleBody, constraint]);

        // Trigger impact on collision with something (simulated here after 1s for the drop)
        setTimeout(() => {
            Impact.triggerShake();
        }, 1000);
    }

    private buildFloatingMenu() {
        const group = Matter.Body.nextGroup(true);
        
        const rope = Matter.Composites.stack(window.innerWidth / 2, 200, 1, 5, 10, 10, (x: number, y: number) => {
            return Matter.Bodies.rectangle(x, y, 50, 20, { collisionFilter: { group: group } });
        });
        
        Matter.Composites.chain(rope, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2, render: { type: 'line' } });
        
        Matter.Composite.add(this.engine.world, [
            rope,
            Matter.Constraint.create({ 
                pointA: { x: window.innerWidth / 2, y: 200 }, 
                bodyB: rope.bodies[0], 
                pointB: { x: -25, y: 0 },
                stiffness: 0.5
            })
        ]);

        // Gyro effect logic
        window.addEventListener('deviceorientation', (event) => {
            if (event.gamma && event.beta) {
                const forceX = event.gamma * 0.0001;
                const forceY = event.beta * 0.0001;
                
                // Apply force to the bottom of the chain
                const bottomBody = rope.bodies[rope.bodies.length - 1];
                Matter.Body.applyForce(bottomBody, bottomBody.position, { x: forceX, y: forceY });
            }
        });
    }

    private buildGyroConsent() {
        const consentBtn = document.createElement('button');
        consentBtn.className = 'gyro-consent-btn';
        consentBtn.innerText = 'Touch to Start';
        consentBtn.style.position = 'absolute';
        consentBtn.style.top = '50%';
        consentBtn.style.left = '50%';
        consentBtn.style.transform = 'translate(-50%, -50%)';
        consentBtn.style.zIndex = '9999';

        consentBtn.addEventListener('click', () => {
            // @ts-ignore - iOS specific API
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                // @ts-ignore
                DeviceOrientationEvent.requestPermission()
                    .then((permissionState: string) => {
                        if (permissionState === 'granted') {
                            console.log('Gyroscope access granted');
                        }
                    })
                    .catch(console.error);
            }
            consentBtn.remove();
        });

        this.container.appendChild(consentBtn);
    }
}

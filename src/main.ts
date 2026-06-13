import './style.css';
import { PhysicsManager } from './physics/PhysicsManager';
import { HeroSection } from './ui/HeroSection';
import { initMascot } from '@mascotnova/core';

// Initialize the MascotNova engine components (DOM masking, etc.)
initMascot();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="game-container"></div>
`;

const container = document.getElementById('game-container')!;

// 1. Initialize Physics Manager (Session 1)
const physicsManager = new PhysicsManager(container);
physicsManager.start();

// 2. Initialize Hero Section (Session 2)
const heroSection = new HeroSection(physicsManager.engine, container);
heroSection.init();

console.log("Genesis Protocol: Session 1 & 2 Executed.");

let particles = [];
let numParticles = 100;
let storyText = "";
let storyIndex = 0;
let storyEvents = [
    "A soft breeze sweeps you into a field of particles...",
    "The particles start to swirl faster...",
    "You feel a strange attraction as the particles seem to respond to you...",
    "Drawn by the particles, you enter the center of the mystical forest..."
];

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector(0, 0);
    this.size = random(5, 10);
    this.color = color(random(255), random(255), random(255));
  }

  move() {
    if (mouseIsPressed) {
      let attraction = createVector(mouseX, mouseY).sub(this.pos);
      attraction.setMag(0.1);
      this.acc.add(attraction);
    }
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  bounce() {
    if (this.pos.x > width || this.pos.x < 0) this.vel.x *= -1;
    if (this.pos.y > height || this.pos.y < 0) this.vel.y *= -1;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  updateStoryText();
}

function draw() {
  background(0, 20);
  for (let particle of particles) {
    particle.move();
    particle.bounce();
    particle.display();
  }
  displayStory();
}

function mouseReleased() {
  storyIndex++;
  if (storyIndex >= storyEvents.length) {
    setTimeout(() => window.location.href = "sketch2.html", 3000); // Transition to sketch2.html
  } else {
    updateStoryText();
  }
}

function updateStoryText() {
  storyText = storyEvents[storyIndex];
}

function displayStory() {
  textSize(18);
  fill(255);
  noStroke();
  text(storyText, 10, height - 30);
}

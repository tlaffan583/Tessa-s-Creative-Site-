let particles = [];
let portalText = "You made it through the enchanted forest! Now you are met with a portal... Slowly make your way to the middle of the portal to return to the beginning...";

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      angle: random(TWO_PI),
      distance: random(100, 300), // Increased distance for larger orbit
      baseSpeed: random(0.002, 0.005), // Base speed for particles
      color: color(random(150, 255), random(150, 255), random(200, 255))
    });
  }
}

function draw() {
  background(10, 20, 40);
  fill(255);
  textSize(18);
  textAlign(CENTER);
  text(portalText, width / 2, height - 30);

  // Calculate the distance of the mouse cursor to the center of the canvas
  let distanceToCenter = dist(mouseX, mouseY, width / 2, height / 2);

  // Map the distance to a more dramatic speed factor, with higher speed closer to the center
  let speedFactor = map(distanceToCenter, 300, 0, 0.5, 10); // Farther = slower, closer = very fast

  for (let p of particles) {
    // Adjust each particle's speed based on cursor proximity to the center
    p.speed = p.baseSpeed * speedFactor;

    // Update particle position
    p.angle += p.speed;
    let x = width / 2 + cos(p.angle) * p.distance;
    let y = height / 2 + sin(p.angle) * p.distance;
    fill(p.color);
    noStroke();
    ellipse(x, y, 3, 3);
  }

  // Transition back to the first sketch if mouse is near the portal center
  if (distanceToCenter < 50) {
    setTimeout(() => window.location.href = "sketch1.html", 2000);
  }
}

















let particles = [];
let portalText = "You made it through the enchanted forest! Now you are met with a portal... Slowly make your way to the middle of the portal to return to the beginning...";

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      angle: random(TWO_PI),
      distance: random(100, 300), 
      baseSpeed: random(0.002, 0.005), 
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

  
  let distanceToCenter = dist(mouseX, mouseY, width / 2, height / 2);

  
  let speedFactor = map(distanceToCenter, 300, 0, 0.5, 10); 

  for (let p of particles) {
    
    p.speed = p.baseSpeed * speedFactor;

 
    p.angle += p.speed;
    let x = width / 2 + cos(p.angle) * p.distance;
    let y = height / 2 + sin(p.angle) * p.distance;
    fill(p.color);
    noStroke();
    ellipse(x, y, 3, 3);
  }

  
  if (distanceToCenter < 50) {
    setTimeout(() => window.location.href = "sketch1.html", 2000);
  }
}

















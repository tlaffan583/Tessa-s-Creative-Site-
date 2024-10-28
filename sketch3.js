let circles = [];
let targetCircle;
let storyText = "You have ventured into the heart of the forest. Choose a glowing orb carefully to reveal the forest's final secret...";


let xSpacing, ySpacing;

function setup() {
  createCanvas(windowWidth, windowHeight);
  targetCircle = floor(random(18));


  let rows = 3;
  let cols = 6;
  xSpacing = width / (cols + 1);
  ySpacing = height / (rows + 1);


  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let circle = {
        x: xSpacing * (col + 1),
        y: ySpacing * (row + 1),
        baseSpeed: 0.04,
        hoverSpeed: 0.2,
        color: color(random(100, 255), random(100, 255), random(100, 255)),
        angle: 0,
        floatOffsetX: random(-0.5, 0.5),
        floatOffsetY: random(-0.5, 0.5)
      };
      circles.push(circle);
    }
  }
}

function draw() {
  background(30);
  fill(255);
  textSize(18);
  textAlign(CENTER);
  text(storyText, width / 2, height - 30);

  
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    let rotationSpeed = circle.baseSpeed;

    
    if (dist(mouseX, mouseY, circle.x, circle.y) < 30) {
      rotationSpeed = circle.hoverSpeed;
    }

    
    circle.angle += rotationSpeed;
    circle.x += circle.floatOffsetX;
    circle.y += circle.floatOffsetY;

    
    if (circle.x < xSpacing * (i % 6 + 0.5) || circle.x > xSpacing * (i % 6 + 1.5)) circle.floatOffsetX *= -1;
    if (circle.y < ySpacing * (floor(i / 6) + 0.5) || circle.y > ySpacing * (floor(i / 6) + 1.5)) circle.floatOffsetY *= -1;

    
    drawingContext.shadowBlur = 20; 
    drawingContext.shadowColor = circle.color; 

   
    push();
    translate(circle.x, circle.y);
    rotate(circle.angle);
    fill(circle.color);
    ellipse(0, 0, 20, 20); 
    stroke(0);
    noFill();
    ellipse(30, 0, 30, 30); 
    pop();

    
    drawingContext.shadowBlur = 0;

    
    if (i === targetCircle && dist(mouseX, mouseY, circle.x, circle.y) < 20) {
      setTimeout(() => window.location.href = "sketch4.html", 1000);
    }
  }
}
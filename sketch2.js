let spirals = [];
let storylineText = "";
let storyline = [
    "You now find yourself in a mystical clearing, where colorful spirals start to emerge...",
    "The spirals start to surround you slowly...",
    "The spirals grow even larger, captivating your mind and vision...",
    "Entranced, one starts to completely encapsulate you..."
];
let transitionTriggered = false;
let storyIndex = 0;

class Spiral {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 0;
    this.angle = 0;
    this.growthRate = random(0.08, 0.12);
    this.lineWeight = random(1, 3);
    this.color = color(random(255), random(255), random(255), 255);
  }

  grow() {
    this.size += this.growthRate;
    this.angle += this.growthRate;

    
    if (spirals.length > 1 && this !== getLargestSpiral()) {
      let fadeRate = map(this.size, 0, 50, 0.3, 2);
      this.color.setAlpha(this.color._getAlpha() - fadeRate);
    }
  }

  display() {
    stroke(this.color);
    strokeWeight(this.lineWeight);
    noFill();
    beginShape();
    for (let a = 0; a < this.angle; a += 0.1) {
      let r = this.size * a / 15;
      let x = this.x + r * cos(a);
      let y = this.y + r * sin(a);
      vertex(x, y);
    }
    endShape();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  storylineText = storyline[storyIndex]; 

  
  setInterval(() => {
    if (storyIndex < storyline.length - 1) {
      storyIndex++;
      storylineText = storyline[storyIndex];
    } else if (!transitionTriggered) {
      transitionTriggered = true;
      setTimeout(() => window.location.href = "sketch3.html", 2000);
    }
  }, 5000);
}

function draw() {
  background(0, 20);

  for (let i = spirals.length - 1; i >= 0; i--) {
    spirals[i].grow();
    spirals[i].display();

    
    if (spirals[i].color._getAlpha() <= 0 && spirals.length > 1 && spirals[i] !== getLargestSpiral()) {
      spirals.splice(i, 1);
    }
  }

  displayStory();
}

function mouseDragged() {
  let newSpiral = new Spiral(mouseX, mouseY);
  spirals.push(newSpiral);
}

function getLargestSpiral() {
  return spirals.reduce((largest, current) => (current.size > largest.size ? current : largest), spirals[0]);
}

function displayStory() {
  textSize(18);
  fill(255);
  noStroke();
  textAlign(CENTER);
  text(storylineText, width / 2, height - 30);
}
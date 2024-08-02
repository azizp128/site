const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;

const setSize = () => {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
};

const circlesArray = [];

function generateColor() {
  return  `hsl(${Math.random()*360},${90}%,${78}%)`
  // return finalHexString;
}

const center = {
  x: innerWidth/2,
  y: innerHeight/2,
};

let frameCount = 0;
const maxFrameCount = 350;

function Circle(x = 0, y = 0, color, radius = Math.random() * 50) {
  this.radius = radius;
  this.color = color;
  this.increament = 0.5;
  this.x = x;
  this.y = y;
  this.chaseX = x;
  this.deltaX = 0;
  this.chaseY = y;
  this.deltaY = 0;
  this.drag = 0.3;
  this.acc = 0.05;
  this.draw = () => {
    if (Math.round(this.x) != center.x || Math.round(this.y) != center.y ) {
      this.deltaX += (center.x - this.chaseX) * this.acc;
      this.deltaY += (center.y - this.chaseY) * this.acc;
      this.deltaX *= this.drag;
      this.deltaY *= this.drag;
      this.chaseX += this.deltaX * ( 1.8 - this.radius /canvas.width * 2);
      this.chaseY += this.deltaY * ( 1.8 - this.radius /canvas.width * 2);
      this.x = this.chaseX 
      this.y = this.chaseY 
    }

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();

    this.radius += this.increament;
  };
}
for (let i = 0; i < 5; i++) {
  circlesArray[i] = new Circle(
    center.x,
    center.y,
    generateColor(),
    (4 - i) * 200
  );
}

function draw() {
  ctx.fillStyle = "rgba(255,255,255,1)";
  ctx.fillRect(0, 0, innerWidth, innerHeight);
  if (frameCount == maxFrameCount) {
    frameCount = 0;
    circlesArray.push(new Circle(circlesArray[circlesArray.length-1].x, circlesArray[circlesArray.length-1].y, generateColor(), 0));
  }
  frameCount += 1;
  circlesArray.forEach((circle, index, circles) => {
    circle.draw();
    if (circle.radius > canvas.innerWidth * 2) {
      circles.splice(index, 1);
    }
  });
  window.requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
  setSize();
});
window.addEventListener("mousemove", (e) => {
  center.x = e.clientX;
  center.y = e.clientY;
});

draw();

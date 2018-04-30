export default class Particle {
  constructor(Xpos, Ypos, w, h, opts, canvas) {
    this.x = Xpos ? Xpos : Math.random() * w;
    this.y = Ypos ? Ypos : Math.random() * h;
    this.w = w;
    this.h = h;
    this.canvas = canvas;
    this.opts = opts;
    this.speed = this.opts.defaultSpeed + Math.random() * this.opts.addedSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = this.opts.particleColor;
    this.radius =
      this.opts.defaultRadius + Math.random() * this.opts.addedRadius;
    this.d = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed
    };
  }
  update() {
    this.border();
    this.x += this.d.x;
    this.y += this.d.y;
  }
  border() {
    if (this.x >= this.w || this.x <= 0) {
      this.d.x *= -1;
    }
    if (this.y >= this.h || this.y <= 0) {
      this.d.y *= -1;
    }
    this.x > this.w ? (this.x = this.w) : this.x;
  }
  draw() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.canvas.closePath();
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
  }
}

import Particle from "./particle";

export default class Animation {
  constructor() {
    this.canvasBody = document.getElementById("canvasAnimation");
    this.canvas = this.canvasBody.getContext("2d");
    this.w = this.canvasBody.width = window.innerWidth;
    this.h = this.canvasBody.height = window.innerHeight;
    this.opts = {
      backgroundColor: "#222",
      particleColor: "#fcfcfc",
      particleAmount: 40,
      defaultSpeed: 1,
      addedSpeed: 2,
      defaultRadius: 2,
      addedRadius: 2,
      communicationRadius: 150
    };
    this.loop = this.loop.bind(this);
    this.particles = [];
    this.setup();
  }
  checkDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  communicatePoints(point1, father) {
    for (let i = 0; i < father.length; i++) {
      let distance = this.checkDistance(
        point1.x,
        point1.y,
        father[i].x,
        father[i].y
      );
      let opacity = 1 - distance / this.opts.communicationRadius;
      if (opacity > 0) {
        this.canvas.lineWidth = opacity;
        this.canvas.strokeStyle = "rgba(255,255,255,0.5)";
        this.canvas.beginPath();
        this.canvas.moveTo(point1.x, point1.y);
        this.canvas.lineTo(father[i].x, father[i].y);
        this.canvas.closePath();
        this.canvas.stroke();
      }
    }
  }
  loop() {
    window.requestAnimationFrame(this.loop);

    this.canvas.fillStyle = this.opts.backgroundColor;
    this.canvas.fillRect(0, 0, this.w, this.h);
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();
    }
    for (let a = 0; a < this.particles.length; a++) {
      this.communicatePoints(this.particles[a], this.particles);
    }
  }

  setup() {
    for (let i = 0; i < this.opts.particleAmount; i++) {
      this.particles.push(
        new Particle(null, null, this.w, this.h, this.opts, this.canvas)
      );
    }
    document.querySelector("#canvasAnimation").addEventListener("click", e => {
      this.particles.push(
        new Particle(e.pageX, e.pageY, this.w, this.h, this.opts, this.canvas)
      );
    });
    window.requestAnimationFrame(this.loop);
  }
}

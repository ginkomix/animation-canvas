(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animation = new _main2.default();

},{"./main":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _particle = require("./particle");

var _particle2 = _interopRequireDefault(_particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
  function Animation() {
    _classCallCheck(this, Animation);

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

  _createClass(Animation, [{
    key: "checkDistance",
    value: function checkDistance(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
  }, {
    key: "communicatePoints",
    value: function communicatePoints(point1, father) {
      for (var i = 0; i < father.length; i++) {
        var distance = this.checkDistance(point1.x, point1.y, father[i].x, father[i].y);
        var opacity = 1 - distance / this.opts.communicationRadius;
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
  }, {
    key: "loop",
    value: function loop() {
      window.requestAnimationFrame(this.loop);

      this.canvas.fillStyle = this.opts.backgroundColor;
      this.canvas.fillRect(0, 0, this.w, this.h);
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
        this.particles[i].draw();
      }
      for (var a = 0; a < this.particles.length; a++) {
        this.communicatePoints(this.particles[a], this.particles);
      }
    }
  }, {
    key: "setup",
    value: function setup() {
      var _this = this;

      for (var i = 0; i < this.opts.particleAmount; i++) {
        this.particles.push(new _particle2.default(null, null, this.w, this.h, this.opts, this.canvas));
      }
      document.querySelector("#canvasAnimation").addEventListener("click", function (e) {
        _this.particles.push(new _particle2.default(e.pageX, e.pageY, _this.w, _this.h, _this.opts, _this.canvas));
      });
      window.requestAnimationFrame(this.loop);
    }
  }]);

  return Animation;
}();

exports.default = Animation;

},{"./particle":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
  function Particle(Xpos, Ypos, w, h, opts, canvas) {
    _classCallCheck(this, Particle);

    this.x = Xpos ? Xpos : Math.random() * w;
    this.y = Ypos ? Ypos : Math.random() * h;
    this.w = w;
    this.h = h;
    this.canvas = canvas;
    this.opts = opts;
    this.speed = this.opts.defaultSpeed + Math.random() * this.opts.addedSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = this.opts.particleColor;
    this.radius = this.opts.defaultRadius + Math.random() * this.opts.addedRadius;
    this.d = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed
    };
  }

  _createClass(Particle, [{
    key: "update",
    value: function update() {
      this.border();
      this.x += this.d.x;
      this.y += this.d.y;
    }
  }, {
    key: "border",
    value: function border() {
      if (this.x >= this.w || this.x <= 0) {
        this.d.x *= -1;
      }
      if (this.y >= this.h || this.y <= 0) {
        this.d.y *= -1;
      }
      this.x > this.w ? this.x = this.w : this.x;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.canvas.beginPath();
      this.canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.canvas.closePath();
      this.canvas.fillStyle = this.color;
      this.canvas.fill();
    }
  }]);

  return Particle;
}();

exports.default = Particle;

},{}]},{},[1]);

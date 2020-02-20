var noise = require("@giuliandrimba/noise");
var vector = require('../util/vector');
var off = { x: 0, y: 0};

module.exports = function (drawer, bounds) {
  var angle = Math.random() * (Math.PI * 2);
  var position = {
    x: 0,
    y: 0,
  };
  var center = {
    x: Math.random() * bounds.width,
    y: bounds.y + Math.random() * bounds.height,
  }
  var centerVelocity = {
    x: 20 + Math.random() * 5,
    y: 20 + Math.random() * 5,
  }
  let velocity = { x: 0, y: 0 };
  const acceleration = { x: 0, y: 0 };
  let startTime;
  let canDraw = true;
  return {
    draw(params) {
      if (!canDraw) {
        return;
      }
      if (params.frame / params.totalFrames >= 0.9) {
        canDraw = false;
        this.done = true;
      }
      off.x += 0.00001;
      off.y += 0.00001;
      nx = noise(off.x) * 1000;
      ny = noise(off.y) * 1000;
      angle += (nx + ny) * 0.001;
      // if (Math.random() > 0.5) {
      //   nx *= -0.8
      //   ny *= -0.8
      // }

      acceleration.x = nx;
      acceleration.y = ny;
      velocity.x += acceleration.x;
      velocity.y += acceleration.y * Math.random();
      velocity = vector.mult(vector.normalize(velocity), Math.random() * 500)

      center.x += centerVelocity.x * nx * 0.1;
      center.y += centerVelocity.y * 0.1;

      position = {
        x: center.x + Math.cos(angle) * velocity.x * 1.4,
        y: center.y + Math.sin(angle) * velocity.y * 1.4,
      };

      if (position.x < bounds.x || position.x > bounds.x + bounds.width) {
        velocity.x *= -1;
        off.x = 0;
      }

      if (position.y < bounds.y - ny * 2 || position.y > bounds.y + bounds.height) {
        velocity.y *= -1
        off.y = 0;
      }

      if (center.x < bounds.x || center.x > bounds.x + bounds.width) {
        centerVelocity.x *= -1;
      }

      if (center.y < bounds.y || center.y > bounds.y + bounds.height) {
        centerVelocity.y *= -0.9;
      }

      drawer(position.x, position.y);
    }
  }
}
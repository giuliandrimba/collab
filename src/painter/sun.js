var noise = require("@giuliandrimba/noise");
var vector = require('../util/vector');
var off = { x: 0, y: 0};

module.exports = function (drawer, bounds) {
  var position = {
    x: bounds.x,
    y: bounds.y,
    radius: bounds.radius,
  };
  let canDraw = true;
  let angle = 0;
  return {
    draw(params) {
      if (!canDraw) {
        return;
      }
      if (params.frame / params.totalFrames >= 1) {
        canDraw = false;
        this.done = true;
      }
      off.x += 0.01;
      off.y += 0.01;
      nx = noise(off.x) * 500;
      ny = noise(off.y) * 500;
      angle += (nx + ny) * 0.001;
      position.x += Math.cos(angle) * (position.radius + nx * 0.01);
      position.y += Math.sin(angle) * (position.radius + ny * 0.01);
      drawer(position.x, position.y);
    }
  }
}
var noise = require("@giuliandrimba/noise");
var xoff = 0.0;

module.exports = (_ctx, opts) => {
  const ctx = _ctx;
  let options = {};
  if (opts) {
    options = opts;
  }
  const config = {
    lineWidth: options.lineWidth || 1,
    trailColors: options.trailColors || [
      "#ffffff",
      "#fd924c",
      "#f6711a",
      "#fd924c",
      "#FFFFFF",
      "#fd924c",
      "#0bebff"
    ],
    circleColors: options.circleColors || [
      '#ffba00',
      '#ff6c00',
      '#ff0042',
    ]
  };

  return {
    draw(x, y) {
      if (!this.lastPoint || (!x && !y)) {
        this.lastPoint = { x, y };
      }
      xoff = xoff + 0.1;
      var n = noise(xoff) * 100;
      ctx.lineWidth = n * 0.01;
      ctx.strokeStyle = config.circleColors[Math.floor(Math.random() * config.circleColors.length - 1)];
      ctx.fillStyle = config.circleColors[Math.floor(Math.random() * config.circleColors.length - 1)];
      this.drawLine(x, y, n * 1);
      for (var i = 1; i < 5; i++) {
        xoff = xoff + 0.1;
        var n = noise(xoff) * config.lineWidth;
        ctx.lineWidth = n * 0.1;
        ctx.strokeStyle =
          config.trailColors[Math.floor(Math.random() * config.trailColors.length - 1)];
        const _x = x - 100 + 20 * i;
        const _y = y - 100 + 20 * i;
        const _fromX = this.lastPoint.x - 100 + 20 * i;
        const _fromY = this.lastPoint.y - 100 + 20 * i;
        this.drawShadow(_fromX, _fromY, _x, _y);
      }
      this.lastPoint = { x, y };
    },
    drawLine(x, y, size) {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    },
    drawShadow(fromX, fromY, x, y) {
      // ctx.fillStyle = "rgba(255, 255, 255, 1)"
      // ctx.fillRect(x, y, 10, 10)
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      // ctx.rect(x, y, 10, 10)
      ctx.lineTo(x, y);
      ctx.fill();
      ctx.stroke();
    }
  };
};

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
    strokeStyle: options.strokeStyle || 'black',
  }
  
  return {
    draw(x, y) { 
      if (!this.lastPoint) {
        this.lastPoint = { x, y }
      } else if (!x && !y) {
        this.lastPoint = { x, y }
      }
      ctx.strokeStyle = config.strokeStyle;
      this.drawLine(this.lastPoint.x, this.lastPoint.y, x, y);
      for (var i = 0; i < 20; i++) {
        xoff = xoff + 1;
        var n = noise(xoff) * config.lineWidth;
        ctx.lineWidth = n;
        const _x = (x - 100) + (20 * i) * n * 0.1;
        const _y = (y - 100) + (20 * i) * n * 0.2;
        const _fromX = (this.lastPoint.x - 100) + (20 * i) * n * 0.05;
        const _fromY = (this.lastPoint.y - 100) + (20 * i) * n * 0.05;
        this.drawLine(_fromX, _fromY, _x, _y);
      }
      this.lastPoint = { x, y };
    },
    drawLine(fromX, fromY, x, y) {
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}
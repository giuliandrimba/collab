module.exports = (_ctx, opts) => {
  const ctx = _ctx;
  let options = {};
  if (opts) {
    options = opts;
  }

  const config = {
    lineWidth: 1 || options.lineWidth,
  }

  ctx.lineJoin = ctx.lineCap = 'round';
  ctx.strokeStyle = 'purple';
  
  return {
    draw(x, y) {
      if (!this.lastPoint) {
        this.lastPoint = { x, y }
      } else if (!x && !y) {
        this.lastPoint = undefined;
        return;
      }
      ctx.lineWidth = 10 + Math.random() * 10;
      ctx.strokeStyle = '#ff8a00';
      ctx.beginPath();
      ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
      ctx.lineTo(x, y);
      ctx.fill();
      ctx.stroke();
      this.lastPoint = { x, y };
    },
  }
}
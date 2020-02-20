module.exports = function(drawer, width, height, time) {
  let index = -1;
  let boltInterval = undefined;
  let scale  = 1.0
  let branches = [[]]
  let currentBranch = 0;
  let oldBranch = -1;
  const increment = () => {
    index += 1;
    if (index >= branches[currentBranch].length - 1) {
      index = 0
      if (currentBranch >= branches.length - 1) {
        return false;
      } else {
        currentBranch += 1;
      }
    }
    return true;
  };
  return {
    done: false,
    draw(params) {
      if (params.frame >= params.totalFrames || params.frame === 0) {
        this.done = true;
        return;
      }
      if (!branches[0].length) {
        recursiveLightning(
          branches[0],
          Math.random() * width,
          -10,
          height,
          Math.PI * 3.0 / 2.0,
        );
      } else {
        if (increment()) {
          if(branches[currentBranch][index]) {
            drawer(branches[currentBranch][index].x, branches[currentBranch][index].y);
          }
          if (oldBranch !== currentBranch) {
            oldBranch = currentBranch;
            drawer();
          }
        }
      }
    }
  };

  function recursiveLightning(points, _x, _y, _length, _direction) {
    let x = _x;
    let y = _y;
    let length = _length;
    let direction = _direction;
    points.push({ x, y });
    var originalDirection;
    originalDirection = direction;
    
    if (length <= 0) {
      return;
    }
    let i = 0;
    while (i++ < Math.floor(45 / scale) && length > 0) {
      let x1 = Math.floor(x);
      let y1 = Math.floor(y);
      x += Math.cos(direction) * 20
      y -= Math.sin(direction) * 40;
      length -= 1
      if (Math.random() > 0.1) {
        points.push({ x, y });
      }
      
      direction = originalDirection + (-Math.PI / 8.0 + Math.random() * (Math.PI / 2.0))
      if(x1 != Math.floor(x) || y1 != Math.floor(y)) {
        if (Math.random() > 0.98) {
          recursiveLightning(branches[branches.length - 1], x1, y1, length * (0.3 + Math.random() * 0.4), originalDirection + (-Math.PI / 4.0 + Math.random() * (Math.PI / 3.0)))
          branches.push([])
        } else if (Math.random() > 0.95) {
            recursiveLightning(branches[branches.length - 1], x1, y1, length, originalDirection + (-Math.PI / 6.0 + Math.random() * (Math.PI / 3.1)))
            branches.push([])
            length = 0;;
      //     length = 0;;
        }
      }
      // branches.push([])
    }
  }
  
};
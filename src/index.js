const sketch = require("canvas-sketch");
const backgroundBrush = require("./brushes/background");
const backgroundPainter = require("./painter/background");
const sunBrushLib = require("./brushes/brush");
const sunPainterBrush = require("./painter/sun");
const mouse = require("./painter/mouse");

document.domain = 'colab.me';

const settings = {
  dimensions: "a4",
  pixelsPerInch: 300,
  duration: 20,
  units: "px",
  fps: 24,
  animate: true
};

let hasIframe = false;
let iframeElement;
let iframeDocument;
let iframeCanvas;

const addIframe = () => {
  const iframe = document.createElement('iframe');
  iframe.src = 'http://anthony.colab.me:9966/?noiframe';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  iframe.onload = () => {
    hasIframe = true;
    iframeElement = document.querySelector('iframe');
    iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;
    iframeCanvas = iframeDocument.querySelector('canvas');
  }
}

window.onload = () => {
  if (!/noiframe/.test(window.location.href.toString())) {
    addIframe();
  }
  sketch(s => {
    const background = backgroundBrush(s.context, {
      strokeStyle: "#ffc72f",
      lineWidth: 10
    });
    const background2 = backgroundBrush(s.context, {
      strokeStyle: "#ffeca1",
      lineWidth: 5 + Math.random() * 15
    });
    const background3 = backgroundBrush(s.context, {
      strokeStyle: "#9cebfc",
      lineWidth: 5 + Math.random() * 15
    });
    const background4 = backgroundBrush(s.context, {
      strokeStyle: "#1dc3f9",
      lineWidth: 5 + Math.random() * 15
    });
    const sunBrush = sunBrushLib(s.context, {
      strokeStyle: "#FF0000",
      lineWidth: 1 + Math.random() * 1
    });
    const sand = backgroundPainter(
      background.draw.bind(background),
      {
        x: 0,
        y: s.height * 0.8,
        width: s.width,
        height: s.height * 0.2,
      },
    );
    const sand2 = backgroundPainter(
      background2.draw.bind(background2),
      {
        x: 0,
        y: s.height * 0.8,
        width: s.width,
        height: s.height * 0.2,
      },
    );
    const sky = backgroundPainter(
      background3.draw.bind(background3),
      {
        x: 0,
        y: 0,
        width: s.width,
        height: s.height * 0.5,
      },
    );
    const ocean = backgroundPainter(
      background4.draw.bind(background4),
      {
        x: 0,
        y: s.height * 0.6,
        width: s.width,
        height: s.height * 0.2,
      },
    );
    const sunPainter = sunPainterBrush(
      sunBrush.draw.bind(sunBrush),
      {
        x: Math.random() * s.width,
        y: s.height * 0.05,
        radius: 50 + Math.random() * 50,
      },
    );
    s.context.fillStyle = "#FFFFFF";
    s.context.beginPath();
    s.context.rect(0, 0, s.width, s.height);
    s.context.fill();
    
    return {
      resize(params) {},
      render(params) {
        
        if (hasIframe) {
          s.context.globalCompositeOperation = 'multiply';
          s.context.drawImage(iframeCanvas, 0, s.canvas.height / 2);
        }
        s.context.globalAlpha = 0.1;
        sand.draw(params);
        sand2.draw(params);
        sky.draw(params);
        ocean.draw(params);
    
        // mousePainter.draw();
      },
      unload() {}
    };
  }, settings);
};

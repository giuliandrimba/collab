const sketch = require("canvas-sketch");
const backgroundBrush = require("./brush/background");
const bcakgroundPainter = require("./painter/background");
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
      strokeStyle: "#5a0000",
      lineWidth: 20
    });
    const background1Painter = bcakgroundPainter(
      background.draw.bind(background),
      s.width,
      s.height,
      10 + Math.random() * 10
    );
    const mousePainter = mouse(background.draw.bind(background), s.canvas);

    return {
      resize(params) {},
      render(params) {
        if (hasIframe) {
          s.context.drawImage(iframeCanvas, 0, 0);
        }
        background1Painter.draw();
        mousePainter.draw();
      },
      unload() {}
    };
  }, settings);
};

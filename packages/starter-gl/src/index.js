import AnimationTickerElement from '@damienmortini/element-animation-ticker/index.js';

import View from './View.js';

/**
 * Entry point element
 * @hideconstructor
 * @example
 * <starter-gl></starter-gl>
 */
class Main extends AnimationTickerElement {
  constructor() {
    super();

    this.autoplay = true;

    this._resizeBinded = this.resize.bind(this);

    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host {
          display: block;
          touch-action: none;
        }
        
        canvas {
          width: 100%;
          height: 100%;
          max-height: 100%;
        }
      </style>
      <canvas></canvas>
    `;

    this.canvas = this.shadowRoot.querySelector('canvas');

    this.view = new View({ canvas: this.canvas });
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._resizeBinded);
    this.resize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._resizeBinded);
  }

  resize() {
    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;

    this.canvas.width = width * window.devicePixelRatio;
    this.canvas.height = height * window.devicePixelRatio;

    this.view.resize(width, height);
  }

  update() {
    this.view.update();
  }
}

window.customElements.define('starter-gl', Main);
